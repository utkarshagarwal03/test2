
import { useCallback } from 'react';
import { type Patient } from '@/contexts/HealthcareContext';

// Define an interface for prediction results
export interface PredictionResult {
  condition: string;
  probability: number;
  description: string;
  warningLevel: 'low' | 'medium' | 'high';
}

export const usePrediction = () => {
  // Function to predict potential symptoms or conditions based on patient data
  const predictConditions = useCallback((patient: Patient): PredictionResult[] => {
    const predictions: PredictionResult[] = [];
    
    // Mock prediction logic based on existing conditions and medications
    // In a real application, this would use actual ML models or medical knowledge bases
    
    // Check for diabetes-related conditions
    if (patient.conditions.some(c => 
        c.toLowerCase().includes('diabetes') || 
        c.toLowerCase().includes('blood sugar'))) {
      
      predictions.push({
        condition: 'Diabetic Neuropathy',
        probability: 0.65,
        description: 'Nerve damage that can occur in patients with diabetes, causing tingling or pain in extremities.',
        warningLevel: 'medium'
      });
      
      predictions.push({
        condition: 'Diabetic Retinopathy',
        probability: 0.48,
        description: 'Damage to the blood vessels in the retina due to diabetes, may lead to vision problems.',
        warningLevel: 'medium'
      });
    }
    
    // Check for hypertension-related conditions
    if (patient.conditions.some(c => 
        c.toLowerCase().includes('hypertension') || 
        c.toLowerCase().includes('high blood pressure'))) {
      
      predictions.push({
        condition: 'Coronary Artery Disease',
        probability: 0.55,
        description: 'Narrowing of coronary arteries that can lead to heart attacks.',
        warningLevel: 'high'
      });
      
      predictions.push({
        condition: 'Stroke Risk',
        probability: 0.42,
        description: 'Increased risk of blood vessel blockage or rupture in the brain.',
        warningLevel: 'high'
      });
    }
    
    // Check for asthma-related conditions
    if (patient.conditions.some(c => 
        c.toLowerCase().includes('asthma'))) {
      
      predictions.push({
        condition: 'Chronic Obstructive Pulmonary Disease',
        probability: 0.38,
        description: 'Progressive lung disease causing breathing difficulty.',
        warningLevel: 'medium'
      });
    }
    
    // Add traditional Ayurvedic insights for Indian context
    if (patient.conditions.some(c => 
        c.toLowerCase().includes('diabetes'))) {
      predictions.push({
        condition: 'Imbalanced Kapha Dosha',
        probability: 0.45,
        description: 'According to Ayurveda, diabetes (Madhumeha) is related to Kapha imbalance. May benefit from certain herbal supplements.',
        warningLevel: 'medium'
      });
    }
    
    if (patient.conditions.some(c => 
        c.toLowerCase().includes('hypertension'))) {
      predictions.push({
        condition: 'Pitta-Vata Imbalance',
        probability: 0.40,
        description: 'According to Ayurvedic medicine, high blood pressure often indicates Pitta and Vata imbalance. Lifestyle changes may help.',
        warningLevel: 'medium'
      });
    }
    
    // Medication-based predictions
    const medicationNames = patient.medications.map(m => m.name.toLowerCase());
    
    if (medicationNames.some(med => med.includes('metformin'))) {
      predictions.push({
        condition: 'Vitamin B12 Deficiency',
        probability: 0.32,
        description: 'Long-term metformin use can lead to vitamin B12 deficiency.',
        warningLevel: 'low'
      });
    }
    
    if (medicationNames.some(med => med.includes('lisinopril') || med.includes('enalapril'))) {
      predictions.push({
        condition: 'Chronic Cough',
        probability: 0.25,
        description: 'ACE inhibitors may cause a persistent dry cough in some patients.',
        warningLevel: 'low'
      });
    }
    
    // If not enough predictions, add some general ones based on demographics
    if (predictions.length < 2) {
      if (patient.age > 50) {
        predictions.push({
          condition: 'Osteoarthritis',
          probability: 0.4,
          description: 'Degenerative joint disease that becomes more common with age.',
          warningLevel: 'low'
        });
      }
      
      // Add mental health prediction based on assessment scores if available
      if (patient.mentalHealthScores.length > 0) {
        const latestScore = patient.mentalHealthScores[patient.mentalHealthScores.length - 1];
        if (latestScore.anxietyScore > 5 || latestScore.depressionScore > 5) {
          predictions.push({
            condition: 'Chronic Fatigue Syndrome',
            probability: 0.35,
            description: 'Extreme fatigue that can be worsened by mental health conditions.',
            warningLevel: 'medium'
          });
        }
      }
    }
    
    // Sort by probability in descending order
    return predictions.sort((a, b) => b.probability - a.probability);
  }, []);
  
  return { predictConditions };
};
