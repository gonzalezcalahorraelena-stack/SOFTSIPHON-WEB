import React, { useState } from "react";
import Logo from "./Logo";
import { Shield, Users, Target, Rocket, HelpCircle, Layers } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mision" | "valores" | "historia">("mision");

  const tabContent = {
    mision: {
      title: "Misión y Propósito",
      icon: Rocket,
      text: "Nuestra misión es democratizar la conectividad y el flujo de datos masivo mediante tecnologías de red y sifonado inteligente de última generación. En SoftSiphon, habilitamos a las empresas globales para tomar el control total de sus recursos informativos en tránsito, transformando la latencia en oportunidad, y el desorden de datos en una ventaja competitiva estructurada.",
      subpoints: [
        "Transparencia: Ingesta de datos sin alterar los servicios base.",
        "Rendimiento: Reducción del uso de ancho de banda hasta en un 40%.",
        "Seguridad: Encriptación cuántica integrada en cada enlace de nodo.",
      ]
    },
    valores: {
      title: "Valores Corporativos",
      icon: Target,
      text: "Guiados por la excelencia técnica y el diseño flat, estructuramos nuestras operaciones en tres pilares fundamentales que garantizan el éxito de cada despliegue empresarial:",
      subpoints: [
        "Precisión en Ingeniería: Resolvemos problemas complejos con código limpio y topologías lógicas óptimas.",
        "Integridad de Marca: Respetamos los activos de nuestros socios como respetamos nuestra propia identidad visual.",
        "Sostenibilidad Digital: Diseñamos software eficiente que minimiza el consumo energético en centros de datos.",
      ]
    },
    historia: {
      title: "Arquitectura Siphon-Feed",
      icon: Layers,
      text: "La revolucionaria patente Siphon-Feed de SOFTSIPHON fue concebida bajo la analogía física de un sifón de líquidos. En lugar de empujar o arrastrar datos pesados mediante peticiones repetitivas (polling), creamos un diferencial de presión lógica en la red.",
      subpoints: [
        "Flujo Continuo: Los datos se deslizan de manera hidrodinámica hacia los colectores.",
        "Auto-Cebado: La red se estabiliza sola ante picos inesperados de tráfico masivo.",
        "Sifón Pasivo: Consumo de recursos de cómputo un 80% menor que las APIs tradicionales.",
      ]
    },
  };

  const currentContent = tabContent[activeTab];
  const IconComponent = currentContent.icon;

  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      {/* Background design elements to reinforce the node network motif */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Corporate identity texts */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00AEEF] bg-cyan-50 px-3 py-1.5 rounded-full">
                IDENTIDAD CORPORATIVA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                Sobre Nosotros & Misión
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                SOFTSIPHON nace con el propósito de resolver los cuellos de botella informáticos mediante una interpretación física de los flujos de red. Diseñamos arquitectura inteligente para empresas conectadas.
              </p>
            </div>

            {/* Premium Selector Tabs */}
            <div className="flex border-b border-slate-100 p-1 bg-slate-50/50 rounded-2xl max-w-md">
              {(["mision", "valores", "historia"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-brand-dark shadow-sm border border-slate-100"
                      : "text-slate-400 hover:text-slate-800"
                  }`}
                >
                  {tab === "mision" ? "Misión" : tab === "valores" ? "Valores" : "Tecnología"}
                </button>
              ))}
            </div>

            {/* Interactive tab block */}
            <div className="space-y-6 min-h-[220px] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-xl text-brand-magenta">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">{currentContent.title}</h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {currentContent.text}
              </p>

              {/* Sub-points with brand colored nodes */}
              <ul className="space-y-3 pl-1">
                {currentContent.subpoints.map((point, index) => {
                  // alternate bullet colors to represent nodes (cyan, magenta, yellow)
                  const colors = ["#00AEEF", "#EC008C", "#FFF200"];
                  const bulletColor = colors[index % colors.length];

                  return (
                    <li key={index} className="flex items-start gap-3 text-xs font-semibold text-slate-700">
                      <span
                        className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                        style={{
                          backgroundColor: bulletColor,
                          boxShadow: `0 0 8px ${bulletColor}aa`,
                          border: "1px solid rgba(255,255,255,0.8)"
                        }}
                      />
                      <span>{point}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          {/* Right Column: Enlarged, dynamic version of the node network Isotipo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Soft decorative label */}
            <div className="absolute -top-12 text-[10px] font-mono uppercase tracking-widest text-slate-400 select-none">
              Isotipo Original Reproducido
            </div>

            <div className="relative w-full max-w-[360px] aspect-square rounded-3xl bg-white border border-slate-50 shadow-2xl p-8 flex items-center justify-center">
              {/* Giant artistic Logo component, showText false, interactive true */}
              <Logo size="lg" showText={false} interactive={true} className="scale-110 sm:scale-125" />

              {/* Background circular targets mimicking a siphon container */}
              <div className="absolute inset-0 border border-dashed border-slate-100 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "120s" }} />
              <div className="absolute inset-6 border border-slate-50 rounded-full pointer-events-none" />
              <div className="absolute inset-16 border border-dashed border-slate-100 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
            </div>

            {/* Explanatory node counts */}
            <div className="mt-8 flex gap-6 text-[10px] font-mono font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan inline-block border border-white" />
                Nodos Ingestores
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-magenta inline-block border border-white" />
                Nodos Distribución
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow inline-block border border-white" />
                Nodos Sifón
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
