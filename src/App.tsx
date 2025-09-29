import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Partnership from "./pages/Partnership";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Import the forms and project pages
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationForm2 from "./pages/ApplicationForm2";
import StartProject from "./pages/StartProject";
import JoinAcademy from "./pages/JoinAcademy";

const queryClient = new QueryClient();

// Helper to check if the header should be shown
function useShowHeader() {
  const location = useLocation();
  return ![
    "/applicationform",
    "/applicationform2",
    "/start-project",
    "/join-academy"
  ].includes(location.pathname);
}

function AppRoutes() {
  const showHeader = useShowHeader();

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/training" element={<Training />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
        <Route path="/applicationform2" element={<ApplicationForm2 />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/join-academy" element={<JoinAcademy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// Main App
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;