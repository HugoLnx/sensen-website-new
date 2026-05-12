import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "text-center mb-12",
  titleClassName = "text-4xl mb-4 text-primary font-bold",
  subtitleClassName = "text-xl text-general-dim max-w-2xl mx-auto",
}) => {
  return (
    <div className={className}>
      <h1 className={titleClassName}>{title}</h1>
      {subtitle && (
        <p className={subtitleClassName}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
