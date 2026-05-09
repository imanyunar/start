import logoImg from '../assets/Logo.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xl md:text-3xl font-black tracking-tighter text-[var(--app-text)] leading-[0.8] block mb-1">
          VERMONT
        </span>
        <p className="text-[9px] md:text-[11px] font-black text-blue-primary uppercase tracking-[0.25em] leading-none">
          Automated
        </p>
      </div>
    </div>
  );
};

export default Logo;
