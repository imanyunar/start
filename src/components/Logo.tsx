import logoImg from '../assets/Logo.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-5 group ${className}`}>
      <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div>
        <span className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--app-text)] leading-none block">
          VERMONT
        </span>
        <p className="text-[12px] md:text-[14px] font-black text-blue-primary uppercase tracking-[0.3em] mt-2">
          Automated
        </p>
      </div>
    </div>
  );
};

export default Logo;
