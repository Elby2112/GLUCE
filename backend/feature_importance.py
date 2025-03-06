import joblib
import numpy as np
import pandas as pd

# Load the saved Random Forest pipeline
rf_pipeline = joblib.load('rf_pipeline.pkl')

# The pipeline steps: preprocessor then classifier.
# Access the classifier (RandomForestClassifier) from the pipeline.
rf_classifier = rf_pipeline.named_steps['classifier']

# Assuming the preprocessor preserves the order of features as defined earlier,
# we need the names of the numeric and categorical features.
numeric_features = ['Age', 'Income', 'WaistCirc', 'BMI', 'Albuminuria',
                    'UrAlbCr', 'UricAcid', 'BloodGlucose', 'HDL', 'Triglycerides']
categorical_features = ['Sex', 'Marital', 'Race']

# To get the feature names after one-hot encoding, we extract them from the preprocessor.
preprocessor = rf_pipeline.named_steps['preprocessor']

# For numeric features, names remain the same.
num_feature_names = numeric_features

# For categorical features, the transformer returns many columns.
cat_transformer = preprocessor.named_transformers_['cat']
cat_feature_names = cat_transformer.named_steps['onehot'].get_feature_names_out(categorical_features)

# Combine feature names in the order used by the model
feature_names = list(num_feature_names) + list(cat_feature_names)

# Get feature importances from the Random Forest classifier
importances = rf_classifier.feature_importances_

# Combine into a DataFrame for easy viewing
importance_df = pd.DataFrame({
    'Feature': feature_names,
    'Importance': importances
})

# Sort features by importance descending
importance_df = importance_df.sort_values(by='Importance', ascending=False)

print("Feature Importances from Random Forest:")
print(importance_df)
