import React from 'react';

interface SocialLinkProps {
  icon: React.ElementType;
  label: string;
  url: string;
  className?: string;
  iconClassName?: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  icon: Icon,
  label,
  url,
  className = "flex items-start gap-4",
  iconClassName = "w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center shrink-0",
}) => {
  return (
    <div className={className}>
      <div className={iconClassName}>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-primary transition-colors underline decoration-slate-600 underline-offset-2"
        >
          <h3 className="text-general font-medium mb-1">{label}</h3>
        </a>
      </div>
    </div>
  );
};
