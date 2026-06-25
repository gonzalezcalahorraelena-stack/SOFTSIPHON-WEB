import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, RefreshCw, Zap, Sliders, Database, Activity, ShieldCheck } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalColor: string;
  pulsePhase: number;
  isSiphoned: boolean;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export default function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulation state
  const [isPlaying, setIsPlaying] = useState(true);
  const [siphonActive, setSiphonActive] = useState(true);
  const [flowSpeed, setFlowSpeed] = useState(1.5);
  const [nodeDensity, setNodeDensity] = useState(25);
  const [connectionDistance, setConnectionDistance] = useState(120);
  const [metrics, setMetrics] = useState({
    processed: 12480,
    flowRate: 345,
    efficiency: 99.94,
    nodesActive: 25,
  });

  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Theme colors
  const colors = {
    cyan: "#00AEEF",
    magenta: "#EC008C",
    yellow: "#FFF200",
    dark: "#212121",
    lightGrey: "#F5F5F5",
  };

  const colorPool = [colors.cyan, colors.magenta, colors.yellow, colors.dark];

  // Initialize nodes
  const initNodes = (width: number, height: number, density: number) => {
    const newNodes: Node[] = [];
    // Ensure we always have a heavy central "Siphon" node
    newNodes.push({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      radius: 12,
      color: colors.dark,
      originalColor: colors.dark,
      pulsePhase: 0,
      isSiphoned: false,
    });

    for (let i = 0; i < density; i++) {
      const isCornerOrEdge = Math.random() > 0.4;
      const angle = Math.random() * Math.PI * 2;
      const distance = isCornerOrEdge 
        ? 100 + Math.random() * (Math.min(width, height) / 2 - 100)
        : Math.random() * 120;

      const x = width / 2 + Math.cos(angle) * distance;
      const y = height / 2 + Math.sin(angle) * distance;

      newNodes.push({
        x: Math.max(20, Math.min(width - 20, x)),
        y: Math.max(20, Math.min(height - 20, y)),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 4 + Math.random() * 5,
        color: colorPool[Math.floor(Math.random() * colorPool.length)],
        originalColor: "",
        pulsePhase: Math.random() * Math.PI * 2,
        isSiphoned: false,
      });
    }

    // Assign originalColor
    newNodes.forEach(n => n.originalColor = n.color);
    nodesRef.current = newNodes;
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      initNodes(canvas.width, canvas.height, nodeDensity);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [nodeDensity]);

  // Main simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localFrame: number;

    const updateAndDraw = () => {
      if (!isPlaying) {
        // Just draw static frame
        draw();
        localFrame = requestAnimationFrame(updateAndDraw);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Update center node position dynamically just in case
      if (nodesRef.current[0]) {
        nodesRef.current[0].x = centerX;
        nodesRef.current[0].y = centerY;
      }

      // 1. Update nodes
      nodesRef.current.forEach((node, index) => {
        if (index === 0) {
          node.pulsePhase += 0.05;
          return; // Central node is fixed
        }

        // Apply slight siphon force if active
        if (siphonActive) {
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 50) {
            // Siphon pull (inverse proportional force)
            const force = 0.012 * (1 / (dist * 0.01)) * flowSpeed;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          } else {
            // Push back slightly if too close to center
            const pushForce = 0.1;
            node.vx -= (dx / dist) * pushForce;
            node.vy -= (dy / dist) * pushForce;
          }
        }

        // Apply velocity
        node.x += node.vx * flowSpeed;
        node.y += node.vy * flowSpeed;

        // Apply bounce bounds with margin
        const margin = 20;
        if (node.x < margin || node.x > width - margin) {
          node.vx *= -1;
          node.x = node.x < margin ? margin : width - margin;
        }
        if (node.y < margin || node.y > height - margin) {
          node.vy *= -1;
          node.y = node.y < margin ? margin : height - margin;
        }

        // Add slight drag to keep speed under control
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Random jitter to simulate lifelike data drift
        node.vx += (Math.random() - 0.5) * 0.05;
        node.vy += (Math.random() - 0.5) * 0.05;

        node.pulsePhase += 0.02;
      });

      // 2. Generate random flow particles along connections
      if (Math.random() < 0.15 * flowSpeed && nodesRef.current.length > 1) {
        // Pick a random node other than center
        const sourceIndex = 1 + Math.floor(Math.random() * (nodesRef.current.length - 1));
        const sourceNode = nodesRef.current[sourceIndex];

        // Find standard connection within distance
        const possibleTargets: number[] = [];
        nodesRef.current.forEach((otherNode, idx) => {
          if (idx === sourceIndex) return;
          const dx = otherNode.x - sourceNode.x;
          const dy = otherNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            possibleTargets.push(idx);
          }
        });

        if (possibleTargets.length > 0) {
          // Send particle to a connected neighbor
          const targetIndex = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
          const targetNode = nodesRef.current[targetIndex];

          particlesRef.current.push({
            x: sourceNode.x,
            y: sourceNode.y,
            targetX: targetNode.x,
            targetY: targetNode.y,
            progress: 0,
            speed: (0.01 + Math.random() * 0.015) * flowSpeed,
            color: sourceNode.color,
            size: 2 + Math.random() * 3,
          });
        }
      }

      // Extra: Siphon specific streaming packets straight to center
      if (siphonActive && Math.random() < 0.25 * flowSpeed && nodesRef.current.length > 1) {
        const sourceIndex = 1 + Math.floor(Math.random() * (nodesRef.current.length - 1));
        const sourceNode = nodesRef.current[sourceIndex];
        particlesRef.current.push({
          x: sourceNode.x,
          y: sourceNode.y,
          targetX: centerX,
          targetY: centerY,
          progress: 0,
          speed: (0.015 + Math.random() * 0.02) * flowSpeed,
          color: sourceNode.color,
          size: 2.5 + Math.random() * 3,
        });
      }

      // Update existing particles
      particlesRef.current.forEach((p, pIndex) => {
        p.progress += p.speed;

        // Interpolate along path
        // If siphon is active, let them drift towards center if target is moving
        const targetNode = nodesRef.current.find(
          n => Math.abs(n.x - p.targetX) < 1 && Math.abs(n.y - p.targetY) < 1
        ) || nodesRef.current[0]; // Fallback to center siphon node

        p.x = p.x + (targetNode.x - p.x) * p.progress;
        p.y = p.y + (targetNode.y - p.y) * p.progress;

        if (p.progress >= 1.0) {
          // Arrived! Increments metrics
          setMetrics((prev) => ({
            ...prev,
            processed: prev.processed + 1,
            flowRate: Math.min(950, Math.max(120, Math.floor(prev.flowRate + (Math.random() * 4 - 1.8)))),
          }));
          particlesRef.current.splice(pIndex, 1);
        }
      });

      // Maintain metrics ticking naturally
      if (Math.random() < 0.05) {
        setMetrics((prev) => ({
          ...prev,
          efficiency: Math.min(99.99, Math.max(99.85, prev.efficiency + (Math.random() * 0.02 - 0.01))),
        }));
      }

      draw();
      localFrame = requestAnimationFrame(updateAndDraw);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw elegant subtle radar or target circles around Siphon center
      if (siphonActive) {
        ctx.strokeStyle = "rgba(236, 0, 140, 0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(0, 174, 239, 0.04)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
        ctx.stroke();

        // Animated pulse wave expanding outwards
        const time = Date.now() * 0.001;
        const radius = (time % 4) * 80;
        ctx.strokeStyle = `rgba(0, 174, 239, ${Math.max(0, 0.15 - (time % 4) * 0.035)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw connections (thin, elegant black lines)
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Connection opacity is based on distance
            const alpha = Math.max(0.05, (1 - dist / connectionDistance) * 0.28);
            ctx.strokeStyle = `rgba(17, 17, 17, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw siphon channel visual lines
      if (siphonActive) {
        ctx.lineWidth = 0.5;
        nodesRef.current.forEach((n, idx) => {
          if (idx === 0) return;
          const dx = centerX - n.x;
          const dy = centerY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const alpha = Math.max(0, (1 - dist / 220) * 0.15);
            ctx.strokeStyle = `rgba(236, 0, 140, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(centerX, centerY);
            ctx.stroke();
          }
        });
      }

      // Draw flow particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Light outer glow
        if (p.color === colors.magenta || p.color === colors.cyan) {
          ctx.fillStyle = p.color === colors.magenta ? "rgba(236, 0, 140, 0.2)" : "rgba(0, 174, 239, 0.2)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nodes
      nodesRef.current.forEach((node, idx) => {
        const pulse = Math.sin(node.pulsePhase) * 1.5;
        const radius = Math.max(2, node.radius + pulse);

        // Drop shadow style
        ctx.shadowColor = "rgba(0,0,0,0.06)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadows
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw ring border
        ctx.strokeStyle = node.color === colors.yellow ? "#E6D900" : "#FFFFFF";
        ctx.lineWidth = idx === 0 ? 3 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw special outer glowing rings for central Siphon Node
        if (idx === 0) {
          ctx.strokeStyle = "rgba(33, 33, 33, 0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 6 + Math.sin(Date.now() * 0.003) * 2, 0, Math.PI * 2);
          ctx.stroke();

          // Magenta core visual indicators
          ctx.fillStyle = colors.magenta;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animationFrameRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, siphonActive, flowSpeed, connectionDistance]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 8 colorful particles from click location outwards to nearest nodes
    const particleColors = [colors.cyan, colors.magenta, colors.yellow, colors.dark];
    
    for (let i = 0; i < 8; i++) {
      // Pick random targets
      if (nodesRef.current.length > 0) {
        const randomTarget = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
        particlesRef.current.push({
          x: x,
          y: y,
          targetX: randomTarget.x,
          targetY: randomTarget.y,
          progress: 0,
          speed: 0.01 + Math.random() * 0.015,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          size: 3 + Math.random() * 4,
        });
      }
    }

    setMetrics(prev => ({ ...prev, processed: prev.processed + 8 }));
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initNodes(canvas.width, canvas.height, nodeDensity);
    particlesRef.current = [];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch w-full max-w-7xl mx-auto px-4">
      {/* Simulation Box */}
      <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col min-h-[460px] md:min-h-[520px]">
        
        {/* Interactive Grid Overlay for technical aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        {/* SoftSiphon interactive header inside simulator */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between items-center gap-2 pointer-events-none z-10">
          <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100/50 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-800 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${siphonActive ? "bg-brand-magenta" : "bg-brand-cyan"} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${siphonActive ? "bg-brand-magenta" : "bg-brand-cyan"}`}></span>
            </span>
            {siphonActive ? "SIFÓN ACTIVO" : "MONITOR DE RED"}
          </div>

          <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100/50 text-[10px] font-mono font-medium text-slate-500 shadow-sm">
            Hacer clic en la cuadrícula para inyectar paquetes
          </div>
        </div>

        {/* Core Canvas */}
        <div ref={containerRef} className="flex-1 w-full relative h-full">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="absolute inset-0 w-full h-full cursor-crosshair block"
          />
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg flex flex-wrap items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-brand-dark text-white hover:bg-brand-cyan transition-colors"
              title={isPlaying ? "Pausar" : "Iniciar"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={() => setSiphonActive(!siphonActive)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                siphonActive
                  ? "bg-brand-magenta text-white shadow-md shadow-brand-magenta/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {siphonActive ? "Desactivar Sifón" : "Activar Sifón"}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              title="Reiniciar Red"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-brand-cyan" />
              <span>Sifón: <strong className="text-slate-900">{metrics.processed.toLocaleString()}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-brand-magenta" />
              <span>Flujo: <strong className="text-slate-900">{metrics.flowRate} MB/s</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Settings */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="text-brand-cyan" size={18} />
            <h3 className="text-sm font-bold tracking-tight text-slate-800 uppercase">Parámetros de Sifonado</h3>
          </div>

          {/* Slider 1: Velocidad */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-600 font-medium">Velocidad del Flujo</span>
              <span className="font-mono font-bold text-brand-magenta">{flowSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={flowSpeed}
              onChange={(e) => setFlowSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-magenta"
            />
          </div>

          {/* Slider 2: Densidad */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-600 font-medium">Nodos de Información</span>
              <span className="font-mono font-bold text-brand-cyan">{nodeDensity}</span>
            </div>
            <input
              type="range"
              min="10"
              max="45"
              step="1"
              value={nodeDensity}
              onChange={(e) => setNodeDensity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
          </div>

          {/* Slider 3: Connection Distance */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-600 font-medium">Distancia de Enlace</span>
              <span className="font-mono font-bold text-slate-800">{connectionDistance}px</span>
            </div>
            <input
              type="range"
              min="60"
              max="200"
              step="10"
              value={connectionDistance}
              onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-dark"
            />
          </div>

          {/* Info diagnostics box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2.5 font-sans">
            <div className="flex justify-between">
              <span>Eficiencia de Sifonado:</span>
              <span className="font-mono font-bold text-emerald-600">{metrics.efficiency.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Pérdida de Latencia:</span>
              <span className="font-mono font-bold text-brand-cyan">0.12 ms</span>
            </div>
            <div className="flex justify-between">
              <span>Estado de Integración:</span>
              <span className="font-mono font-bold text-slate-800 flex items-center gap-1">
                Optimizada <ShieldCheck size={12} className="text-emerald-500 inline" />
              </span>
            </div>
          </div>
        </div>

        {/* Decorative badge explaining siphon */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
          <p className="leading-relaxed">
            El <strong>Sifonado Inteligente</strong> es la tecnología de extracción y optimización de datos en tránsito exclusiva de SOFTSIPHON.
          </p>
        </div>
      </div>
    </div>
  );
}
