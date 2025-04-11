
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PatientDetails from '@/components/PatientDetails';
import SymptomPredictor from '@/components/SymptomPredictor';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { useHealthcare } from '@/contexts/HealthcareContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PatientDetailsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { currentPatient } = useHealthcare();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const speakPatientDetails = () => {
    if (!currentPatient) {
      toast.error("No patient selected");
      return;
    }

    const textToSpeak = `
      Patient: ${currentPatient.name}, 
      Age: ${currentPatient.age}, 
      Gender: ${currentPatient.gender},
      Medical Conditions: ${currentPatient.conditions.join(', ') || 'None'},
      Current Medications: ${currentPatient.medications?.length ? 
        currentPatient.medications.map(med => 
          `${med.name}, ${med.dosage}, ${med.frequency}`
        ).join('. ') : 'None'
      }
    `;

    if (speak(textToSpeak)) {
      toast.success("Reading patient details");
    } else {
      toast.error("Text to speech not supported in your browser");
    }
  };

  // Different view based on user role
  if (user?.role === 'patient') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
        <Navbar />
        <div className="container flex-1 py-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Portal</CardTitle>
              <CardDescription>
                Welcome to your health dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-md mb-4">Your doctor can see your full medical record and will recommend treatments based on your health data.</p>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start mt-4">
                <ShieldAlert className="text-amber-500 mr-2 h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Privacy Notice</h3>
                  <p className="text-sm text-amber-700">Your medical information is securely stored and only accessible to your healthcare providers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <PatientDetails />
          {currentPatient && <SymptomPredictor patient={currentPatient} />}
        </div>
      </div>
    );
  }

  // Doctor view
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
      <Navbar />
      <div className="container flex-1 py-8">
        <div className="flex justify-end mb-4">
          {isSpeaking ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stop}
              className="flex items-center gap-2 bg-indian-saffron/10 hover:bg-indian-saffron/20 text-indian-saffron border-indian-saffron/20"
            >
              <VolumeX size={16} />
              Stop Reading
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={speakPatientDetails}
              className="flex items-center gap-2 bg-indian-saffron/10 hover:bg-indian-saffron/20 text-indian-saffron border-indian-saffron/20"
            >
              <Volume2 size={16} />
              Read Patient Details
            </Button>
          )}
        </div>
        <PatientDetails />
        {currentPatient && <SymptomPredictor patient={currentPatient} />}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
