from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import json, os, hashlib
from fastapi.middleware.cors import CORSMiddleware

# Import the generative AI functions from your Gemini module
from gemini_recommend_summary import get_summary, get_recommendations

app = FastAPI()
origins = [
    "http://localhost:3000",  # React app URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved Random Forest pipeline
rf_pipeline = joblib.load("rf_pipeline.pkl")


# Define a Pydantic model for patient data
class PatientData(BaseModel):
    Age: float
    Sex: str
    Marital: str
    Income: float
    Race: str
    WaistCirc: float
    BMI: float
    Albuminuria: float
    UrAlbCr: float
    UricAcid: float
    BloodGlucose: float
    HDL: float
    Triglycerides: float


def classify_patient(risk_score: float) -> str:
    """
    Classify a patient based on the risk score.
    """
    if risk_score < 30:
        return "Healthy"
    elif risk_score < 60:
        return "At Risk"
    else:
        return "High Risk"


# Optional caching functions to save generated output
def save_generated_content(patient_id: str, summary: str, recommendations: str):
    data = {
        "summary": summary,
        "recommendations": recommendations,
    }
    with open(f"cache_{patient_id}.json", "w") as f:
        json.dump(data, f)


def load_generated_content(patient_id: str):
    file_path = f"cache_{patient_id}.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return None


@app.post("/predict")
def predict(patient: PatientData):
    patient_dict = patient.dict()
    patient_df = pd.DataFrame([patient_dict])

    # Predict risk probability (class 1 probability, converted to a score out of 100)
    risk_proba = rf_pipeline.predict_proba(patient_df)[0][1] * 100
    classification = classify_patient(risk_proba)

    # Create a unique identifier from the patient data for caching
    patient_id = hashlib.md5(json.dumps(patient_dict, sort_keys=True).encode()).hexdigest()
    cached = load_generated_content(patient_id)
    if cached:
        summary = cached["summary"]
        recommendations = cached["recommendations"]
    else:
        # Generate a summary and recommendations using Gemini functions
        summary = get_summary(patient_dict)
        recommendations = get_recommendations(patient_dict)
        save_generated_content(patient_id, summary, recommendations)

    return {
        "risk_score": risk_proba,
        "classification": classification,
        "summary": summary,
        "recommendations": recommendations,
    }


@app.get("/")
def read_root():
    return {"message": "Welcome to the Metabolic Health API"}
