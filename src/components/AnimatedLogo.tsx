
import { useEffect, useRef } from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = '' }: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 40 * dpr;
      canvas.height = 40 * dpr;
      ctx.scale(dpr, dpr);
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    let animationFrameId: number;
    let rotation = 0;
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set styles
      ctx.fillStyle = '#000';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      
      // Save context state
      ctx.save();
      
      // Move to center
      ctx.translate(20, 20);
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Apply rotation animation for inner element
      rotation += 0.01;
      ctx.rotate(rotation);
      
      // Draw inner shapes
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(8, 8);
      ctx.moveTo(-8, 8);
      ctx.lineTo(8, -8);
      ctx.stroke();
      
      // Restore context state
      ctx.restore();
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`w-10 h-10 ${className}`} 
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedLogo;
