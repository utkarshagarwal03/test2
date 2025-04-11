
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare, MentalHealthScore } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft } from 'lucide-react';

const MentalHealthScreening = () => {
  const { currentPatient, addMentalHealthScore } = useHealthcare();
  const navigate = useNavigate();
  
  const [mentalHealthData, setMentalHealthData] = useState<Omit<MentalHealthScore, 'date'>>({
    anxietyScore: 0,
    depressionScore: 0,
    stressScore: 0,
    notes: '',
  });

  if (!currentPatient) {
    navigate('/dashboard');
    return null;
  }

  const handleSliderChange = (name: keyof typeof mentalHealthData, value: number[]) => {
    setMentalHealthData({ ...mentalHealthData, [name]: value[0] });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMentalHealthData({ ...mentalHealthData, notes: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScore: MentalHealthScore = {
      ...mentalHealthData,
      date: new Date().toISOString().split('T')[0],
    };
    
    addMentalHealthScore(currentPatient.id, newScore);
    navigate('/patient-details');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/patient-details')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Patient Details
        </Button>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Mental Health Assessment</CardTitle>
          <CardDescription>Screening for {currentPatient.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="mentalHealthForm" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>
                  Anxiety Level: {mentalHealthData.anxietyScore}
                </Label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">None</span>
                  <Slider
                    value={[mentalHealthData.anxietyScore]}
                    max={10}
                    step={1}
                    onValueChange={(value) => handleSliderChange('anxietyScore', value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Severe</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>
                  Depression Level: {mentalHealthData.depressionScore}
                </Label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">None</span>
                  <Slider
                    value={[mentalHealthData.depressionScore]}
                    max={10}
                    step={1}
                    onValueChange={(value) => handleSliderChange('depressionScore', value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Severe</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>
                  Stress Level: {mentalHealthData.stressScore}
                </Label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">None</span>
                  <Slider
                    value={[mentalHealthData.stressScore]}
                    max={10}
                    step={1}
                    onValueChange={(value) => handleSliderChange('stressScore', value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Severe</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={mentalHealthData.notes}
                onChange={handleNotesChange}
                placeholder="Add any relevant notes about the patient's mental state..."
                rows={4}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/patient-details')}>
            Cancel
          </Button>
          <Button type="submit" form="mentalHealthForm" className="bg-healthcare-primary hover:bg-healthcare-primary/90">
            Save Assessment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MentalHealthScreening;
