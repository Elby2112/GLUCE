from gemini_recommend_summary import get_summary


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


def get_recommendations(patient):
    """
    Generate personalized recommendations based on how a patient's metrics
    compare to defined healthy ranges.

    The patient parameter is expected to be a dictionary with keys such as:
    "BloodGlucose", "BMI", "HDL", "Triglycerides", and "Age".
    """
    recommendations = []

    # --- Blood Glucose ---
    # Normal fasting blood glucose: ~70-100 mg/dL
    bg = patient.get("BloodGlucose", 0)
    if bg >= 126:
        recommendations.append("Your blood sugar is very high. Consider reducing sugar intake and consult your doctor.")
    elif bg >= 100:
        recommendations.append("Your blood sugar is borderline high. Monitor your diet and increase physical activity.")
    else:
        recommendations.append("Your blood sugar is within normal range.")

    # --- BMI ---
    bmi = patient.get("BMI", 0)
    if bmi >= 30:
        recommendations.append("Your BMI is in the obesity range. A structured diet and exercise plan is advised.")
    elif bmi >= 25:
        recommendations.append("Your BMI indicates overweight. Consider a balanced diet and regular exercise.")
    else:
        recommendations.append("Your BMI is in a healthy range.")

    # --- HDL Cholesterol ---
    # For simplicity, using 40 mg/dL as the threshold for low HDL
    hdl = patient.get("HDL", 0)
    if hdl < 40:
        recommendations.append("Your HDL (good cholesterol) is low. Increase healthy fats like omega-3s in your diet.")
    else:
        recommendations.append("Your HDL level is acceptable.")

    # --- Triglycerides ---
    tg = patient.get("Triglycerides", 0)
    if tg >= 150:
        recommendations.append("Your triglyceride level is high. Consider reducing sugars and refined carbohydrates.")
    else:
        recommendations.append("Your triglyceride level is within normal range.")

    # --- Age-based Recommendation ---
    age = patient.get("Age", 0)
    if age >= 50:
        recommendations.append("Given your age, regular health check-ups are recommended.")

    return recommendations
patient_data_example = {
    "Age": 30,
    "Sex": "Male",
    "Marital": "Single",
    "Income": 5000,
    "Race": "White",
    "WaistCirc": 85,
    "BMI": 25,
    "Albuminuria": 0,
    "UrAlbCr": 6.0,
    "UricAcid": 5.0,
    "BloodGlucose": 100,
    "HDL": 50,
    "Triglycerides": 80
}

summary = get_summary(patient_data_example)
print("Summary:")
print(summary)

recommendations = get_recommendations(patient_data_example)
print("Recommendations:")
print(recommendations)