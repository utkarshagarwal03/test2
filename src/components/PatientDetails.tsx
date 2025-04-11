
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pill, Brain, ChevronRight, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const PatientDetails = () => {
  const { currentPatient, detectADR } = useHealthcare();
  const navigate = useNavigate();

  if (!currentPatient) {
    navigate('/dashboard');
    return null;
  }

  const handleRunADRDetection = () => {
    detectADR(currentPatient.id);
    navigate('/adr-results');
  };

  const handleAddMedication = () => {
    navigate('/add-medication');
  };

  const handleMentalHealthAssessment = () => {
    navigate('/mental-health-screening');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Personal and medical details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
                <p>{currentPatient.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Age</h3>
                <p>{currentPatient.age} years</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Gender</h3>
                <p>{currentPatient.gender}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Medical Conditions</h3>
                <ul className="list-disc list-inside">
                  {currentPatient.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:w-2/3 space-y-6">
          <Tabs defaultValue="medications">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
            </TabsList>
            
            <TabsContent value="medications" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  Current Medications
                </h2>
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleRunADRDetection} className="text-healthcare-danger border-healthcare-danger hover:bg-healthcare-danger/10">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Run ADR Detection
                  </Button>
                  <Button onClick={handleAddMedication} className="bg-healthcare-primary hover:bg-healthcare-primary/90">
                    Add Medication
                  </Button>
                </div>
              </div>
              
              {currentPatient.medications.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {currentPatient.medications.map((medication) => (
                        <li key={medication.id} className="p-4 hover:bg-muted/50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{medication.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {medication.dosage} - {medication.frequency}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Started: {format(new Date(medication.startDate), 'PPP')}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No medications recorded</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="mental-health" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Mental Health Assessments
                </h2>
                <Button onClick={handleMentalHealthAssessment} className="bg-healthcare-primary hover:bg-healthcare-primary/90">
                  New Assessment
                </Button>
              </div>
              
              {currentPatient.mentalHealthScores.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {currentPatient.mentalHealthScores.map((score, index) => (
                        <li key={index} className="p-4 hover:bg-muted/50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Assessment on {format(new Date(score.date), 'PPP')}</h3>
                              <div className="grid grid-cols-3 gap-4 mt-2">
                                <div>
                                  <p className="text-xs text-muted-foreground">Anxiety</p>
                                  <p className="font-medium">{score.anxietyScore}/10</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Depression</p>
                                  <p className="font-medium">{score.depressionScore}/10</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Stress</p>
                                  <p className="font-medium">{score.stressScore}/10</p>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No mental health assessments recorded</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
