export default function Button({ children }) {
  return (
    // <button className="px-6 py-3 border-none bg-[#58644B] text-[#E7E7DF] hover:bg-white/20 hover:text-[#58644B] transition-all duration-300 hover:opacity-20">
    //   {children}
    // </button>
    <button className="relative overflow-hidden px-6 py-3 border-none bg-[#58644B] text-[#E7E7DF] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group">
      
      {/* Hover overlay */}
      <span className="absolute inset-0 bg-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#58644B]">
        {children}
      </span>
    </button>
  );
}