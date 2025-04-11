
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PatientList from '@/components/PatientList';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, Activity, ShieldAlert } from 'lucide-react';
import { useHealthcare } from '@/contexts/HealthcareContext';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { patients } = useHealthcare();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Calculate quick stats
  const activePatients = patients.length;
  const withMedications = patients.filter(p => p.medications.length > 0).length;
  const withMentalHealthAssessments = patients.filter(p => p.mentalHealthScores.length > 0).length;
  const highRiskPatients = patients.filter(p => p.medications.length > 3).length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
      <Navbar />
      <div className="container flex-1 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indian-blue">Healthcare Dashboard</h1>
          <p className="text-indian-blue/80">
            Welcome, {user?.name}. Here's an overview of your practice and patients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white hover:shadow-lg transition-shadow border-indian-blue/10 overflow-hidden rounded-xl">
            <div className="h-1 bg-gradient-to-r from-indian-saffron to-indian-orange"></div>
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 p-3 rounded-full bg-indian-saffron/10">
                <Users className="h-6 w-6 text-indian-saffron" />
              </div>
              <div>
                <p className="text-sm text-indian-blue/60">Active Patients</p>
                <p className="text-2xl font-bold text-indian-blue">{activePatients}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-lg transition-shadow border-indian-blue/10 overflow-hidden rounded-xl">
            <div className="h-1 bg-gradient-to-r from-indian-blue to-indian-purple"></div>
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 p-3 rounded-full bg-indian-blue/10">
                <UserPlus className="h-6 w-6 text-indian-blue" />
              </div>
              <div>
                <p className="text-sm text-indian-blue/60">With Medications</p>
                <p className="text-2xl font-bold text-indian-blue">{withMedications}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-lg transition-shadow border-indian-blue/10 overflow-hidden rounded-xl">
            <div className="h-1 bg-gradient-to-r from-indian-purple to-indian-blue"></div>
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 p-3 rounded-full bg-indian-purple/10">
                <Activity className="h-6 w-6 text-indian-purple" />
              </div>
              <div>
                <p className="text-sm text-indian-blue/60">With Assessments</p>
                <p className="text-2xl font-bold text-indian-blue">{withMentalHealthAssessments}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-lg transition-shadow border-indian-blue/10 overflow-hidden rounded-xl">
            <div className="h-1 bg-gradient-to-r from-indian-red to-indian-orange"></div>
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 p-3 rounded-full bg-indian-red/10">
                <ShieldAlert className="h-6 w-6 text-indian-red" />
              </div>
              <div>
                <p className="text-sm text-indian-blue/60">High Risk</p>
                <p className="text-2xl font-bold text-indian-blue">{highRiskPatients}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-gradient-to-r from-indian-blue/5 to-indian-blue/10 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-indian-blue">All Patients</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-indian-blue">Recently Added</TabsTrigger>
            <TabsTrigger value="critical" className="data-[state=active]:bg-white data-[state=active]:text-indian-blue">High Priority</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <PatientList />
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <PatientList filter="recent" />
          </TabsContent>
          
          <TabsContent value="critical" className="mt-0">
            <PatientList filter="critical" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
