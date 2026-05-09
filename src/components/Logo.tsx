import logoImg from '../assets/LOGO 2.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 group ${className}`}>
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-2xl md:text-3xl font-black tracking-tighter text-[var(--app-text)] leading-none block">
          VERMONT
        </span>
        <p className="text-[10px] md:text-[12px] font-black text-blue-primary uppercase tracking-[0.3em] mt-1">
          Automated
        </p>
      </div>
    </div>
  );
};

export default Logo;
