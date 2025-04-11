
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare, Patient } from '@/contexts/HealthcareContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserCircle, AlertTriangle, Pill, Brain, Star, ShieldAlert, Thermometer } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PatientListProps {
  filter?: 'all' | 'recent' | 'critical';
}

const PatientList: React.FC<PatientListProps> = ({ filter = 'all' }) => {
  const { patients, setCurrentPatient } = useHealthcare();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Apply filters based on the filter prop
  let filteredPatients = patients;
  
  if (filter === 'recent') {
    // Sort by most recently added (ensuring we're comparing numbers)
    filteredPatients = [...patients].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 5);
  } else if (filter === 'critical') {
    // Filter for patients with many medications or high mental health scores
    filteredPatients = patients.filter(patient => {
      const hasManyMeds = patient.medications.length > 3;
      const hasHighMentalHealthScore = patient.mentalHealthScores.some(score => 
        score.anxietyScore > 7 || score.depressionScore > 7 || score.stressScore > 7
      );
      return hasManyMeds || hasHighMentalHealthScore;
    });
  }
  
  // Then apply search filter
  filteredPatients = filteredPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient: Patient) => {
    setCurrentPatient(patient);
    navigate('/patient-details');
  };

  const handleAddNewPatient = () => {
    navigate('/add-patient');
  };

  // Function to determine patient priority
  const getPatientPriority = (patient: Patient): 'high' | 'medium' | 'low' => {
    // High priority if many medications or high mental health scores
    if (patient.medications.length > 3 || 
        patient.mentalHealthScores.some(score => 
          score.anxietyScore > 7 || score.depressionScore > 7 || score.stressScore > 7)) {
      return 'high';
    }
    // Medium priority if some medications or moderate mental health scores
    else if (patient.medications.length > 1 || 
        patient.mentalHealthScores.some(score => 
          score.anxietyScore > 4 || score.depressionScore > 4 || score.stressScore > 4)) {
      return 'medium';
    }
    // Otherwise low priority
    return 'low';
  };

  // Get badge color based on priority
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <Badge className="bg-indian-red/10 text-indian-red border border-indian-red/20">
            <ShieldAlert className="h-3 w-3 mr-1" />
            High Priority
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-indian-yellow/10 text-indian-yellow border border-indian-yellow/20">
            <Thermometer className="h-3 w-3 mr-1" />
            Medium Priority
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-indian-green/10 text-indian-green border border-indian-green/20">
            <Star className="h-3 w-3 mr-1" />
            Low Priority
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full overflow-hidden border border-indian-blue/10 bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indian-blue">Patient List</h2>
          <Button 
            onClick={handleAddNewPatient}
            className="bg-gradient-to-r from-indian-saffron to-indian-red hover:from-indian-saffron/90 hover:to-indian-red/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indian-blue/40" />
          <Input
            placeholder="Search patients..."
            className="pl-10 border-indian-blue/20 focus:border-indian-blue focus:ring-indian-blue rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredPatients.length > 0 ? (
          <div className="rounded-lg border border-indian-blue/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-indian-blue/5">
                  <TableHead className="text-indian-blue">Name</TableHead>
                  <TableHead className="text-indian-blue">Age</TableHead>
                  <TableHead className="text-indian-blue">Gender</TableHead>
                  <TableHead className="text-indian-blue">Conditions</TableHead>
                  <TableHead className="text-indian-blue">Priority</TableHead>
                  <TableHead className="text-indian-blue">Status</TableHead>
                  <TableHead className="text-indian-blue">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => {
                  const priority = getPatientPriority(patient);
                  return (
                    <TableRow key={patient.id} className={`hover:bg-indian-blue/5 transition-colors ${
                      priority === 'high' ? 'border-l-4 border-l-indian-red' : 
                      priority === 'medium' ? 'border-l-4 border-l-indian-yellow' : ''
                    }`}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {patient.conditions.map((condition, idx) => (
                            <Badge key={idx} variant="outline" className="bg-indian-blue/5 border-indian-blue/20 text-indian-blue">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(priority)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {patient.medications.length > 0 && (
                            <Badge className="bg-indian-blue/10 text-indian-blue border-indian-blue/20">
                              <Pill className="h-3 w-3 mr-1" />
                              {patient.medications.length}
                            </Badge>
                          )}
                          {patient.mentalHealthScores.length > 0 && (
                            <Badge className="bg-indian-purple/10 text-indian-purple border-indian-purple/20">
                              <Brain className="h-3 w-3 mr-1" />
                              {patient.mentalHealthScores.length}
                            </Badge>
                          )}
                          {patient.medications.length > 3 && (
                            <Badge className="bg-indian-red/10 text-indian-red border-indian-red/20">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              High Risk
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePatientSelect(patient)}
                          className="text-indian-blue border-indian-blue/20 hover:text-indian-saffron hover:bg-indian-saffron/5 hover:border-indian-saffron/30"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-indian-blue/5 rounded-lg border border-dashed border-indian-blue/20">
            <UserCircle className="h-12 w-12 text-indian-blue/30 mb-2 mx-auto" />
            <p className="text-indian-blue/60">No patients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
