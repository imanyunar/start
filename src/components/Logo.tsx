import logoImg from '../assets/LOGO 2.png';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
        <img 
          src={logoImg} 
          alt="Vermont Logo" 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="eager"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xl md:text-2xl font-bold tracking-tight text-[var(--app-text)] leading-none block">
          VERMONT
        </span>
      </div>
    </div>
  );
};

export default Logo;
