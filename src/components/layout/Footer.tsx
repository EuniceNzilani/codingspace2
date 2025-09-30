import { Link } from "react-router-dom";
import instagramIcon from "@/assets/instagram.png";
import whatsappIcon from "@/assets/whatsapp.png";
import xIcon from "@/assets/x.png"; // White X icon
import youtubeIcon from "@/assets/youtube.png"; // White YouTube icon
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
            <div className="text-sm font-nunito">
              CodingPlayGround<br />
              Technologies
            </div>
          </div>

          {/* Center: Socials */}
          <div className="flex flex-col items-center">
            <div className="font-nunito text-base mb-2">Join our Community on</div>
            <div className="flex gap-3">
              {/* Instagram */}
              <a href="https://www.instagram.com/codingplaygroundtech?igsh=MWYxc3c1Z2EzbzVpbA==" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-[6px] w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={instagramIcon} alt="Instagram" className="w-6 h-6 object-contain" />
                </div>
              </a>
              {/* WhatsApp */}
              <a href="https://chat.whatsapp.com/F34IA2fPb0e5XBfd2fvO7j?mode=ems_copy_t" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-[6px] w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
                </div>
              </a>
              {/* X */}
              <a href="https://x.com/CodinPlayground?t=g1-W48xzQ3c9MvSspuBpUA&s=09" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-[6px] w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={xIcon} alt="X" className="w-6 h-6 object-contain" />
                </div>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@coding_111?si=mUbRIaBv_OY8osg_" target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-[6px] w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={youtubeIcon} alt="YouTube" className="w-6 h-6 object-contain" />
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

        <div className="w-full border-t border-white/30 my-4" />

        <div className="text-center text-white text-sm font-nunito">
          &copy; 2025 All rights reserved
        </div>
      </div>
    </footer>
  );
}