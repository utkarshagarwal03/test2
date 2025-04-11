
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthcare, ADRResult } from '@/contexts/HealthcareContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const severityIcons = {
  low: <Info className="h-5 w-5 text-healthcare-primary" />,
  medium: <AlertTriangle className="h-5 w-5 text-healthcare-accent" />,
  high: <XCircle className="h-5 w-5 text-healthcare-danger" />,
};

const ADRResults = () => {
  const { currentPatient, detectADR } = useHealthcare();
  const [results, setResults] = useState<ADRResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPatient) {
      const adrResults = detectADR(currentPatient.id);
      setResults(adrResults);
    } else {
      navigate('/dashboard');
    }
  }, [currentPatient, detectADR, navigate]);

  if (!currentPatient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/patient-details')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Patient Details
        </Button>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Adverse Drug Reaction (ADR) Results</CardTitle>
          <CardDescription>Analysis for {currentPatient.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Alert 
                  key={index} 
                  variant={result.severity === 'high' ? 'destructive' : 'default'}
                  className={
                    result.severity === 'medium' 
                      ? 'border-healthcare-accent bg-healthcare-accent/10' 
                      : result.severity === 'low'
                      ? 'border-healthcare-primary bg-healthcare-primary/10'
                      : ''
                  }
                >
                  <div className="flex items-start">
                    {severityIcons[result.severity]}
                    <div className="ml-4">
                      <AlertTitle className="text-base font-semibold">
                        {result.medication} - {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Risk
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        <p className="mb-2">{result.description}</p>
                        <p className="font-medium">Recommendation: {result.recommendation}</p>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-healthcare-secondary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No ADRs Detected</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No potential adverse drug reactions were detected for this patient's current medication regimen.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => navigate('/patient-details')} className="bg-healthcare-primary hover:bg-healthcare-primary/90">
            Return to Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ADRResults;
