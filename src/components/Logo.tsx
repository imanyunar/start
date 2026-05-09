import logoImg from '../assets/Logo.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 group ${className}`}>
      <div className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-2xl">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div>
        <span className="text-2xl md:text-3xl font-black tracking-tighter text-[var(--app-text)] leading-none block">
          VERMONT
        </span>
        <p className="text-[10px] md:text-[12px] font-black text-blue-primary uppercase tracking-[0.2em] mt-1">
          Automated
        </p>
      </div>
    </div>
  );
};

export default Logo;
