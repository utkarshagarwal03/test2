
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare, Medication } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';

const AddMedicationForm = () => {
  const { currentPatient, addMedication } = useHealthcare();
  const navigate = useNavigate();
  
  const [medicationData, setMedicationData] = useState<Omit<Medication, 'id'>>({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  if (!currentPatient) {
    navigate('/dashboard');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicationData({ ...medicationData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMedication: Medication = {
      ...medicationData,
      id: Date.now().toString(),
    };
    
    addMedication(currentPatient.id, newMedication);
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
          <CardTitle>Add New Medication</CardTitle>
          <CardDescription>Add a medication for {currentPatient.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="medicationForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input
                id="name"
                name="name"
                value={medicationData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  name="dosage"
                  value={medicationData.dosage}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 10mg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  name="frequency"
                  value={medicationData.frequency}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Once daily"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={medicationData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={medicationData.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes about this medication..."
                rows={3}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/patient-details')}>
            Cancel
          </Button>
          <Button type="submit" form="medicationForm" className="bg-healthcare-primary hover:bg-healthcare-primary/90">
            Add Medication
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMedicationForm;
