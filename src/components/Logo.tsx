import logoImg from '../assets/LOGO 2.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden flex items-center justify-center flex-shrink-0">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-[175%] h-[175%] max-w-none object-contain brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(0,113,227,0.45)] group-hover:scale-105 transition-transform duration-500"
          loading="eager"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--app-text)] leading-none block">
          VERMONT
        </span>
      </div>
    </div>
  );
};

export default Logo;
