import { Link } from "react-router-dom";
import instagramIcon from "@/assets/ig.png";
import whatsappIcon from "@/assets/whatsapp.png";
import facebookIcon from "@/assets/facebook.png";
import newIcon from "@/assets/new.png";
import codingLogo from "@/assets/Coding PLayground 1.png";

export function Footer() {
  return (
    <footer className="bg-[#170961] text-white pt-8 pb-4 font-nunito">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Left: Large Logo & Org name */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={codingLogo}
              alt="CodingPlayGround Logo"
              className="h-16 w-auto object-contain mb-2"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div className="text-sm">
              CodingPlayGround<br />
              Technologies
            </div>
          </div>

          {/* Center: Socials, blue boxes for icons, NO white circle */}
          <div className="flex flex-col items-center">
            <div className="font-nunito text-base mb-2">Join our Community on</div>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="bg-[#170961] rounded-[6px] w-8 h-8 flex items-center justify-center">
                  <img src={instagramIcon} alt="Instagram" className="w-5 h-5 object-contain" />
                </div>
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <div className="bg-[#170961] rounded-[6px] w-8 h-8 flex items-center justify-center">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 object-contain" />
                </div>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="bg-[#170961] rounded-[6px] w-8 h-8 flex items-center justify-center">
                  <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
                </div>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="bg-[#170961] rounded-[6px] w-8 h-8 flex items-center justify-center">
                  <img src={newIcon} alt="New" className="w-5 h-5 object-contain" />
                </div>
              </a>
            </div>
          </div>

          {/* Right: Website */}
          <div className="flex flex-col items-center md:items-end">
            <div className="font-nunito text-base mb-2">Website</div>
            <a
              href="https://codingplayground.tech"
              className="underline text-white font-nunito text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              codingplayground.tech
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/30 my-4" />

        {/* Copyright Section */}
        <div className="text-center text-white text-sm font-nunito">
          &copy; 2025 All rights reserved
        </div>
      </div>
    </footer>
  );
}