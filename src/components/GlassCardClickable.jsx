export default function GlassCard({ children, className = "" }) {
  return (
    // <div
    //   className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}
    // >
        <div className={`
        relative
        px-8 py-4
        bg-white/20
        backdrop-blur-md
        border border-white/30
        rounded-2xl
        shadow-lg shadow-black/10
        transition-all duration-300
        hover:bg-white/30
        hover:border-white/50
        hover:shadow-xl hover:shadow-black/20
        hover:scale-105
        active:scale-95
        active:bg-white/40
        group
        overflow-hidden
        ${className}
      `}>
      {children}
    </div>
  );
}