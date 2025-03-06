import pandas as pd
import joblib

# Load the trained model pipeline
rf_pipeline = joblib.load('rf_pipeline.pkl')

# Define two patients: one low-risk and one high-risk
patients = pd.DataFrame([
    {
        'Age': 30,
        'Sex': 'Male',
        'Marital': 'Single',
        'Income': 5000,
        'Race': 'White',
        'WaistCirc': 85,
        'BMI': 25,
        'Albuminuria': 0,
        'UrAlbCr': 6.0,
        'UricAcid': 5.0,
        'BloodGlucose': 100,
        'HDL': 50,
        'Triglycerides': 80
    },
    {
        'Age': 65,
        'Sex': 'Male',
        'Marital': 'Married',
        'Income': 1000,
        'Race': 'Black',
        'WaistCirc': 120,
        'BMI': 40,
        'Albuminuria': 2,
        'UrAlbCr': 15.0,
        'UricAcid': 9.0,
        'BloodGlucose': 200,
        'HDL': 25,
        'Triglycerides': 300
    }
])

# Predict risk probabilities for both patients
risk_proba = rf_pipeline.predict_proba(patients)[:, 1] * 100  # Convert to percentage



def classify_patient(risk_score):
    """
    Classify a patient into one of three categories based on their risk score.
    """
    if risk_score < 30:
        return "Healthy"
    elif risk_score < 60:
        return "At Risk"
    else:
        return "High Risk"
