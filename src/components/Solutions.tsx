import React, { useState } from "react";
import { Link2, ShieldCheck, Database, HardDrive, Check, TrendingUp, Cpu, Server } from "lucide-react";

export default function Solutions() {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      sector: "Finanzas y Banca",
      title: "Extracción Masiva de Auditoría para Banco Continental",
      problem: "La conciliación diaria de transacciones requería pausar bases de datos heredadas durante 4 horas, perdiendo millones por minuto de inactividad.",
      solution: "Se instalaron 12 nodos de Sifonado Pasivo SOFTSIPHON en los ramales de red. El sistema inyecta datos transaccionales en caliente de forma limpia y transparente.",
      accent: "#00AEEF", // Cyan
      stats: [
        { label: "Tiempo de Inactividad", value: "0 horas", improvement: "100% de reducción" },
        { label: "Velocidad de Ingesta", value: "4.8 GB/s", improvement: "Flujo continuo" },
        { label: "Consumo de CPU base", value: "Menor al 1.2%", improvement: "Pasivo" }
      ]
    },
    {
      sector: "Telecomunicaciones e IoT",
      title: "Consolidación de Telemetría 5G para GlobalTel",
      problem: "Más de 50,000 antenas transmitían telemetría no estructurada, generando cuellos de botella en los firewalls centrales de almacenamiento.",
      solution: "Se configuró una red híbrida zero-trust con compresión Siphon-Feed. La información se ordena y consolida antes de cruzar los límites perimetrales.",
      accent: "#EC008C", // Magenta
      stats: [
        { label: "Ancho de Banda Ahorrado", value: "42%", improvement: "Compresión en tránsito" },
        { label: "Alertas de Falla Crítica", value: "Inmediata", improvement: "Bajo latencia" },
        { label: "Paquetes Perdidos", value: "0.00%", improvement: "100% de entrega" }
      ]
    },
    {
      sector: "Logística y Retail",
      title: "Analítica en Tiempo Real para Súper Almacenes",
      problem: "La base de datos de inventario se desincronizaba durante eventos de alta demanda como el Black Friday, mostrando stock fantasma.",
      solution: "Implementación de Flujo de Datos Sifonado que alimenta la base de datos de consulta secundaria en milisegundos sin afectar el servidor de cobro primario.",
      accent: "#FFF200", // Yellow
      stats: [
        { label: "Precisión de Stock", value: "100%", improvement: "Sincronía total" },
        { label: "Saturación del Servidor", value: "-80%", improvement: "Consultas delegadas" },
        { label: "Eventos por Segundo", value: "1.2 Millones", improvement: "Rendimiento extremo" }
      ]
    }
  ];

  const currentCase = cases[activeCase];

  return (
    <section id="soluciones" className="py-24 bg-white relative overflow-hidden">
      {/* Delicate background line pattern */}
      <div className="absolute top-1/3 right-0 w-80 h-[1px] bg-gradient-to-l from-slate-100 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-80 h-[1px] bg-gradient-to-r from-slate-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              CASOS DE ÉXITO EMPRESARIAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Sifonado de Datos en Acción
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-xl">
              Nuestra tecnología de red y flujo inteligente optimiza las operaciones reales en los sectores industriales más exigentes.
            </p>
          </div>

          {/* Quick case switcher selectors */}
          <div className="flex flex-wrap gap-2">
            {cases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeCase === idx
                    ? "bg-brand-dark text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                {c.sector}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Board */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-100/40 relative">
          
          {/* Border accent strip representing current sector's color */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[6px] rounded-l-3xl transition-all duration-500"
            style={{ backgroundColor: currentCase.accent }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Col: Case details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-slate-800"
                    style={{
                      backgroundColor: `${currentCase.accent}20`,
                      border: `1px solid ${currentCase.accent}50`,
                    }}
                  >
                    Caso de Éxito: {currentCase.sector}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight mt-4 leading-snug">
                    {currentCase.title}
                  </h3>
                </div>

                <div className="space-y-4 font-sans">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">El Desafío Operativo</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{currentCase.problem}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-magenta uppercase tracking-widest">Nuestra Solución</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{currentCase.solution}</p>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="pt-6 border-t border-slate-50 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-brand-dark">Resultados Validados</span>
                  <span className="text-[10px] text-slate-400 font-medium">Métricas corporativas auditadas en producción</span>
                </div>
              </div>
            </div>

            {/* Right Col: Giant metrics panel with neumorphic widgets */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-center space-y-6">
              
              <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-200/50">
                <TrendingUp size={16} className="text-brand-magenta" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Impacto Logrado</span>
              </div>

              {currentCase.stats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center transition-all hover:translate-x-1"
                  style={{
                    boxShadow: "4px 4px 12px rgba(163, 177, 198, 0.08)",
                  }}
                >
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{stat.label}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      {stat.improvement}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight font-mono">
                    {stat.value}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Technical architecture note banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-medium">
            ¿Quieres ver cómo se comportaría tu topología con esta solución? Prueba nuestro {" "}
            <button
              onClick={() => {
                const el = document.getElementById("simulador");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#EC008C] hover:text-[#00AEEF] underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Simulador Interactivo
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}
