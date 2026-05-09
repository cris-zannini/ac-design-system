import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'inline';
  showExternalIcon?: boolean;
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({ href, variant = 'primary', showExternalIcon = false, className = '', children, ...props }: ButtonProps) {
  // A base oficial do botão do Design System do Aprenda em Casa
  const variants = {
    primary: 'inline-block rounded-full font-black text-[15px] uppercase tracking-[.5px] px-9 py-4 text-white no-underline text-center leading-tight',
    inline: 'inline-flex items-center gap-1 rounded-full font-black px-3 py-0.5 mx-1 shadow-sm hover:brightness-110 transition-all no-underline scale-105 bg-brand-green text-white'
  };
  
  // Mescla as classes base com possíveis customizações (ex: bg-brand-green para primary)
  const combinedClasses = `${variants[variant]} ${className}`.trim();

  const renderChildren = () => (
    <>
      {children}
      {showExternalIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      )}
    </>
  );

  // Se houver um link, renderiza como <a>
  if (href) {
    const isExternal = href.startsWith('http') || props.target === '_blank' || variant === 'inline';
    
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>
          {renderChildren()}
        </a>
      );
    }
    
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {renderChildren()}
      </Link>
    );
  }

  // Se não houver link, renderiza como um <button> normal de formulário/ação
  return (
    <button className={combinedClasses} {...props}>
      {renderChildren()}
    </button>
  );
}
