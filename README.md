# 💓 Heart Disease Prediction & Clustering (ML + Flask + React)

This project predicts the risk of heart disease using machine learning models and clusters patients based on their health profiles.  
It features a Flask backend that serves the best-trained model and a React frontend for user-friendly predictions.

---

## ⚙️ Tech Stack

- **Python**, **scikit-learn**, **pandas**, **numpy**
- ML Models: **SVM**, **Random Forest**, **Decision Tree**, **Naive Bayes**
- **Hyperparameter Tuning**: RandomizedSearchCV + KFold
- **Clustering**: KMeans (3 clusters)
- **Flask** – REST API backend
- **React.js** – Frontend user interface
- **Pickle** – For model serialization

---

## 🧠 ML Workflow

1. **Preprocessing**: StandardScaler applied to features  
2. **Model Training**: Four models trained with hyperparameter tuning  
3. **Evaluation**: Best model selected via cross-validation  
4. **Clustering**: Patients grouped using KMeans  
5. **Saving**: All models, scaler, and clusters saved in `model.pkl`

---

## 🚀 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/heart-disease-ml-app.git
cd heart-disease-ml-app

# Step 1: Train the model
python train_model.py

# Step 2: Run Flask backend
cd backend
python app.py

# Step 3: Run React frontend
cd ../react-frontend
npm install
npm start
