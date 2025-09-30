import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, DollarSign } from "lucide-react";
import weAreHiring from "../assets/image 17.png";
import { useNavigate } from "react-router-dom";

const Careers = ({ onApply }: { onApply?: () => void }) => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    // Navigate to ApplicationForm page
    navigate("/applicationform");
  };

  const openPositions = [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Join our engineering team to build innovative software solutions and scalable applications.",
      requirements: ["Strong programming fundamentals", "Problem-solving skills", "Team collaboration", "Continuous learning mindset"]
    },
    {
      title: "Frontend/Backend Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Develop user-facing features and robust backend systems for our platforms.",
      requirements: ["JavaScript/TypeScript", "React or Node.js", "API development", "Database knowledge"]
    },
    {
      title: "Business Development Lead",
      department: "Business",
      location: "Remote",
      type: "Full-time",
      salary: "Base + Commission",
      description: "Drive business growth by connecting with potential clients and partners.",
      requirements: ["Sales experience", "Communication skills", "Strategic thinking", "Goal-oriented mindset"]
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "Competitive",
      description: "Develop and execute digital marketing strategies to grow our brand presence.",
      requirements: ["Digital marketing experience", "Content creation", "Analytics proficiency", "Creative thinking"]
    },
    {
      title: "Robotics Engineer (Tutor)",
      department: "Education",
      location: "Hybrid",
      type: "Full-time",
      salary: "Competitive",
      description: "Teach robotics and engineering concepts to students of all levels.",
      requirements: ["Robotics experience", "Teaching ability", "Technical knowledge", "Passion for STEM education"]
    },
    {
      title: "Video Editor",
      department: "Content",
      location: "Remote",
      type: "Full-time",
      salary: "Competitive",
      description: "Create engaging video content for our courses and marketing materials.",
      requirements: ["Video editing skills", "Creative storytelling", "Software proficiency", "Attention to detail"]
    }
  ];

  return (
    <main className="pt-16 font-nunito">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#170961] mb-6 font-oswald">
              Careers
            </h1>
            <p className="text-lg sm:text-xl text-foreground font-nunito mb-8">
              Join our growing team of innovators, developers, and educators.
            </p>
            <p className="text-base sm:text-lg text-foreground leading-relaxed font-nunito max-w-3xl mx-auto">
              At CodingPlayGround Technologies, we’re building a culture of innovation, creativity, and impact. We welcome passionate people at all levels, including entry-level applicants eager to learn. We also offer internships for beginners looking to hone their skills and grow into professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Current Open Roles & Hiring Image */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 justify-center max-w-6xl mx-auto">
            {/* Open Roles Card */}
            <Card className="p-6 sm:p-8 shadow-card hover:shadow-elegant transition-smooth flex-1 max-w-lg w-full">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2 font-oswald underline">
                  Current Open Roles
                </h2>
              </div>
              
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Software Engineer",
                  "Frontend/Backend Developer", 
                  "Coding Instructor",
                  "Business Development Lead",
                  "Digital Marketing Specialist",
                  "Robotics Engineer (Tutor)",
                  "Video Editor"
                ].map((role, index) => (
                  <li key={index} className="flex items-center text-foreground text-base sm:text-lg font-nunito">
                    <span className="text-primary font-bold mr-3 text-lg sm:text-xl">✔</span>
                    {role}
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                <Button 
                  onClick={handleApplyNow}
                  variant="hero" 
                  size="lg"
                  className="w-full max-w-xs mx-auto bg-primary hover:bg-primary/90 font-nunito"
                >
                  Apply Now
                </Button>
              </div>
            </Card>

            {/* We Are Hiring Image */}
            <div className="flex-1 flex justify-center lg:justify-start w-full">
              <img 
                src={weAreHiring} 
                alt="We Are Hiring" 
                className="w-48 sm:w-64 h-auto lg:mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;