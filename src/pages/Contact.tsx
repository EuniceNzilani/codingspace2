import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { db } from "@/firebase"; // Adjust the path to your firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Icon imports
import headOfficeIcon from "../assets/head office.png";
import emailIcon from "../assets/email.png";
import contactUsIcon from "../assets/contact us.png";
import instagramIcon from "../assets/ig.png";
import whatsappIcon from "../assets/whatsapp.png";
import facebookIcon from "../assets/facebook.png";
import newIcon from "../assets/new.png";

const Contact = () => {
  // Form state
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add document to Firebase Firestore
      await addDoc(collection(db, "contactMessages"), {
        name: form.name,
        subject: form.subject,
        message: form.message,
        timestamp: serverTimestamp(),
        status: "unread" // Optional: to track message status
      });

      alert("Message sent successfully!");
      setForm({ name: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-12 bg-white font-nunito">
      {/* Hero Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#170961] mb-4 font-oswald">
              Contact Us
            </h1>
            <p className="text-lg text-foreground leading-relaxed font-nunito font-semibold">
              CodingPlayGround Technologies is ready to provide the right solution according to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Get In Touch Card */}
            <Card className="p-8 bg-white shadow-card hover:shadow-elegant transition-smooth">
              <h2 className="text-2xl font-bold text-[#170961] mb-6 font-oswald">
                Get In Touch
              </h2>
              
              {/* Head Office */}
              <div className="flex items-start mb-6">
                <img 
                  src={headOfficeIcon} 
                  alt="Head Office" 
                  className="w-10 h-10 mr-4 rounded-full shadow-md flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[#170961] text-lg font-oswald">Head Office</h3>
                  <p className="text-foreground font-nunito">
                    Heritage Plaza, No. 30 S.N Okoronkwo, Kubwa,<br />
                    Federal Capital Territory, Abuja
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center mb-6">
                <img 
                  src={emailIcon} 
                  alt="Email" 
                  className="w-10 h-10 mr-4 rounded-full shadow-md flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[#170961] text-lg font-oswald">Email Us</h3>
                  <p className="text-foreground font-nunito">info@codingplayground.tech</p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-center">
                <img 
                  src={contactUsIcon} 
                  alt="Call Us" 
                  className="w-10 h-10 mr-4 rounded-full shadow-md flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-[#170961] text-lg font-oswald">Call Us</h3>
                  <p className="text-foreground font-nunito">
                    Phone: +234 904 2512 356<br />
                    WhatsApp: +234 904 2512 356
                  </p>
                </div>
              </div>
            </Card>

            {/* Message Us Form */}
            <Card className="p-8 bg-white shadow-card hover:shadow-elegant transition-smooth">
              <h2 className="text-2xl font-bold text-[#170961] mb-6 font-oswald">
                Message Us
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-oswald text-foreground mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="font-nunito"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="font-oswald text-foreground mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="font-nunito"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-oswald text-foreground mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="font-nunito"
                    placeholder="Your message here..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full bg-[#170961] hover:bg-[#1a0b70] font-nunito font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;