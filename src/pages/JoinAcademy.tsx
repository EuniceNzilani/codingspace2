import React, { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import codingLogo from "@/assets/Coding PLayground 1.png";
import bgHome from "@/assets/image 18.png";
import valuePropImg from "@/assets/Group 177.png";
import uniqueBenefitImg from "@/assets/image 25.png";
import amakaImg from "@/assets/image 21.png";
import davidImg from "@/assets/Mask group3.png";
import partnerImg from "@/assets/image 22.png";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", ref: "home" },
  { label: "Value Proposition", ref: "value" },
  { label: "Unique Benefits", ref: "unique" },
  { label: "Testimonials & Success stories", ref: "testimonials" },
  { label: "Training programs", ref: "programs" }
];

export default function JoinAcademy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const homeRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const uniqueRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    home: homeRef,
    value: valueRef,
    unique: uniqueRef,
    testimonials: testimonialsRef,
    programs: programsRef,
  };

  const scrollToSection = (sectionKey: string) => {
    refs[sectionKey]?.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const blueBtnClass =
    "bg-[#170961] hover:bg-[#130755] text-white font-bold shadow-lg outline-none cursor-pointer transition-all duration-200";

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-white">
      {/* Modern Header with logo and navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo (scrolls to Home) */}
            <div className="flex items-center group cursor-pointer" onClick={() => scrollToSection('home')}>
              <img 
                src={codingLogo} 
                alt="CodingPlayGround" 
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.ref}
                  onClick={() => scrollToSection(item.ref)}
                  className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 text-gray-700 hover:text-[#170961] hover:bg-gray-50"
                  style={{ background: "transparent", border: "none" }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden h-12 w-12 text-gray-700 hover:text-[#170961] hover:bg-gray-100 flex items-center justify-center rounded-full border-none bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg animate-in slide-in-from-top-5 duration-300">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.ref}
                    onClick={() => scrollToSection(item.ref)}
                    className="flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 text-gray-700 hover:text-[#170961] hover:bg-gray-50 w-full"
                    style={{ background: "transparent", border: "none" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content (add top padding to account for fixed header) */}
      <div className="scroll-smooth pt-24">
        {/* Home Section */}
        <section 
          ref={homeRef}
          className="relative flex min-h-[540px] items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHome})` }}
        >
          <div className="absolute inset-0 bg-[rgba(15,16,47,0.55)]"></div>
          <div className="relative z-10 mx-auto w-full max-w-[700px] text-center text-white">
            <h1 className="mb-5 font-montserrat text-3xl sm:text-4xl md:text-5xl font-black tracking-wide">
              Learn. Build. Become Industry-Ready
            </h1>
            <div className="mb-10 text-base sm:text-lg md:text-xl font-normal">
              Empowering beginners to grow into tech experts through guidance, practice, and confidence.
            </div>
            <button
              className={`mx-auto rounded-lg px-10 py-4 text-lg ${blueBtnClass}`}
              onClick={() => navigate("/applicationform2")}
            >
              Apply Now
            </button>
          </div>
        </section>

        {/* Value Proposition */}
        <section 
          ref={valueRef}
          className="flex min-h-[360px] items-center justify-center bg-white py-14 px-4 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <h2 className="mb-3 font-montserrat text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                Value Proposition
              </h2>
              <div className="mb-6 text-base sm:text-lg text-dark">
                Why Choose CodingPlayGround Academy?
              </div>
              <ul className="m-0 p-0 list-none text-base sm:text-lg">
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Industry-relevant curriculum
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Internship & job placement support
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Hands-on projects & mentorship
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Certificates to showcase skills
                </li>
                <li className="flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Pathway from beginner to professional
                </li>
              </ul>
            </div>
            <div className="flex flex-1 justify-center gap-3">
              <img 
                src={valuePropImg} 
                alt="Value Proposition" 
                className="w-[260px] rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Unique Benefits */}
        <section 
          ref={uniqueRef}
          className="flex min-h-[360px] items-center justify-center bg-[#E6E4F5] py-14 px-4 sm:px-6"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <h2 className="mb-3 font-montserrat text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                Unique Benefit
              </h2>
              <div className="mb-6 text-base sm:text-lg text-dark">
                What are the benefits associated with choosing CodingPlayGround Academy
              </div>
              <ul className="m-0 p-0 list-none text-base sm:text-lg">
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Mentorship: Learn from experienced developers and educators.
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Hands-On Projects: Build real applications, not just theory.
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Internships: Gain industry exposure with real teams.
                </li>
                <li className="mb-4 flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Certificates: Showcase your skills to employers.
                </li>
                <li className="flex items-center">
                  <span className="text-[#170961] text-xl font-bold mr-4">✔</span>
                  Career Support: Resume crafting, job readiness, and networking.
                </li>
              </ul>
            </div>
            <div className="flex flex-1 items-center justify-center gap-3">
              <img 
                src={uniqueBenefitImg} 
                alt="Unique Benefit" 
                className="w-[250px] rounded-3xl shadow-md transform rotate-[10deg]"
              />
            </div>
          </div>
        </section>

        {/* Testimonials & Success Stories - horizontal cards */}
        <section 
          ref={testimonialsRef}
          className="flex min-h-[360px] items-center justify-center bg-white py-14 px-4 sm:px-6"
        >
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="mb-6 text-center font-montserrat text-2xl sm:text-3xl md:text-4xl font-black text-[#170961]">
              Testimonials & Success stories
            </h2>
            <div className="mb-8 text-center text-base sm:text-lg text-dark">
              Here's what our students have to say about their experience learning with us, and how we've helped them achieve their goals
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {/* Card 1 */}
              <div className="flex-1 bg-white rounded-2xl shadow-md px-6 py-7 flex flex-col items-center relative min-w-[270px]">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#170961] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    1
                  </div>
                </div>
                <div className="mb-6 mt-7 text-lg font-medium text-center">
                  “Joining CodingPlayGround Academy transformed my career. I went from zero experience to landing my first internship in just 6 months.”
                </div>
                <img 
                  src={amakaImg} 
                  alt="Amaka Williams" 
                  className="mx-auto w-[73px] h-[73px] rounded-full border-2 border-dashed border-[#170961] object-cover mb-2"
                />
                <div className="font-bold text-[#170961] font-montserrat text-lg mt-2">
                  Amaka Williams
                </div>
                <div className="text-sm text-dark">
                  Frontend Developer Intern
                </div>
              </div>
              {/* Card 2 */}
              <div className="flex-1 bg-white rounded-2xl shadow-md px-6 py-7 flex flex-col items-center relative min-w-[270px]">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#170961] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    2
                  </div>
                </div>
                <div className="mb-6 mt-7 text-lg font-medium text-center">
                  “The mentorship and hands-on projects gave me confidence to apply for real-world roles.”
                </div>
                <img 
                  src={davidImg} 
                  alt="David Michael" 
                  className="mx-auto w-[73px] h-[73px] rounded-full border-2 border-dashed border-[#170961] object-cover mb-2"
                />
                <div className="font-bold text-[#170961] font-montserrat text-lg mt-2">
                  David Michael
                </div>
                <div className="text-sm text-dark">
                  Software Engineering Graduate
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex-1 bg-white rounded-2xl shadow-md px-6 py-7 flex flex-col items-center relative min-w-[270px]">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#170961] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    3
                  </div>
                </div>
                <div className="mb-6 mt-7 text-lg font-medium text-center">
                  “Our students benefited greatly from the Robotics & Coding program. It sparked creativity and problem-solving.”
                </div>
                <img 
                  src={partnerImg} 
                  alt="Partner" 
                  className="mx-auto w-[73px] h-[73px] rounded-full border-2 border-dashed border-[#170961] object-cover mb-2"
                />
                <div className="font-bold text-[#170961] font-montserrat text-lg mt-2">
                  Partner
                </div>
                <div className="text-sm text-dark">
                  School Admin
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section 
          ref={programsRef}
          className="flex min-h-[240px] items-center justify-center bg-[#E6E4F5] py-14 px-4 sm:px-6"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <h2 className="mb-6 font-montserrat text-2xl sm:text-3xl md:text-4xl font-black text-[#1C176C] tracking-tight">
              Training Programs
            </h2>
            <div className="mb-8 text-base sm:text-lg text-dark">
              "We offer structured programs across web & mobile development, UI/UX design, robotics, and more. Explore the full list of roles, languages, and tools we train in our Training Programs."
            </div>
            <button
              className={`mx-auto rounded-xl px-11 py-4 text-lg ${blueBtnClass}`}
              onClick={() => navigate("/training")}
            >
              Explore Training Programs
            </button>
          </div>
        </section>

        {/* Call To Action: Start your journey */}
        <section className="flex min-h-[180px] items-center justify-center bg-white py-14 pb-28 px-4 sm:px-6">
          <div className="mx-auto w-full max-w-4xl text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
              <div>
                <h2 className="mb-4 font-montserrat text-2xl sm:text-3xl font-black text-[#170961] tracking-tight">
                  Start Your<br />Journey Today!
                </h2>
                <div className="text-base sm:text-lg text-dark">
                  Apply now to kickstart your career with<br className="hidden sm:block" />
                  CodingPlayground Technology
                </div>
              </div>
              <div>
                <button
                  className={`mt-4 rounded-xl px-11 py-4 text-lg ${blueBtnClass}`}
                  onClick={() => navigate("/applicationform2")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}