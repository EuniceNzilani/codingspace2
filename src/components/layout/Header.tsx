import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import codingLogo from "@/assets/Coding PLayground 1.png";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Training Programs", href: "/training" },
  { label: "Our Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Partnership", href: "/partnership" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={codingLogo} 
              alt="CodingPlayGround" 
              className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex flex-col items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative"
                style={{
                  minWidth: "72px",
                }}
              >
                {/* Nav label */}
                <span
                  className={
                    isActive(item.href)
                      ? "text-[#170961] font-bold"
                      : "text-gray-700 hover:text-[#170961] hover:bg-gray-50"
                  }
                >
                  {item.label}
                </span>
                {/* Custom underline for active */}
                {isActive(item.href) && (
                  <span
                    className="block w-[48px] h-[3px] rounded-xl bg-[#170961] mt-1"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button ONLY */}
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
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex flex-col items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 relative"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    minWidth: "72px",
                  }}
                >
                  <span
                    className={
                      isActive(item.href)
                        ? "text-[#170961] font-bold"
                        : "text-gray-700 hover:text-[#170961] hover:bg-gray-50"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <span
                      className="block w-[48px] h-[3px] rounded-xl bg-[#170961] mt-1"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}