import { Card } from "@/components/ui/card";
import { Linkedin, Github, Twitter } from "lucide-react";

// Profile images (you'll need to update these paths to match your actual images)
import directorImg from "../assets/Group 29.png";
import frontendImg from "../assets/Mask group.png";
import designerImg from "../assets/Mask group1.png";
import backendImg from "../assets/Mask group2.png";

// Social icon images
import whatsappIcon from "../assets/whatsapp icon.png";
import linkedinIcon from "../assets/linkedin icon.png";
import instagramIcon from "../assets/instagram icon.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Eunice Nzilani",
      role: "Lead Frontend Developer",
      image: frontendImg,
    },
    {
      name: "Mariam Tajudeen",
      role: "Lead UI/UX Designer",
      image: designerImg,
    },
    {
      name: "Wycliffe Kibet",
      role: "Lead Backend Developer",
      image: backendImg,
    }
  ];

  return (
    <main className="pt-16 font-nunito">
      {/* Director Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 justify-center">
              {/* Director Image */}
              <div className="relative flex-shrink-0">
                <div className="relative">
                  <img
                    src={directorImg}
                    alt="Director"
                    className="w-60 h-60 object-cover rounded-full shadow-lg"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-[#170961] font-semibold font-oswald text-lg rounded-lg px-5 py-2 shadow-lg border-2 border-[#170961] whitespace-nowrap text-center">
                    Director & Founder
                  </div>
                </div>
              </div>

              {/* Director Info */}
              <div className="flex-1 max-w-2xl text-left">
                <h2 className="text-2xl font-bold text-[#170961] mb-4 font-oswald">
                  Anakhe Ajayi
                </h2>
                <p className="text-foreground text-lg leading-relaxed mb-6 font-nunito">
                  Director of CodingPlayGround Technologies, I'm passionate about transforming ideas into scalable tech solutions. With experience in software development, product management, and startup consulting, I've led projects that bridge innovation and impact. At CodingPlayGround, my mission is to empower businesses and train the next generation of tech experts.
                </p>
                
                {/* Social icons */}
                <div className="flex gap-4 justify-start items-center">
                  <img 
                    src={instagramIcon} 
                    alt="Instagram" 
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                  <img 
                    src={whatsappIcon} 
                    alt="WhatsApp" 
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                  <img 
                    src={linkedinIcon} 
                    alt="LinkedIn" 
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <hr className="border-t-2 border-gray-300" />
      </div>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth group text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-36 rounded-full mx-auto mb-4 object-cover shadow-md group-hover:border-primary transition-smooth"
                />
                <h3 className="text-xl font-bold text-foreground mb-1 font-oswald">{member.name}</h3>
                <p className="text-primary font-medium font-nunito">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;