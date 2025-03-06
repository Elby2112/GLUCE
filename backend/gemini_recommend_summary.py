import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# Configure your API key
genai.configure(api_key= GEMINI_API_KEY)

# Instantiate the model
model = genai.GenerativeModel("gemini-1.5-pro-latest")

def get_summary(patient_data):
    """
    Generate a concise summary of the patient's metabolic health.
    The summary is addressed directly to the user (using "you") and includes a health score and explanation.
    """
    prompt = (
        "Based on the following patient data, generate a concise summary of your metabolic health. "
        "Address the user directly (e.g., 'You have...') and include a health score out of 100 along with a brief explanation of your metabolic status. "
        "Do not include any recommendations.\n\n"
        f"Age: {patient_data.get('Age')}\n"
        f"Sex: {patient_data.get('Sex')}\n"
        f"Marital: {patient_data.get('Marital')}\n"
        f"Income: {patient_data.get('Income')}\n"
        f"Race: {patient_data.get('Race')}\n"
        f"WaistCirc: {patient_data.get('WaistCirc')}\n"
        f"BMI: {patient_data.get('BMI')}\n"
        f"Albuminuria: {patient_data.get('Albuminuria')}\n"
        f"UrAlbCr: {patient_data.get('UrAlbCr')}\n"
        f"UricAcid: {patient_data.get('UricAcid')}\n"
        f"BloodGlucose: {patient_data.get('BloodGlucose')}\n"
        f"HDL: {patient_data.get('HDL')}\n"
        f"Triglycerides: {patient_data.get('Triglycerides')}\n"
    )
    response = model.generate_content(prompt)
    return response.text

def get_recommendations(patient_data):
    """
    Generate 6 personalized recommendations as bullet points.
    Each recommendation should address a specific category: Food/Diet, Sleep, Exercise, Stress Management, Regular Check-ups, and Lifestyle Adjustments.
    """
    prompt = (
        "Based on the following patient data, generate a list of 6 personalized recommendations to improve your metabolic health. "
        "Each recommendation should be provided as a separate bullet point and focus on one of the following categories: "
        "Food/Diet, Sleep, Exercise, Stress Management, Regular Check-ups, and Lifestyle Adjustments. "
        "Do not include extra commentary or additional bullet points.\n\n"
        f"Age: {patient_data.get('Age')}\n"
        f"Sex: {patient_data.get('Sex')}\n"
        f"Marital: {patient_data.get('Marital')}\n"
        f"Income: {patient_data.get('Income')}\n"
        f"Race: {patient_data.get('Race')}\n"
        f"WaistCirc: {patient_data.get('WaistCirc')}\n"
        f"BMI: {patient_data.get('BMI')}\n"
        f"Albuminuria: {patient_data.get('Albuminuria')}\n"
        f"UrAlbCr: {patient_data.get('UrAlbCr')}\n"
        f"UricAcid: {patient_data.get('UricAcid')}\n"
        f"BloodGlucose: {patient_data.get('BloodGlucose')}\n"
        f"HDL: {patient_data.get('HDL')}\n"
        f"Triglycerides: {patient_data.get('Triglycerides')}\n"
    )
    response = model.generate_content(prompt)
    return response.text



