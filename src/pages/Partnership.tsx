import { Card } from "@/components/ui/card";
import { Building, GraduationCap, Users, Zap } from "lucide-react";
import partnershipImg from "../assets/image-removebg-preview (7) 1.png";

const Partnership = () => {
  return (
    <main className="pt-16 font-nunito">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Heading in blue, Oswald */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-oswald" style={{ color: "#170961" }}>
              Partnerships
            </h1>
            {/* Subtitle, Nunito, black */}
            <p className="text-xl text-foreground font-nunito">
              Great things in business are never done by one person, they're<br />
              done by a team of people
            </p>
          </div>
        </div>
      </section>

      {/* We Collaborate With Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 justify-center max-w-6xl mx-auto">
            {/* Collaboration Card */}
            <div className="flex-1 max-w-lg">
              <h2 className="text-2xl font-bold text-[#170961] mb-6 font-oswald underline">
                We collaborate with:
              </h2>
              
              <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth">
                <ul className="space-y-4">
                  {[
                    "Startups & Entrepreneurs",
                    "Businesses seeking digital transformation",
                    "Schools & Institutions", 
                    "Innovation Hubs"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-foreground text-lg font-nunito">
                      <span className="text-[#170961] font-bold mr-3 text-xl">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Contact Section */}
              <div className="mt-8">
                <p className="text-foreground text-lg mb-4 font-nunito">
                  If you are interested in collaborating with Us, send us an email to:
                </p>
                <a
                  href="mailto:careers@codingplayground.tech"
                  className="text-[#170961] font-bold text-xl underline hover:text-[#1a0b70] transition-colors font-oswald"
                >
                  careers@codingplayground.tech
                </a>
              </div>
            </div>

            {/* Partnership Image */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <img 
                src={partnershipImg} 
                alt="Partnerships" 
                className="w-64 h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Partnership;