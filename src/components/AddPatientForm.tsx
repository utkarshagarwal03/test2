
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare, Patient } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from 'lucide-react';

const AddPatientForm = () => {
  const { addPatient, setCurrentPatient } = useHealthcare();
  const navigate = useNavigate();
  
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    conditions: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleGenderChange = (value: string) => {
    setPatientData({ ...patientData, gender: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new patient object
    const newPatient: Patient = {
      id: Date.now().toString(),
      name: patientData.name,
      age: parseInt(patientData.age),
      gender: patientData.gender,
      conditions: patientData.conditions.split(',').map(c => c.trim()).filter(c => c !== ''),
      medications: [],
      mentalHealthScores: [],
    };
    
    addPatient(newPatient);
    setCurrentPatient(newPatient);
    navigate('/patient-details');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Patient</CardTitle>
          <CardDescription>Enter patient information to add them to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="patientForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={patientData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={patientData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={patientData.gender} onValueChange={handleGenderChange}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="conditions">Medical Conditions (comma separated)</Label>
              <Input
                id="conditions"
                name="conditions"
                value={patientData.conditions}
                onChange={handleInputChange}
                placeholder="e.g., Hypertension, Diabetes, Asthma"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" form="patientForm" className="bg-healthcare-primary hover:bg-healthcare-primary/90">
            Add Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPatientForm;
