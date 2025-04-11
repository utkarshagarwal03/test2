
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HealthcareProvider } from "@/contexts/HealthcareContext";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import AddPatientPage from "./pages/AddPatientPage";
import AddMedicationPage from "./pages/AddMedicationPage";
import MentalHealthScreeningPage from "./pages/MentalHealthScreeningPage";
import ADRResultsPage from "./pages/ADRResultsPage";
import DailySummaryPage from "./pages/DailySummaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <HealthcareProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient-details" element={<PatientDetailsPage />} />
              <Route path="/add-patient" element={<AddPatientPage />} />
              <Route path="/add-medication" element={<AddMedicationPage />} />
              <Route path="/mental-health-screening" element={<MentalHealthScreeningPage />} />
              <Route path="/adr-results" element={<ADRResultsPage />} />
              <Route path="/daily-summary" element={<DailySummaryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HealthcareProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
