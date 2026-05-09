const Logo = () => {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 bg-blue-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full h-full text-[var(--app-text)]">
          <rect x="10" y="10" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M20 15V25M15 20H25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="3" fill="currentColor" className="animate-pulse"/>
        </svg>
      </div>
      <span className="text-xl font-black tracking-tighter text-[var(--app-text)] uppercase italic">
        Vermont<span className="text-blue-primary">.</span>
      </span>
    </div>
  );
};

export default Logo;
