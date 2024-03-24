import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {

  return <div className={`container max-w-6xl p-1 ${className}`}>{children}</div>;
};

export default Container;
