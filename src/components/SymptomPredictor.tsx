
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePrediction, type PredictionResult } from '@/hooks/usePrediction';
import { type Patient } from '@/contexts/HealthcareContext';

interface SymptomPredictorProps {
  patient: Patient;
}

const SymptomPredictor: React.FC<SymptomPredictorProps> = ({ patient }) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { predictConditions } = usePrediction();

  const handlePredict = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = predictConditions(patient);
      setPredictions(results);
      setIsLoading(false);
    }, 1500);
  };

  const handlePredictionClick = (prediction: PredictionResult) => {
    setSelectedPrediction(prediction);
    setShowDialog(true);
  };

  // Helper function to determine badge color
  const getBadgeStyles = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-indian-blue/10 text-indian-blue hover:bg-indian-blue/20';
      case 'medium':
        return 'bg-indian-orange/10 text-indian-orange hover:bg-indian-orange/20';
      case 'high':
        return 'bg-indian-red/10 text-indian-red hover:bg-indian-red/20';
      default:
        return 'bg-indian-blue/10 text-indian-blue hover:bg-indian-blue/20';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Symptom Predictor
        </CardTitle>
        <CardDescription>
          AI prediction of potential health conditions based on patient profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        {predictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-4">
              <Info className="h-12 w-12 text-indian-blue/50 mx-auto mb-2" />
              <p className="text-muted-foreground">
                Our AI can analyze patient data to predict potential health conditions they might develop.
              </p>
            </div>
            <Button 
              onClick={handlePredict}
              disabled={isLoading}
              className="bg-gradient-to-r from-indian-blue to-indian-purple hover:from-indian-blue/90 hover:to-indian-purple/90"
            >
              {isLoading ? 'Analyzing Patient Data...' : 'Generate Predictions'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Potential conditions based on analysis:</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPredictions([])}
              >
                Reset
              </Button>
            </div>
            <ul className="space-y-3">
              {predictions.map((prediction, index) => (
                <li 
                  key={index} 
                  className="p-3 rounded-lg border border-muted hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handlePredictionClick(prediction)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {prediction.warningLevel === 'high' && (
                        <AlertTriangle className="h-4 w-4 text-indian-red" />
                      )}
                      <span>{prediction.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {Math.round(prediction.probability * 100)}% probability
                      </span>
                      <Badge className={getBadgeStyles(prediction.warningLevel)}>
                        {prediction.warningLevel} risk
                      </Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These predictions are based on general patterns and should be verified by healthcare professionals.
            </p>
          </div>
        )}
      </CardContent>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedPrediction?.condition}
              {selectedPrediction?.warningLevel === 'high' && (
                <AlertTriangle className="h-4 w-4 text-indian-red" />
              )}
            </DialogTitle>
            <DialogDescription>
              Prediction details and recommendations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedPrediction?.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Probability</h4>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-indian-blue to-indian-purple" 
                  style={{ width: `${selectedPrediction ? selectedPrediction.probability * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {selectedPrediction ? Math.round(selectedPrediction.probability * 100) : 0}% chance
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Recommended Actions</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Discuss with healthcare provider at next appointment</li>
                <li>Monitor for early symptoms</li>
                <li>Consider preventative lifestyle changes</li>
                {selectedPrediction?.warningLevel === 'high' && (
                  <li className="text-indian-red">Schedule check-up in the next 1-2 months</li>
                )}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SymptomPredictor;
