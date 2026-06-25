import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  interactive?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  showText = true,
  interactive = true,
}: LogoProps) {
  // Dimensions based on size
  const sizes = {
    sm: { width: 44, height: 44, textClass: "text-base font-bold tracking-tight" },
    md: { width: 80, height: 80, textClass: "text-xl font-bold tracking-tight" },
    lg: { width: 150, height: 150, textClass: "text-3xl font-extrabold tracking-tight" },
    xl: { width: 280, height: 280, textClass: "text-5xl font-extrabold tracking-tight" },
  };

  const currentSize = sizes[size];

  // Precise coordinates for the interconnected node network of SOFTSIPHON (the Isotipo)
  // Replicating points and black lines from reference image
  const nodes = [
    { id: 1, cx: 40, cy: 15, color: "#212121", radius: 5, label: "black" }, // top left-ish
    { id: 2, cx: 58, cy: 10, color: "#FFF200", radius: 6, label: "yellow" }, // top
    { id: 3, cx: 72, cy: 18, color: "#00AEEF", radius: 5, label: "cyan" }, // top right
    { id: 4, cx: 28, cy: 30, color: "#EC008C", radius: 6, label: "magenta" }, // left upper
    { id: 5, cx: 50, cy: 45, color: "#212121", radius: 7.5, label: "center-black" }, // center heavy node
    { id: 6, cx: 78, cy: 42, color: "#FFF200", radius: 6.5, label: "yellow-right" }, // right middle
    { id: 7, cx: 18, cy: 45, color: "#212121", radius: 4.5, label: "black-far-left" }, // left outlier
    { id: 8, cx: 30, cy: 58, color: "#00AEEF", radius: 5.5, label: "cyan-left" }, // left lower
    { id: 9, cx: 70, cy: 55, color: "#EC008C", radius: 5.5, label: "magenta-right" }, // right lower
    { id: 10, cx: 38, cy: 78, color: "#212121", radius: 5.5, label: "black-bottom" }, // bottom left
    { id: 11, cx: 54, cy: 82, color: "#FFF200", radius: 7, label: "yellow-bottom" }, // bottom center
    { id: 12, cx: 68, cy: 85, color: "#00AEEF", radius: 5, label: "cyan-bottom" }, // bottom right
    { id: 13, cx: 42, cy: 33, color: "#00AEEF", radius: 6, label: "cyan-inner" }, // inner high
    { id: 14, cx: 62, cy: 32, color: "#212121", radius: 5, label: "black-inner" }, // inner high-right
    { id: 15, cx: 52, cy: 62, color: "#EC008C", radius: 5, label: "magenta-inner" }, // inner low
  ];

  // Connections/lines between nodes exactly matching network aesthetic
  const connections = [
    [1, 2], [2, 3], [1, 4], [3, 14],
    [4, 7], [4, 13], [13, 1], [13, 5],
    [14, 5], [14, 6], [3, 6], [5, 2],
    [7, 8], [8, 5], [8, 10], [5, 15],
    [15, 11], [15, 9], [6, 9], [9, 12],
    [10, 11], [11, 12], [13, 8], [14, 9]
  ];

  // Slow float animation for interactive mode
  const floatTransition = interactive
    ? {
        animate: {
          y: [0, -2, 1, -1, 0],
          x: [0, 1, -1, 0.5, 0],
        },
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    : {};

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Isotipo (Connected Nodes SVG) */}
      <motion.svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        {...floatTransition}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections (Lines) */}
        {connections.map(([from, to], index) => {
          const fromNode = nodes.find((n) => n.id === from);
          const toNode = nodes.find((n) => n.id === to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`line-${index}`}
              x1={fromNode.cx}
              y1={fromNode.cy}
              x2={toNode.cx}
              y2={toNode.cy}
              stroke="#111111"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.5, delay: index * 0.03 }}
              whileHover={interactive ? { strokeWidth: 2.5, stroke: "#EC008C" } : {}}
            />
          );
        })}

        {/* Nodes (Dots) */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.cx}
            cy={node.cy}
            r={node.radius}
            fill={node.color}
            stroke={node.color === "#FFF200" ? "#D4C500" : "#ffffff"}
            strokeWidth="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              delay: node.id * 0.05,
            }}
            whileHover={
              interactive
                ? {
                    scale: 1.35,
                    filter: "url(#glow)",
                    cursor: "pointer",
                    transition: { duration: 0.2 }
                  }
                : {}
            }
          />
        ))}
      </motion.svg>

      {/* Logotipo (Text with branding colors) */}
      {showText && (
        <div className={`mt-2 select-none font-sans ${currentSize.textClass} flex items-center`}>
          {/* S - Cyan */}
          <span style={{ color: "#00AEEF" }}>S</span>
          {/* oft - Black */}
          <span className="text-[#212121]">oft</span>
          {/* S - Magenta */}
          <span style={{ color: "#EC008C" }}>S</span>
          {/* iph - Black */}
          <span className="text-[#212121]">iph</span>
          {/* o - Yellow/Dorado */}
          <span style={{ color: "#FFF200" }} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">o</span>
          {/* n - Black */}
          <span className="text-[#212121]">n</span>
        </div>
      )}
    </div>
  );
}
