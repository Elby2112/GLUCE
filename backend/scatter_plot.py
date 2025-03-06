import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

# Load dataset
df = pd.read_csv(r"C:\Users\Loubna Bouzenzen\OneDrive\Bureau\GLUCE\datasets\Metabolic Syndrome.csv")

# Select relevant features
features = ["BMI", "BloodGlucose", "HDL", "Triglycerides", "WaistCirc"]
df = df[features]

# Compute correlation matrix
correlation_matrix = df.corr()

# Identify the strongest correlations (excluding self-correlations)
corr_pairs = correlation_matrix.unstack().reset_index()
corr_pairs.columns = ["Feature1", "Feature2", "Correlation"]
corr_pairs = corr_pairs[corr_pairs["Feature1"] != corr_pairs["Feature2"]]
corr_pairs["AbsCorrelation"] = corr_pairs["Correlation"].abs()
corr_pairs = corr_pairs.sort_values(by="AbsCorrelation", ascending=False).drop("AbsCorrelation", axis=1)

# Select top correlated feature pairs (let's take the top 3 for visualization)
top_correlations = corr_pairs.head(3)

# Save correlation model
with open("correlation_model.pkl", "wb") as f:
    pickle.dump(correlation_matrix, f)

# Generate scatter plots for top correlations
for index, row in top_correlations.iterrows():
    feature_x, feature_y, corr_value = row
    plt.figure(figsize=(6, 4))
    sns.scatterplot(x=df[feature_x], y=df[feature_y], color="#0a5247")
    plt.xlabel(feature_x)
    plt.ylabel(feature_y)
    plt.title(f"Scatter Plot: {feature_x} vs {feature_y}\nCorrelation: {corr_value:.2f}")
    plt.savefig(f"scatter_{feature_x}_{feature_y}.png")
    plt.close()
    print(f"Generated scatter plot for {feature_x} vs {feature_y} with correlation {corr_value:.2f}")

print("Correlation analysis completed!")
