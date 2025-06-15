import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV, KFold
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pickle
import numpy as np

df = pd.read_csv('heart.csv')

df = df.dropna()
X = df.drop(columns=['target'])
y = df['target']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

models = {
    'decision_tree': {
        'model': DecisionTreeClassifier(random_state=42),
        'params': {
            'max_depth': [3, 5, 7],
            'min_samples_split': [2, 5],
            'min_samples_leaf': [1, 2]
        }
    },
    'svm': {
        'model': SVC(probability=True, random_state=42),
        'params': {
            'C': [0.1, 1, 10],
            'kernel': ['rbf', 'linear'],
            'gamma': ['scale', 0.1]
        }
    },
    'random_forest': {
        'model': RandomForestClassifier(random_state=42, n_estimators=50),  # Reduced n_estimators
        'params': {
            'max_depth': [None, 10, 20],
            'min_samples_split': [2, 5],
            'min_samples_leaf': [1, 2]
        }
    },
    'naive_bayes': {
        'model': GaussianNB(),
        'params': {
            'var_smoothing': np.logspace(-9, -7, num=3)
        }
    }
}

best_models = {}
best_scores = {}
for name, model_info in models.items():
    print(f"\nOptimizing {name}...")
    random_search = RandomizedSearchCV(
        model_info['model'],
        model_info['params'],
        n_iter=10,  
        cv=KFold(n_splits=5, shuffle=True, random_state=42),
        scoring='accuracy',
        n_jobs=-1,
        random_state=42
    )
    random_search.fit(X_train, y_train)
    
    best_models[name] = random_search.best_estimator_
    best_scores[name] = random_search.best_score_
    print(best_scores)
    
    test_score = random_search.score(X_test, y_test)
    print(f"{name} best parameters: {random_search.best_params_}")
    print(f"{name} training accuracy (CV): {random_search.best_score_:.3f}")
    print(f"{name} test accuracy: {test_score:.3f}")

most_accurate_model = max(best_scores, key=best_scores.get)
print(f"\nMost accurate model: {most_accurate_model} with CV accuracy: {best_scores[most_accurate_model]:.3f}")

kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X_scaled)  

clusters = kmeans.predict(X_scaled)
df['cluster'] = clusters
print('\nClusters formed:', set(clusters))
print('Cluster counts:')
print(df['cluster'].value_counts())

with open('model.pkl', 'wb') as f:
    pickle.dump((best_models, most_accurate_model, kmeans, scaler), f)
print('\n✅ Models, best model name, clustering, and scaler saved to model.pkl')