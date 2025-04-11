
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AddMedicationForm from '@/components/AddMedicationForm';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const AddMedicationPage = () => {
  const { isAuthenticated } = useAuth();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const speakInstructions = () => {
    const instructions = `
      Add Medication Form Instructions:
      1. Fill in the medication name.
      2. Enter the dosage information, such as 10mg.
      3. Specify the frequency, like once daily or twice weekly.
      4. Select the start date for the medication.
      5. Optionally, add any notes or special instructions.
      6. Click Add Medication to save the information.
    `;

    if (speak(instructions)) {
      toast.success("Reading instructions");
    } else {
      toast.error("Text to speech not supported in your browser");
    }
  };

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
              onClick={speakInstructions}
              className="flex items-center gap-2 bg-indian-saffron/10 hover:bg-indian-saffron/20 text-indian-saffron border-indian-saffron/20"
            >
              <Volume2 size={16} />
              Read Instructions
            </Button>
          )}
        </div>
        <AddMedicationForm />
      </div>
    </div>
  );
};

export default AddMedicationPage;
