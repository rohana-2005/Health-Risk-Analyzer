import React, { useState } from 'react';
import { Heart, Activity, User, TrendingUp, AlertCircle, CheckCircle, Stethoscope, Brain } from 'lucide-react';
import axios from 'axios';

const features = [
  { key: 'age', label: 'Age', type: 'number', min: 1, max: 120, icon: User, description: 'Your age in years' },
  { key: 'sex', label: 'Sex', type: 'select', options: [{ value: '1', label: 'Male' }, { value: '0', label: 'Female' }], icon: User, description: 'Biological sex' },
  { key: 'cp', label: 'Chest Pain Type', type: 'select', options: [
    { value: '0', label: 'Typical angina' },
    { value: '1', label: 'Atypical angina' },
    { value: '2', label: 'Non-anginal pain' },
    { value: '3', label: 'Asymptomatic' }
  ], icon: Heart, description: 'Type of chest pain experienced' },
  { key: 'trestbps', label: 'Resting Blood Pressure', type: 'number', min: 80, max: 200, icon: Activity, description: 'Resting blood pressure (mm Hg)' },
  { key: 'chol', label: 'Cholesterol', type: 'number', min: 100, max: 600, icon: TrendingUp, description: 'Serum cholesterol (mg/dl)' },
  { key: 'fbs', label: 'Fasting Blood Sugar', type: 'select', options: [
    { value: '0', label: '≤ 120 mg/dl' },
    { value: '1', label: '> 120 mg/dl' }
  ], icon: Activity, description: 'Fasting blood sugar level' },
  { key: 'restecg', label: 'Resting ECG', type: 'select', options: [
    { value: '0', label: 'Normal' },
    { value: '1', label: 'ST-T wave abnormality' },
    { value: '2', label: 'Left ventricular hypertrophy' }
  ], icon: Activity, description: 'Resting electrocardiographic results' },
  { key: 'thalach', label: 'Max Heart Rate', type: 'number', min: 60, max: 220, icon: Heart, description: 'Maximum heart rate achieved' },
  { key: 'exang', label: 'Exercise Induced Angina', type: 'select', options: [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' }
  ], icon: Activity, description: 'Exercise induced angina' },
  { key: 'oldpeak', label: 'ST Depression', type: 'number', min: 0, max: 10, step: 0.1, icon: TrendingUp, description: 'ST depression induced by exercise' },
  { key: 'slope', label: 'ST Slope', type: 'select', options: [
    { value: '0', label: 'Upsloping' },
    { value: '1', label: 'Flat' },
    { value: '2', label: 'Downsloping' }
  ], icon: TrendingUp, description: 'Slope of peak exercise ST segment' },
  { key: 'ca', label: 'Major Vessels', type: 'select', options: [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
  ], icon: Heart, description: 'Number of major vessels colored by fluoroscopy' },
  { key: 'thal', label: 'Thalassemia', type: 'select', options: [
    { value: '1', label: 'Normal' },
    { value: '2', label: 'Fixed defect' },
    { value: '3', label: 'Reversible defect' }
  ], icon: Brain, description: 'Thalassemia type' }
];

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  wrapper: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  headerIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  iconContainer: {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    padding: '12px',
    borderRadius: '16px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.125rem',
    maxWidth: '500px',
    margin: '0 auto'
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden'
  },
  formContainer: {
    padding: '32px'
  },
  progressContainer: {
    marginBottom: '32px'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  progressText: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    transition: 'width 0.5s ease-out'
  },
  formGrid: {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '8px'
  },
  labelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  labelIcon: {
    width: '16px',
    height: '16px',
    color: '#2563eb'
  },
  description: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 'normal'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: '#f9fafb',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#3b82f6',
    outline: 'none',
    backgroundColor: 'white',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  buttonPrev: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280'
  },
  buttonNext: {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: 'white',
    transform: 'scale(1)',
    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
  },
  buttonSubmit: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  resultsContainer: {
    padding: '32px'
  },
  resultsHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  resultsIconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  resultsIconBg: {
    backgroundColor: '#dcfce7',
    padding: '12px',
    borderRadius: '16px'
  },
  resultsTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  resultsSubtitle: {
    color: '#6b7280'
  },
  resultsGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    marginBottom: '32px'
  },
  resultCard: {
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid'
  },
  resultCardRisk: {
    backgroundColor: '#fef2f2',
    borderColor: '#fceccca'
  },
  resultCardSafe: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0'
  },
  resultCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  resultIcon: {
    width: '24px',
    height: '24px'
  },
  resultIconRisk: {
    color: '#dc2626'
  },
  resultIconSafe: {
    color: '#16a34a'
  },
  resultTitle: {
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  resultStatus: {
    fontSize: '0.875rem',
    fontWeight: '500',
    margin: '4px 0 0 0'
  },
  resultStatusRisk: {
    color: '#dc2626'
  },
  resultStatusSafe: {
    color: '#16a34a'
  },
  clusterCard: {
    background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #c7d2fe',
    marginBottom: '32px'
  },
  clusterHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  clusterIcon: {
    width: '24px',
    height: '24px',
    color: '#2563eb'
  },
  clusterTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  clusterValue: {
    color: '#1e40af',
    fontWeight: '600',
    fontSize: '1.125rem'
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center'
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px',
    color: '#6b7280',
    fontSize: '0.875rem'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Add keyframes for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: 'rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

function App() {
  const init = Object.fromEntries(features.map(f => [f.key, '']));
  const [data, setData] = useState(init);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = e => setData({...data, [e.target.name]: e.target.value});
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { features: features.map(f => f.key), ...data };
      const res = await axios.post('http://localhost:5000/predict', payload);
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const isFormValid = features.every(f => data[f.key] !== '');
  const stepsPerPage = 4;
  const totalSteps = Math.ceil(features.length / stepsPerPage);
  const currentFeatures = features.slice(currentStep * stepsPerPage, (currentStep + 1) * stepsPerPage);

  const getInputStyle = (inputName) => ({
    ...styles.input,
    ...(focusedInput === inputName ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <div style={styles.iconContainer}>
              <Stethoscope style={{width: '32px', height: '32px', color: 'white'}} />
            </div>
            <h1 style={styles.title}>Health Risk Analyzer</h1>
          </div>
          <p style={styles.subtitle}>
            Advanced AI-powered health risk assessment using machine learning
          </p>
        </div>

        <div style={styles.card}>
          {!response ? (
            <div style={styles.formContainer}>
              {/* Progress Bar */}
              <div style={styles.progressContainer}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressText}>
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <span style={styles.progressText}>
                    {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${((currentStep + 1) / totalSteps) * 100}%`
                    }}
                  />
              </div>
            </div>

            {/* Form Fields */}
            <div style={styles.formGrid}>
              {currentFeatures.map(feature => {
                const Icon = feature.icon;
                return (
                  <div key={feature.key} style={styles.fieldContainer}>
                    <label style={styles.label}>
                      <div style={styles.labelHeader}>
                        <Icon style={styles.labelIcon} />
                        {feature.label}
                      </div>
                      <p style={styles.description}>{feature.description}</p>
                    </label>
                    
                    {feature.type === 'select' ? (
                      <select
                        name={feature.key}
                        value={data[feature.key]}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput(feature.key)}
                        onBlur={() => setFocusedInput(null)}
                        required
                        style={getInputStyle(feature.key)}
                      >
                        <option value="">Select {feature.label}</option>
                        {feature.options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={feature.type}
                        name={feature.key}
                        value={data[feature.key]}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput(feature.key)}
                        onBlur={() => setFocusedInput(null)}
                        min={feature.min}
                        max={feature.max}
                        step={feature.step}
                        required
                        placeholder={`Enter ${feature.label.toLowerCase()}`}
                        style={getInputStyle(feature.key)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div style={styles.buttonContainer}>
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                style={{
                  ...styles.button,
                  ...styles.buttonPrev,
                  ...(currentStep === 0 ? styles.buttonDisabled : '')
                }}
              >
                Previous
              </button>

              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                  style={{
                    ...styles.button,
                    ...styles.buttonNext
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  style={{
                    ...styles.button,
                    ...styles.buttonSubmit,
                    ...(!isFormValid || loading ? styles.buttonDisabled : '')
                  }}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => e.target.disabled && (e.target.style.transform = 'scale(1)')}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Heart style={{width: '20px', height: '20px'}} />
                      Analyze Risk
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          ) : (
            /* Results Section */
            <div style={styles.resultsContainer}>
              <div style={styles.resultsHeader}>
                <div style={styles.resultsIconContainer}>
                  <div style={styles.resultsIconBg}>
                    <CheckCircle style={{width: '32px', height: '32px', color: '#16a34a'}} />
                  </div>
                  <h2 style={styles.resultsTitle}>Analysis Complete</h2>
                </div>
                <p style={styles.resultsSubtitle}>Your health risk assessment results</p>
              </div>

              {/* Algorithm Result */}
              <div style={styles.resultsGrid}>
                <div
                  style={{
                    ...styles.resultCard,
                    ...(response.result === 'At Risk' ? styles.resultCardRisk : styles.resultCardSafe)
                  }}
                >
                  <div style={styles.resultCardHeader}>
                    {response.result === 'At Risk' ? (
                      <AlertCircle style={{...styles.resultIcon, ...styles.resultIconRisk}} />
                    ) : (
                      <CheckCircle style={{...styles.resultIcon, ...styles.resultIconSafe}} />
                    )}
                    <div>
                      <h3 style={styles.resultTitle}>{response.model}</h3>
                      <p style={{
                        ...styles.resultStatus,
                        ...(response.result === 'At Risk' ? styles.resultStatusRisk : styles.resultStatus.resultStatusSafe)
                      }}>
                        {response.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 


              {/* Lifestyle Cluster */}
              <div style={styles.clusterCard}>
                <div style={styles.clusterHeader}>
                  <Brain style={styles.clusterIcon} />
                  <h3 style={styles.clusterTitle}>Lifestyle Assessment</h3>
                </div>
                <p style={styles.clusterValue}>Cluster {response.cluster}</p>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  onClick={() => {
                    setResponse(null);
                    setCurrentStep(0);
                    setData(init);
                  }}
                  style={{
                    ...styles.button,
                    ...styles.buttonNext
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  New Analysis
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrev
                  }}
                >
                  Print Results
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>This tool is for educational purposes only. Consult healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  );
}

export default App