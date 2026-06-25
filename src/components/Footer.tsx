import React from "react";
import Logo from "./Logo";
import { Send, Linkedin, Twitter, Github, Heart, ShieldCheck, FileText, Globe } from "lucide-react";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F5] border-t border-slate-200/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-200">
          
          {/* Column 1: Logo & brand presentation */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex justify-start cursor-pointer" onClick={() => onScrollTo("inicio")}>
              <Logo size="sm" showText={true} interactive={true} className="flex-row gap-3 scale-95 origin-left" />
            </div>
            
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              SOFTSIPHON es el líder tecnológico en sistemas de extracción, ingesta y sifonado pasivo de datos masivos para corporaciones interconectadas.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="#social-linkedin"
                className="p-2 rounded-xl bg-white border border-slate-200/60 text-slate-400 hover:text-[#00AEEF] hover:border-[#00AEEF]/20 hover:scale-105 transition-all"
                title="LinkedIn corporativo"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#social-twitter"
                className="p-2 rounded-xl bg-white border border-slate-200/60 text-slate-400 hover:text-[#EC008C] hover:border-[#EC008C]/20 hover:scale-105 transition-all"
                title="Twitter corporativo"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#social-github"
                className="p-2 rounded-xl bg-white border border-slate-200/60 text-slate-400 hover:text-slate-800 hover:border-slate-800/10 hover:scale-105 transition-all"
                title="Github open-source modules"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Secciones</h4>
            <ul className="space-y-2.5">
              {[
                { name: "Inicio", id: "inicio" },
                { name: "Nosotros", id: "nosotros" },
                { name: "Servicios", id: "servicios" },
                { name: "Soluciones", id: "soluciones" },
                { name: "Simulador Interactivo", id: "simulador" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="text-xs text-slate-500 hover:text-[#EC008C] font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions list */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Recursos y Soporte</h4>
            <ul className="space-y-2.5">
              {[
                "Documentación Técnica API",
                "Integración con Cloud SDK",
                "Patentes de Ingesta Siphon-Feed",
                "Estado de la Red Global",
                "Contacto de Soporte de Redes"
              ].map((res, idx) => (
                <li key={idx}>
                  <a href={`#recursos-${idx}`} className="text-xs text-slate-500 hover:text-[#00AEEF] font-semibold tracking-wide transition-colors">
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer bottom bar with legal notes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 font-sans text-[10px] font-semibold tracking-wider">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>&copy; {currentYear} SOFTSIPHON S.A. Todos los derechos reservados.</span>
            <span className="hidden md:inline">|</span>
            <a href="#legal-cookies" className="hover:text-slate-600 flex items-center gap-1">
              <ShieldCheck size={11} /> Políticas de Privacidad
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#legal-terms" className="hover:text-slate-600 flex items-center gap-1">
              <FileText size={11} /> Términos de Servicio
            </a>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho para la Identidad Corporativa de</span>
            <strong className="text-slate-700">SOFTSIPHON</strong>
          </div>

        </div>

      </div>
    </footer>
  );
}
