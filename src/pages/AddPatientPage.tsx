
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AddPatientForm from '@/components/AddPatientForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from 'lucide-react';

const AddPatientPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
      <Navbar />
      <div className="container flex-1 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center text-indian-blue">
            <UserPlus className="mr-2 h-6 w-6 text-indian-saffron" />
            Add New Patient
          </h1>
          <p className="text-indian-blue/70">
            Register a new patient and enter their initial health information
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto border border-indian-blue/10 overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="bg-indian-blue/5">
            <CardTitle className="text-indian-blue">Patient Registration</CardTitle>
            <CardDescription className="text-indian-blue/70">
              Fill out the form below with the patient's details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <AddPatientForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPatientPage;
