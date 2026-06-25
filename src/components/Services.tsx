import React from "react";
import { Link2, Cpu, BarChart3, ChevronRight, Share2, Shuffle, CheckCircle2 } from "lucide-react";

export default function Services() {
  const solutions = [
    {
      title: "Integración de Redes",
      accent: "#00AEEF", // Cyan
      badge: "Cian #00AEEF",
      icon: Link2,
      description: "Conectamos toda tu infraestructura local y en la nube en una sola red unificada de alta velocidad. Simplifica la administración de firewalls, topologías híbridas y accesos remotos de forma inteligente.",
      bullets: [
        "Sincronización multi-región inmediata",
        "Configuración Zero-Trust automática",
        "Puertos virtuales de alto rendimiento"
      ]
    },
    {
      title: "Flujo de Datos Sifonado",
      accent: "#EC008C", // Magenta
      badge: "Magenta #EC008C",
      icon: Shuffle,
      description: "Extrae y redirige flujos de datos transaccionales sin interrumpir tus operaciones diarias. El sifonado pasivo garantiza una ingesta transparente y limpia, ideal para almacenes de datos y lagos analíticos.",
      bullets: [
        "Inyección no invasiva (Siphon-Feed)",
        "Compresión inteligente en tránsito",
        "Filtros avanzados de metadatos"
      ]
    },
    {
      title: "Analítica Compleja",
      accent: "#FFF200", // Yellow
      badge: "Amarillo #FFF200",
      icon: BarChart3,
      description: "Analiza millones de eventos en tiempo real con motores dedicados y modelos integrados. Visualiza correlaciones críticas, anomalías en tránsito y telemetría operativa en paneles ejecutivos ultra-veloces.",
      bullets: [
        "Detección predictiva de cuellos de botella",
        "Paneles interactivos en microsegundos",
        "Reportería regulatoria exportable"
      ]
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-white relative">
      {/* Subtle details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EC008C] bg-pink-50 px-3 py-1.5 rounded-full">
            SERVICIOS EMPRESARIALES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Nuestras Soluciones
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Diseñamos soluciones tecnológicas con arquitectura de sifonado para optimizar e integrar tus procesos de datos con la máxima eficiencia.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {solutions.map((sol, index) => {
            const IconComponent = sol.icon;
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-slate-50 transition-all duration-300 hover:translate-y-[-6px] flex flex-col justify-between"
                style={{
                  // Subtle Neumorphic design token for depth
                  boxShadow: "6px 6px 20px rgba(163, 177, 198, 0.12), -6px -6px 20px rgba(255, 255, 255, 0.95)",
                }}
              >
                {/* Visual side accent border */}
                <div
                  className="absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-lg transition-all duration-300 group-hover:top-8 group-hover:bottom-8"
                  style={{ backgroundColor: sol.accent }}
                />

                <div className="space-y-6">
                  {/* Styled Icon Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className="p-4 rounded-2xl flex items-center justify-center text-white transition-all duration-300"
                      style={{
                        backgroundColor: sol.accent,
                        boxShadow: `0 8px 16px -4px ${sol.accent}30`,
                      }}
                    >
                      <IconComponent
                        size={22}
                        className={sol.accent === "#FFF200" ? "text-slate-900" : "text-white"}
                      />
                    </div>
                    
                    <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Módulo {index + 1}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-magenta transition-colors duration-200">
                      {sol.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {sol.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 border-t border-slate-50">
                    {sol.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro hover interaction link */}
                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-dark transition-colors duration-200 cursor-pointer">
                  <span>Saber más del módulo</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* SoftSiphon Technology highlight box */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <h4 className="text-sm font-bold text-brand-dark">¿Necesitas una arquitectura de sifonado a la medida?</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Nuestros ingenieros de preventa diseñan topologías de flujo personalizadas que se integran de inmediato con tus sistemas actuales de SAP, AWS, Azure, Google Cloud y Hadoop sin contratiempos.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full bg-brand-dark hover:bg-[#EC008C] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer shrink-0"
          >
            Consultar Ingeniería
          </button>
        </div>

      </div>
    </section>
  );
}
