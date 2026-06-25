/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Solutions from "./components/Solutions";
import InteractiveNetwork from "./components/InteractiveNetwork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { X, CheckCircle, Sparkles, Loader2, Send } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "success">("idle");
  const [modalTicket, setModalTicket] = useState("");
  const [modalForm, setModalForm] = useState({
    name: "",
    email: "",
    company: "",
    volume: "10-100TB"
  });

  // ScrollSpy logic to highlight the correct nav item in the header as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset for header trigger height

      const sections = [
        { id: "inicio" },
        { id: "nosotros" },
        { id: "servicios" },
        { id: "soluciones" },
        { id: "simulador" },
        { id: "contacto" },
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Handle Demo Modal Form Submission
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.email || !modalForm.company) return;

    setModalStatus("loading");

    setTimeout(() => {
      const ticket = "SS-MD-" + Math.floor(100000 + Math.random() * 900000);
      setModalTicket(ticket);
      setModalStatus("success");
    }, 1500);
  };

  const resetModal = () => {
    setModalForm({
      name: "",
      email: "",
      company: "",
      volume: "10-100TB"
    });
    setModalStatus("idle");
    setIsDemoModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-cyan/20 selection:text-brand-dark">
      
      {/* Sticky Header */}
      <Header onScrollTo={handleScrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        
        {/* Section A: Hero */}
        <Hero 
          onScrollTo={handleScrollToSection} 
          onOpenDemoModal={() => setIsDemoModalOpen(true)} 
        />

        {/* Section B: About Us (Identity) */}
        <About />

        {/* Section C: Services (Grilla de 3) */}
        <Services />

        {/* Section D: Solutions (Casos de Éxito) */}
        <Solutions />

        {/* Section E: Interactive Simulator (Centerpiece Data Flow Siphon) */}
        <section id="simulador" className="py-24 bg-slate-50/50 relative border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00AEEF] bg-cyan-50 px-3 py-1.5 rounded-full">
                SIMULADOR INTERACTIVO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                Consola de Simulación Siphon
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                Visualiza el flujo de ingesta pasiva de datos en tiempo real. Configura los parámetros de la red, inyecta paquetes con clics y evalúa la eficiencia del sifonado.
              </p>
            </div>
          </div>
          
          {/* Main simulator widget */}
          <InteractiveNetwork />
        </section>

        {/* Section F: Contact Form */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer onScrollTo={handleScrollToSection} />

      {/* Premium Request Demo Modal Overlay */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur effect */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={resetModal}
          />
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl relative w-full max-w-lg p-8 sm:p-10 overflow-hidden z-10 animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={resetModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>

            {modalStatus === "idle" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-magenta">DEMO DE INGENIERÍA</span>
                  <h3 className="text-xl font-black text-brand-dark tracking-tight">Solicitar Demo SoftSiphon</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Nuestros analistas agendarán una sesión guiada para conectar tus flujos de prueba sin compromiso de permanencia.
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nombre Completo</label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Ej. Helena González"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-email" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Correo Corporativo</label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      placeholder="helena@empresa.com"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-company" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Empresa</label>
                      <input
                        id="modal-company"
                        type="text"
                        required
                        placeholder="SOFTSIPHON S.A."
                        value={modalForm.company}
                        onChange={(e) => setModalForm({ ...modalForm, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-volume" className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Volumen Diario</label>
                      <select
                        id="modal-volume"
                        value={modalForm.volume}
                        onChange={(e) => setModalForm({ ...modalForm, volume: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:border-brand-magenta transition-colors cursor-pointer"
                      >
                        <option value="<10TB">&lt; 10 TB</option>
                        <option value="10-100TB">10-100 TB</option>
                        <option value=">100TB">&gt; 100 TB</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-xl bg-brand-magenta hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-brand-magenta/20 cursor-pointer"
                  >
                    Establecer Canal Demo
                  </button>
                </form>
              </div>
            )}

            {modalStatus === "loading" && (
              <div className="flex flex-col items-center justify-center space-y-6 text-center py-12">
                <div className="relative">
                  <Loader2 size={40} className="animate-spin text-brand-magenta relative z-10" />
                  <div className="absolute inset-0 bg-brand-cyan/20 rounded-full blur-lg animate-ping" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Registrando Enlace</h4>
                  <p className="text-[9px] font-mono text-slate-400">Verificando certificados de red segura...</p>
                </div>
              </div>
            )}

            {modalStatus === "success" && (
              <div className="space-y-6 py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                    <CheckCircle size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">¡Enlace de Demo Creado!</h4>
                    <p className="text-[10px] text-slate-400">Hemos recibido tu solicitud técnica de inyección pasiva.</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-2.5 font-mono text-[9px] text-slate-600">
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-slate-400">TICKET TERMINAL:</span>
                    <strong className="text-brand-magenta">{modalTicket}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CONTACTO:</span>
                    <span className="text-slate-800">{modalForm.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ENTIDAD CORPORATIVA:</span>
                    <span className="text-slate-800">{modalForm.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CANAL DE DATOS:</span>
                    <span className="text-brand-cyan font-bold flex items-center gap-1">
                      Demo-Sync-Secure <Sparkles size={8} />
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetModal}
                  className="w-full py-3.5 rounded-xl bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-cyan transition-colors cursor-pointer"
                >
                  Entendido, Cerrar Canal
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
