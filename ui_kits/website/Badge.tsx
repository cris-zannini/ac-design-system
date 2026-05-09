import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'outline' | 'monochrome';
  className?: string;
};

export default function Badge({ children, variant = 'outline', className = '' }: BadgeProps) {
  // Base comum para qualquer pílula
  const baseClasses = 'inline-block rounded-full text-[13px] text-center whitespace-nowrap';
  
  const variants = {
    // Versão colorida vazada: Usa 'border-current' para que a borda puxe automaticamente a cor do texto passada no className
    outline: 'border-2 border-current bg-transparent font-black px-4 py-[4px] uppercase',
    // Versão exata da seção "Conteúdos Incluídos"
    monochrome: 'bg-white/10 text-white/80 font-bold px-4 py-2 capitalize'
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`.trim();

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
}
