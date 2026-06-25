import React, { useState } from "react";
import Logo from "./Logo";
import { Menu, X, ArrowRight, Activity } from "lucide-react";

interface HeaderProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Inicio", id: "inicio" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Servicios", id: "servicios" },
    { label: "Soluciones", id: "soluciones" },
    { label: "Simulador", id: "simulador" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo element on the left (isotipo + logo text) */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onScrollTo("inicio")}>
            <Logo size="sm" showText={true} interactive={true} className="flex-row gap-3 scale-90 sm:scale-100" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? "text-[#EC008C] font-bold"
                    : "text-slate-600 hover:text-[#00AEEF]"
                }`}
              >
                {item.label}
                {/* Visual indicator underline */}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EC008C]" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button in Header */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => onScrollTo("simulador")}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold tracking-wider text-slate-800 rounded-full group bg-gradient-to-br from-brand-cyan to-brand-magenta group-hover:from-brand-cyan group-hover:to-brand-magenta hover:text-white focus:ring-4 focus:outline-none focus:ring-brand-cyan/20 transition-all cursor-pointer"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 hover:text-white">
                Probar Simulador
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollTo(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  activeSection === item.id
                    ? "bg-slate-50 text-brand-magenta"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-cyan"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  onScrollTo("simulador");
                  setIsOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-brand-magenta text-white font-bold text-xs tracking-widest text-center shadow-lg shadow-brand-magenta/20 flex items-center justify-center gap-2"
              >
                PROBAR SIMULADOR <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
