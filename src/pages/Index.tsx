
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ShieldCheck, Stethoscope, Brain, Activity } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Stethoscope className="h-10 w-10 text-indian-saffron" />,
      title: "Patient Management",
      description: "Efficiently manage patient records, medications, and treatments in one place."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-indian-red" />,
      title: "ADR Detection",
      description: "Advanced detection of adverse drug reactions to enhance patient safety."
    },
    {
      icon: <Brain className="h-10 w-10 text-indian-purple" />,
      title: "Mental Health Screening",
      description: "Comprehensive mental health assessments for holistic patient care."
    },
    {
      icon: <Activity className="h-10 w-10 text-indian-green" />,
      title: "Daily Analytics",
      description: "End-of-day summaries and analytics to improve clinical decision making."
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row p-6 container mx-auto">
          <div className="w-full md:w-1/2 flex flex-col justify-center mb-8 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-indian-blue mb-4">
              Chikit<span className="text-indian-saffron">sak</span><span className="text-indian-red">AI</span>
            </h1>
            <p className="text-xl text-indian-blue/80 mb-8">
              An intelligent healthcare management system designed to streamline patient care and improve clinical outcomes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-start p-4 rounded-xl border border-indian-blue/10 bg-white hover:shadow-md transition-shadow">
                  <div className="p-2 rounded-full bg-indian-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-indian-blue">{feature.title}</h3>
                  <p className="text-indian-blue/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <Card className="w-full max-w-md border-indian-blue/10 overflow-hidden rounded-xl shadow-lg">
              <div className="h-2 bg-gradient-to-r from-indian-saffron via-indian-white to-indian-green"></div>
              <CardContent className="pt-6">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold mb-2 text-indian-blue">Welcome Back</h2>
                  <p className="text-indian-blue/70">Sign in to continue to your dashboard</p>
                </div>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indian-white to-indian-white/50">
      <Navbar />
      <div className="container flex-1 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4 text-indian-blue">Welcome, {user?.name}</h1>
          <p className="text-indian-blue/70 text-lg">
            Access your healthcare dashboard to manage patients and monitor care
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group border-indian-blue/10 rounded-xl">
            <div className="bg-gradient-to-r from-indian-saffron to-indian-red h-2"></div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-indian-blue">Patient Dashboard</h2>
                  <p className="text-indian-blue/70 mb-4">
                    Access patient information, record medications, and monitor health status
                  </p>
                </div>
                <div className="bg-indian-saffron/10 p-3 rounded-full">
                  <Stethoscope className="h-6 w-6 text-indian-saffron" />
                </div>
              </div>
              <img 
                src="/lovable-uploads/73708a81-1086-43f9-be1f-b839d4b6fedc.png" 
                alt="Doctor Dashboard" 
                className="w-full h-48 object-cover rounded-md mb-4 shadow"
              />
              <Button 
                className="w-full bg-gradient-to-r from-indian-saffron to-indian-red group-hover:from-indian-saffron/90 group-hover:to-indian-red/90 transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group border-indian-blue/10 rounded-xl">
            <div className="bg-gradient-to-r from-indian-green to-indian-blue h-2"></div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-indian-blue">Daily Summary</h2>
                  <p className="text-indian-blue/70 mb-4">
                    View end-of-day summary with patient statistics and important alerts
                  </p>
                </div>
                <div className="bg-indian-green/10 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-indian-green" />
                </div>
              </div>
              <img 
                src="/lovable-uploads/c03c96e7-acd2-4b10-a4ca-305508b00ef2.png" 
                alt="End-of-Day Summary" 
                className="w-full h-48 object-cover rounded-md mb-4 shadow"
              />
              <Button
                className="w-full bg-gradient-to-r from-indian-green to-indian-blue group-hover:from-indian-green/90 group-hover:to-indian-blue/90 transition-colors"
                onClick={() => navigate('/daily-summary')}
              >
                View Summary
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
