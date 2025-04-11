
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ADRResults from '@/components/ADRResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

const ADRResultsPage = () => {
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
            <AlertTriangle className="mr-2 h-6 w-6 text-indian-red" />
            Adverse Drug Reaction Results
          </h1>
          <p className="text-indian-blue/70">
            Review potential drug interactions and adverse reactions for your patients
          </p>
        </div>
        
        <Card className="border border-indian-blue/10 overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="bg-indian-blue/5">
            <CardTitle className="text-indian-blue">ADR Detection Analysis</CardTitle>
            <CardDescription className="text-indian-blue/70">
              Our AI-powered system continuously monitors for potential adverse drug reactions based on current medications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ADRResults />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ADRResultsPage;
