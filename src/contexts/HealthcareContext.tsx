
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Types
export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  medications: Medication[];
  mentalHealthScores: MentalHealthScore[];
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  notes?: string;
};

export type MentalHealthScore = {
  date: string;
  anxietyScore: number;
  depressionScore: number;
  stressScore: number;
  notes?: string;
};

export type ADRResult = {
  medication: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendation: string;
};

type HealthcareContextType = {
  patients: Patient[];
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patientData: Partial<Patient>) => void;
  addMedication: (patientId: string, medication: Medication) => void;
  addMentalHealthScore: (patientId: string, score: MentalHealthScore) => void;
  detectADR: (patientId: string) => ADRResult[];
};

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const useHealthcare = () => {
  const context = useContext(HealthcareContext);
  if (context === undefined) {
    throw new Error('useHealthcare must be used within a HealthcareProvider');
  }
  return context;
};

// Mock data with Indian names
const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'Arjun Patel',
    age: 45,
    gender: 'Male',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      {
        id: '101',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2023-01-15',
      },
      {
        id: '102',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2023-02-20',
      }
    ],
    mentalHealthScores: [
      {
        date: '2023-03-10',
        anxietyScore: 3,
        depressionScore: 2,
        stressScore: 4,
      }
    ]
  },
  {
    id: '2',
    name: 'Priya Malhotra',
    age: 38,
    gender: 'Female',
    conditions: ['Asthma', 'Allergic Rhinitis'],
    medications: [
      {
        id: '201',
        name: 'Albuterol',
        dosage: '90mcg',
        frequency: 'As needed',
        startDate: '2023-01-05',
      },
      {
        id: '202',
        name: 'Fluticasone',
        dosage: '50mcg',
        frequency: 'Once daily',
        startDate: '2023-01-10',
      }
    ],
    mentalHealthScores: [
      {
        date: '2023-03-15',
        anxietyScore: 5,
        depressionScore: 3,
        stressScore: 4,
      }
    ]
  },
  {
    id: '3',
    name: 'Raj Sharma',
    age: 52,
    gender: 'Male',
    conditions: ['Coronary Artery Disease', 'High Cholesterol'],
    medications: [
      {
        id: '301',
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        startDate: '2023-02-10',
      },
      {
        id: '302',
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        startDate: '2023-02-10',
      }
    ],
    mentalHealthScores: [
      {
        date: '2023-04-05',
        anxietyScore: 2,
        depressionScore: 1,
        stressScore: 3,
      }
    ]
  }
];

export const HealthcareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
    toast({
      title: "Patient added",
      description: `${patient.name} has been added to the system`,
    });
  };

  const updatePatient = (id: string, patientData: Partial<Patient>) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, ...patientData } : patient
    ));
    
    // Update current patient if it's the one being edited
    if (currentPatient && currentPatient.id === id) {
      setCurrentPatient({ ...currentPatient, ...patientData });
    }
    
    toast({
      title: "Patient updated",
      description: "Patient information has been updated",
    });
  };

  const addMedication = (patientId: string, medication: Medication) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          medications: [...patient.medications, medication]
        };
      }
      return patient;
    }));
    
    // Update current patient if it's the one being edited
    if (currentPatient && currentPatient.id === patientId) {
      setCurrentPatient({
        ...currentPatient,
        medications: [...currentPatient.medications, medication]
      });
    }
    
    toast({
      title: "Medication added",
      description: `${medication.name} has been added to the patient's record`,
    });
  };

  const addMentalHealthScore = (patientId: string, score: MentalHealthScore) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          mentalHealthScores: [...patient.mentalHealthScores, score]
        };
      }
      return patient;
    }));
    
    // Update current patient if it's the one being edited
    if (currentPatient && currentPatient.id === patientId) {
      setCurrentPatient({
        ...currentPatient,
        mentalHealthScores: [...currentPatient.mentalHealthScores, score]
      });
    }
    
    toast({
      title: "Mental health data saved",
      description: "The mental health assessment has been recorded",
    });
  };

  // Mock ADR detection - in a real app, this would use more sophisticated logic
  const detectADR = (patientId: string): ADRResult[] => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return [];
    
    const results: ADRResult[] = [];
    
    // Simple mock logic for demonstration
    if (patient.medications.length > 1) {
      // Check for drug interactions
      const medications = patient.medications;
      
      // Example: Lisinopril and Albuterol can interact
      const hasLisinopril = medications.some(med => med.name.toLowerCase().includes('lisinopril'));
      const hasAlbuterol = medications.some(med => med.name.toLowerCase().includes('albuterol'));
      
      if (hasLisinopril && hasAlbuterol) {
        results.push({
          medication: 'Lisinopril + Albuterol',
          severity: 'medium',
          description: 'Potential interaction that may decrease the effectiveness of Lisinopril',
          recommendation: 'Monitor blood pressure closely and consider alternative medications'
        });
      }
      
      // Example: Metformin side effect
      const hasMetformin = medications.some(med => med.name.toLowerCase().includes('metformin'));
      if (hasMetformin) {
        results.push({
          medication: 'Metformin',
          severity: 'low',
          description: 'Common side effects include gastrointestinal discomfort',
          recommendation: 'Take with food to reduce GI side effects'
        });
      }
    }
    
    toast({
      title: "ADR Detection Complete",
      description: `Found ${results.length} potential issues`,
    });
    
    return results;
  };

  return (
    <HealthcareContext.Provider
      value={{
        patients,
        currentPatient,
        setCurrentPatient,
        addPatient,
        updatePatient,
        addMedication,
        addMentalHealthScore,
        detectADR,
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
};
