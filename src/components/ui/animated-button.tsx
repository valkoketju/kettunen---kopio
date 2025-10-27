import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AnimatedButtonProps {
  to: string;
  topText: string;
  bottomText: string;
  className?: string;
}

export const AnimatedButton = ({ to, topText, bottomText, className }: AnimatedButtonProps) => {
  return (
    <Link to={to}>
      <button 
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold",
          "text-primary-foreground bg-gradient-to-br from-primary to-primary/80",
          "border-none rounded-[50px] cursor-pointer",
          "shadow-[0_8px_15px_rgba(0,0,0,0.2)]",
          "transition-all duration-500 ease-in-out",
          "hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]",
          "[perspective:500px] [transform-style:preserve-3d]",
          "group overflow-visible",
          className
        )}
        style={{
          transform: 'translateZ(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotateX(10deg) rotateY(10deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }}
      >
        {/* 3D depth layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent to-accent/80 rounded-[50px] -z-10
                     transition-transform duration-500 group-hover:[transform:translateZ(-40px)]"
          style={{ transform: 'translateZ(-20px)' }}
        />
        
        {/* Icon */}
        <Sparkles 
          className="w-6 h-6 mr-2 transition-transform duration-500 group-hover:rotate-[360deg]"
          style={{ transform: 'translateZ(10px)' }}
        />
        
        {/* Text */}
        <span 
          className="z-10 flex flex-col items-center transition-transform duration-500"
          style={{ transform: 'translateZ(10px)' }}
        >
          <span className="block leading-tight group-hover:[transform:translateZ(20px)] transition-transform duration-500">
            {topText}
          </span>
          <span className="block leading-tight group-hover:[transform:translateZ(20px)] transition-transform duration-500">
            {bottomText}
          </span>
        </span>
      </button>
    </Link>
  );
};
