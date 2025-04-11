
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DailySummary from '@/components/DailySummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

const DailySummaryPage = () => {
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
            <BarChart3 className="mr-2 h-6 w-6 text-indian-green" />
            Daily Summary
          </h1>
          <p className="text-indian-blue/70">
            End-of-day overview of patient statistics, activities and important alerts
          </p>
        </div>
        
        <Card className="border border-indian-blue/10 overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="bg-indian-blue/5">
            <CardTitle className="text-indian-blue">Practice Overview</CardTitle>
            <CardDescription className="text-indian-blue/70">
              A comprehensive summary of today's activities and important metrics for your practice
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <DailySummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySummaryPage;
