import logoImg from '../assets/Logo.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div>
        <span className="text-xl md:text-2xl font-black tracking-tighter text-[var(--app-text)]">
          VERMONT
        </span>
        <p className="text-[8px] md:text-[10px] font-black text-blue-primary uppercase tracking-[0.2em] leading-none">
          Automated
        </p>
      </div>
    </div>
  );
};

export default Logo;
