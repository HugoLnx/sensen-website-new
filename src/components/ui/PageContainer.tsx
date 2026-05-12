import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  maxWidth?: '6xl' | '7xl' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "min-h-screen page-bg py-12 px-4 sm:px-6 lg:px-8",
  innerClassName = "mx-auto",
  maxWidth = '7xl',
}) => {
  const maxWidthClass = {
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  }[maxWidth];

  return (
    <main className={className}>
      <div className={`${maxWidthClass} ${innerClassName}`}>
        {children}
      </div>
    </main>
  );
};
