import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, ShieldAlert, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    dataVolume: "10-100TB",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    setStatus("loading");

    // Simulate node syncing with corporate API
    setTimeout(() => {
      const generatedTicket = "SS-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setStatus("success");
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      dataVolume: "10-100TB",
      message: "",
    });
    setStatus("idle");
  };

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-brand-magenta/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-magenta bg-pink-50 px-3 py-1.5 rounded-full">
            FORMULARIO CORPORATIVO
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Solicitar Demo & Contacto
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Inicia tu transición hacia la optimización masiva de flujos. Completa el formulario para agendar una sesión técnica de sifonado de datos con nuestros arquitectos.
          </p>
        </div>

        {/* Content Box split into two columns: Left (Contact Info & Map representation), Right (Form itself) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Corporate Information & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100">
            
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                Oficinas Centrales <span className="text-brand-magenta font-black">SOFTSIPHON</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                Nuestros ingenieros de soporte de red operan bajo un esquema 24/7/365 en nodos distribuidos globalmente para asegurar la latencia cero.
              </p>

              {/* Information listings */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 text-xs font-semibold">
                  <div className="p-3 rounded-xl bg-white text-[#00AEEF] shadow-sm shrink-0 border border-slate-100">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Dirección Principal</span>
                    <p className="text-slate-700 font-medium mt-1">Av. de la Conectividad 1024, Distrito de Redes, Madrid, España</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-xs font-semibold">
                  <div className="p-3 rounded-xl bg-white text-[#EC008C] shadow-sm shrink-0 border border-slate-100">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Correo de Enlace</span>
                    <p className="text-slate-700 font-medium mt-1">integraciones@softsiphon.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-xs font-semibold">
                  <div className="p-3 rounded-xl bg-white text-slate-800 shadow-sm shrink-0 border border-slate-100">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Línea de Enlace Directo</span>
                    <p className="text-slate-700 font-medium mt-1">+34 910 882 546</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero latency Guarantee badge */}
            <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-pink-50 text-[#EC008C] rounded-xl shrink-0">
                <ShieldAlert size={18} />
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                <strong>Garantía Siphon-Feed:</strong> Ninguna sesión de auditoría o conexión demo afectará de ninguna forma tus servidores de producción activos.
              </p>
            </div>

          </div>

          {/* Right Column: The Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-xl shadow-slate-100/40 flex flex-col justify-center min-h-[440px]">
            
            {status === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombre Completo</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                    />
                  </div>

                  {/* Company field */}
                  <div className="space-y-1.5">
                    <label htmlFor="company-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombre de la Empresa</label>
                    <input
                      id="company-input"
                      type="text"
                      required
                      placeholder="Ej. Continental S.A."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Correo Corporativo</label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="juan@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors"
                    />
                  </div>

                  {/* Volume Select field */}
                  <div className="space-y-1.5">
                    <label htmlFor="volume-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Volumen de Datos Diario</label>
                    <select
                      id="volume-select"
                      value={formData.dataVolume}
                      onChange={(e) => setFormData({ ...formData, dataVolume: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:border-brand-magenta transition-colors cursor-pointer"
                    >
                      <option value="<10TB">Menor a 10 TB diario</option>
                      <option value="10-100TB">10 a 100 TB diario</option>
                      <option value="100-500TB">100 a 500 TB diario</option>
                      <option value=">500TB">Más de 500 TB diario</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Desafío de Datos / Mensaje</label>
                  <textarea
                    id="message-input"
                    rows={4}
                    placeholder="Describe brevemente tus cuellos de botella de latencia u objetivos de integración..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-magenta transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-dark hover:bg-brand-magenta text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  Enviar Solicitud <Send size={12} />
                </button>
              </form>
            )}

            {/* Syncing / Loading state */}
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center space-y-6 text-center py-10 animate-pulse">
                <div className="relative">
                  <Loader2 size={48} className="animate-spin text-[#EC008C] relative z-10" />
                  <div className="absolute inset-0 bg-[#00AEEF]/20 rounded-full blur-xl animate-ping" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Estableciendo Enlace Lógico</h4>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono leading-relaxed">
                    Sincronizando metadatos con terminal: Siphon-East-04 <br />
                    Garantizando canal seguro SSL/TLS... 99.8%
                  </p>
                </div>
              </div>
            )}

            {/* Success state - Beautiful Corporate Ticket Receipt */}
            {status === "success" && (
              <div className="space-y-8 py-4 animate-fade-in">
                
                {/* Header confirmation */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle size={26} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-brand-dark tracking-tight">¡Solicitud Registrada con Éxito!</h4>
                    <p className="text-xs text-slate-500 font-medium">Un ingeniero de redes te contactará en un plazo menor a 2 horas.</p>
                  </div>
                </div>

                {/* Receipt ticket graphic styled in clean tech format */}
                <div className="border border-slate-100 bg-slate-50 rounded-2xl p-6 space-y-4 font-mono text-[10px] font-semibold text-slate-600 relative overflow-hidden">
                  
                  {/* Diagonal background watermark */}
                  <div className="absolute -right-6 -bottom-6 text-slate-100 font-mono font-black text-6xl select-none uppercase pointer-events-none tracking-tighter">
                    SIFON
                  </div>

                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-slate-400">IDENTIFICADOR DE TICKET:</span>
                    <span className="text-brand-magenta font-bold">{ticketId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">SOLICITANTE:</span>
                    <span className="text-slate-800">{formData.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">EMPRESA ASOCIADA:</span>
                    <span className="text-slate-800">{formData.company}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">CORREO ASIGNADO:</span>
                    <span className="text-slate-800">{formData.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">VOLUMEN DECLARADO:</span>
                    <span className="text-slate-800">{formData.dataVolume}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-200/50 pt-2 text-[9px]">
                    <span className="text-slate-400">COLECTOR ENLACE:</span>
                    <span className="text-brand-cyan font-bold flex items-center gap-1">
                      Siphon-West-Node03 <Sparkles size={10} />
                    </span>
                  </div>
                </div>

                {/* Reset Action */}
                <div className="flex justify-end">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-xl text-[10px] font-bold text-slate-500 hover:text-brand-dark hover:bg-slate-50 transition-all border border-slate-100 uppercase tracking-widest cursor-pointer"
                  >
                    Registrar Otra Solicitud
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
