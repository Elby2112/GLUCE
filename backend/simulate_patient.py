import pandas as pd
import joblib


def simulate_patient():
    """
    Prompts the user to enter patient information.
    If no input is provided, default values are used.
    Returns a DataFrame with one row of patient data.
    """
    print("\nEnter patient information (press enter to use the default value):")
    try:
        age = float(input("Age [default 40]: ") or 40)
        sex = input("Sex (Male/Female) [default Male]: ") or "Male"
        marital = input("Marital (Single/Married/Divorced/Widowed) [default Single]: ") or "Single"
        income = float(input("Income [default 3000]: ") or 3000)
        race = input("Race (White/Black/Asian/Hispanic/Other) [default White]: ") or "White"
        waist = float(input("WaistCirc [default 90]: ") or 90)
        bmi = float(input("BMI [default 26]: ") or 26)
        albuminuria = float(input("Albuminuria [default 0]: ") or 0)
        uralbcr = float(input("UrAlbCr [default 7]: ") or 7)
        uricacid = float(input("UricAcid [default 5]: ") or 5)
        bloodglucose = float(input("BloodGlucose [default 110]: ") or 110)
        hdl = float(input("HDL [default 45]: ") or 45)
        triglycerides = float(input("Triglycerides [default 100]: ") or 100)
    except Exception as e:
        print("Invalid input detected; using default values.")
        age, sex, marital, income = 40, "Male", "Single", 3000
        race, waist, bmi = "White", 90, 26
        albuminuria, uralbcr, uricacid = 0, 7, 5
        bloodglucose, hdl, triglycerides = 110, 45, 100

    patient_data = pd.DataFrame({
        'Age': [age],
        'Sex': [sex],
        'Marital': [marital],
        'Income': [income],
        'Race': [race],
        'WaistCirc': [waist],
        'BMI': [bmi],
        'Albuminuria': [albuminuria],
        'UrAlbCr': [uralbcr],
        'UricAcid': [uricacid],
        'BloodGlucose': [bloodglucose],
        'HDL': [hdl],
        'Triglycerides': [triglycerides]
    })
    return patient_data


def simulate():
    # Load the saved model pipeline (we'll use the Random Forest model here)
    pipeline = joblib.load('rf_pipeline.pkl')

    while True:
        patient = simulate_patient()
        risk_proba = pipeline.predict_proba(patient)[:, 1][0] * 100  # Convert probability to percentage
        print(f"\nPredicted Risk Score (0-100): {risk_proba:.2f}")

        cont = input("Would you like to simulate another patient? (y/n): ")
        if cont.lower() != 'y':
            break


if __name__ == '__main__':
    simulate()
