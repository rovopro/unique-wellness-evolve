import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import UsersPage from "./pages/dashboard/UsersPage";
import UserProfile from "./pages/dashboard/UserProfile";
import TeamsPage from "./pages/dashboard/TeamsPage";
import TeamDetail from "./pages/dashboard/TeamDetail";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import BillingPage from "./pages/dashboard/BillingPage";
import IntegrationsPage from "./pages/dashboard/IntegrationsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import SupportPage from "./pages/dashboard/SupportPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pricing />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserProfile />} />
              <Route path="teams" element={<TeamsPage />} />
              <Route path="teams/:id" element={<TeamDetail />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="support/:ticketId" element={<SupportPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
