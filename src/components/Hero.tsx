import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Database, Network, Sparkles } from "lucide-react";

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
  onOpenDemoModal: () => void;
}

export default function Hero({ onScrollTo, onOpenDemoModal }: HeroProps) {
  // Define vector nodes for the Hero graphic (cyan, yellow, black)
  const heroNodes = [
    { x: 120, y: 80, size: 10, color: "#00AEEF", delay: 0.1 }, // Cyan
    { x: 340, y: 110, size: 12, color: "#FFF200", delay: 0.3 }, // Yellow
    { x: 220, y: 160, size: 18, color: "#212121", delay: 0 }, // Black Core
    { x: 90, y: 220, size: 11, color: "#EC008C", delay: 0.5 }, // Magenta
    { x: 380, y: 240, size: 9, color: "#00AEEF", delay: 0.7 }, // Cyan
    { x: 280, y: 290, size: 14, color: "#FFF200", delay: 0.4 }, // Yellow
    { x: 150, y: 340, size: 12, color: "#212121", delay: 0.2 }, // Black
    { x: 310, y: 400, size: 11, color: "#00AEEF", delay: 0.8 }, // Cyan
  ];

  const heroConnections = [
    [0, 2], [1, 2], [3, 2], [4, 5], [5, 2], [6, 2], [6, 3], [5, 7], [6, 7]
  ];

  return (
    <section id="inicio" className="relative bg-white pt-24 pb-20 md:py-32 overflow-hidden">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

      {/* Ambient glows behind hero */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                TECNOLOGÍA DE FLUJO DE DATOS <Sparkles size={10} className="text-brand-magenta inline" />
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-tight">
              Sifonado de Datos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-magenta to-brand-dark pr-2">
                Inteligente
              </span> <br className="hidden sm:inline" />
              para Empresas Conectadas.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Optimizamos el flujo de tu información con tecnología de red de vanguardia. Extrae, filtra y distribuye datos en tiempo real de forma segura.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              
              {/* Primary Call to Action */}
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EC008C] text-white font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand-magenta/30 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer"
              >
                Solicitar Demo
              </button>

              {/* Secondary Button to Interactive Simulator */}
              <button
                onClick={() => onScrollTo("simulador")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-brand-dark hover:text-brand-cyan font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:border-brand-cyan/30 cursor-pointer"
              >
                <Play size={14} className="fill-current" />
              </button>
            </div>

            {/* Micro stats banner below CTAs */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-slate-100">
              <div>
                <span className="block text-xl font-bold text-brand-dark">99.9%</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Latencia Optimizada</span>
              </div>
              <div className="border-x border-slate-100">
                <span className="block text-xl font-bold text-brand-cyan">0ms</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pérdida de Paquetes</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-brand-magenta">150+</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Nodos Globales</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Network Vector Art */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-slate-50/50 border border-slate-100/80 shadow-inner p-4 flex items-center justify-center overflow-hidden">
              
              {/* Abstract decorative circles */}
              <div className="absolute w-[80%] h-[80%] border border-slate-100/50 rounded-full animate-pulse pointer-events-none" />
              <div className="absolute w-[50%] h-[50%] border border-slate-100/40 rounded-full pointer-events-none" />

              {/* SVG vector art reproducing node network with packet flows */}
              <svg width="420" height="420" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                {/* Connections (Lines) */}
                {heroConnections.map(([from, to], i) => {
                  const n1 = heroNodes[from];
                  const n2 = heroNodes[to];
                  return (
                    <line
                      key={`con-${i}`}
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeOpacity="0.45"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Simulated packet paths (Cyan & Yellow) */}
                {/* Packet 1: Yellow (Path 0 -> 2) */}
                <motion.circle
                  r="5"
                  fill="#FFF200"
                  animate={{
                    cx: [heroNodes[0].x, heroNodes[2].x],
                    cy: [heroNodes[0].y, heroNodes[2].y],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Packet 2: Cyan (Path 1 -> 2) */}
                <motion.circle
                  r="5.5"
                  fill="#00AEEF"
                  animate={{
                    cx: [heroNodes[1].x, heroNodes[2].x],
                    cy: [heroNodes[1].y, heroNodes[2].y],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.4
                  }}
                />

                {/* Packet 3: Yellow (Path 5 -> 7) */}
                <motion.circle
                  r="4.5"
                  fill="#FFF200"
                  animate={{
                    cx: [heroNodes[5].x, heroNodes[7].x],
                    cy: [heroNodes[5].y, heroNodes[7].y],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                {/* Packet 4: Magenta (Path 3 -> 2) */}
                <motion.circle
                  r="5"
                  fill="#EC008C"
                  animate={{
                    cx: [heroNodes[3].x, heroNodes[2].x],
                    cy: [heroNodes[3].y, heroNodes[2].y],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.8
                  }}
                />

                {/* Nodes rendering with animations */}
                {heroNodes.map((node, i) => (
                  <g key={`node-g-${i}`}>
                    {/* Pulsing ring for larger nodes */}
                    {node.size > 12 && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size + 8}
                        stroke={node.color}
                        strokeWidth="1"
                        fill="transparent"
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: node.delay,
                        }}
                      />
                    )}

                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size}
                      fill={node.color}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      animate={{
                        y: [node.y, node.y - 4, node.y + 2, node.y],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: node.delay,
                        ease: "easeInOut",
                      }}
                    />
                  </g>
                ))}

                {/* Heavy center siphon ring visual (matches central black node 2) */}
                <circle
                  cx={heroNodes[2].x}
                  cy={heroNodes[2].y}
                  r="28"
                  stroke="#EC008C"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                  className="animate-spin"
                  style={{ transformOrigin: `${heroNodes[2].x}px ${heroNodes[2].y}px`, animationDuration: '20s' }}
                />
              </svg>

              {/* Little info stats floaties inside visual column */}
              <div className="absolute top-6 right-6 bg-white border border-slate-100 shadow-md p-3 rounded-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="p-1.5 rounded-lg bg-brand-cyan/10">
                  <Network size={14} className="text-brand-cyan" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-800">Conexiones Activas</span>
                  <span className="text-[9px] font-mono font-medium text-emerald-500">OPTIMIZADO</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-white border border-slate-100 shadow-md p-3 rounded-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>
                <div className="p-1.5 rounded-lg bg-brand-magenta/10">
                  <Database size={14} className="text-brand-magenta" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-800">Ingesta Transparente</span>
                  <span className="text-[9px] font-mono font-medium text-slate-400">9.8 GB/s promedio</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
