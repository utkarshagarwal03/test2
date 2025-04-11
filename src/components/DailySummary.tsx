
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  UserCheck, 
  AlertTriangle, 
  Brain, 
  Calendar, 
  ChevronRight 
} from 'lucide-react';
import { format } from 'date-fns';

const DailySummary = () => {
  const { patients } = useHealthcare();
  const navigate = useNavigate();
  const today = new Date();

  // Count patients with potential issues
  const patientsWithManyMedications = patients.filter(p => p.medications.length > 3).length;
  const patientsWithHighMentalHealthScores = patients.filter(p => {
    const latestScore = p.mentalHealthScores[p.mentalHealthScores.length - 1];
    return latestScore && (latestScore.anxietyScore > 7 || latestScore.depressionScore > 7 || latestScore.stressScore > 7);
  }).length;

  // Get recent activity
  const recentActivity = [
    {
      type: 'medication',
      patientName: 'John Doe',
      detail: 'Added Lisinopril 10mg',
      time: '2 hours ago'
    },
    {
      type: 'assessment',
      patientName: 'Jane Smith',
      detail: 'Completed mental health screening',
      time: '4 hours ago'
    },
    {
      type: 'adr',
      patientName: 'Michael Johnson',
      detail: 'Detected potential drug interaction',
      time: '6 hours ago'
    }
  ];

  // Get upcoming appointments
  const upcomingAppointments = [
    {
      patientName: 'John Doe',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 30),
      reason: 'Follow-up appointment'
    },
    {
      patientName: 'Jane Smith',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 0),
      reason: 'Medication review'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold">End-of-Day Summary</h1>
      <p className="text-muted-foreground">{format(today, 'PPPP')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patients Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-healthcare-primary" />
              Patient Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">{patients.length}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-semibold">{patientsWithManyMedications}</p>
                  <p className="text-xs text-muted-foreground">Complex Medication</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{patientsWithHighMentalHealthScores}</p>
                  <p className="text-xs text-muted-foreground">Mental Health Concerns</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-healthcare-accent" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patients.some(p => p.medications.length > 3) ? (
                <div className="p-2 rounded-md bg-healthcare-accent/10 text-sm">
                  <p className="font-medium">Polypharmacy Concerns</p>
                  <p className="text-xs text-muted-foreground">Some patients have multiple medications</p>
                </div>
              ) : null}
              
              {patients.some(p => {
                const latestScore = p.mentalHealthScores[p.mentalHealthScores.length - 1];
                return latestScore && latestScore.anxietyScore > 7;
              }) ? (
                <div className="p-2 rounded-md bg-healthcare-primary/10 text-sm">
                  <p className="font-medium">Mental Health Monitoring</p>
                  <p className="text-xs text-muted-foreground">High anxiety scores detected</p>
                </div>
              ) : null}
              
              <div className="p-2 rounded-md bg-healthcare-secondary/10 text-sm">
                <p className="font-medium">Documentation Reminder</p>
                <p className="text-xs text-muted-foreground">Update patient progress notes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Brain className="h-5 w-5 mr-2 text-healthcare-secondary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="text-sm flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.patientName}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-healthcare-primary" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription>
            Schedule for the next few days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="divide-y">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{format(appointment.date, 'PPP')}</p>
                    <p className="text-sm text-muted-foreground">{format(appointment.date, 'p')}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No upcoming appointments</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySummary;
