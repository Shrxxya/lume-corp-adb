export default function Button({ children }) {
  return (
    // <button className="px-6 py-3 border-none bg-[#62754c] text-[#fdfdf8] hover:bg-white/20 hover:text-[#62754c] transition-all duration-300 hover:opacity-20">
    //   {children}
    // </button>
    <button className="relative overflow-hidden px-6 py-3 border-none bg-[#62754c] text-[#fdfdf8] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group">
      
      {/* Hover overlay */}
      <span className="absolute inset-0 bg-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#62754c]">
        {children}
      </span>
    </button>
  );
}