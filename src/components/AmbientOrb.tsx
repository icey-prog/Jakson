import React from 'react';

interface AmbientOrbProps {
  size?: number;
  className?: string;
  opacity?: number;
}

const AmbientOrb: React.FC<AmbientOrbProps> = ({
  size = 400,
  className = '',
  opacity = 0.15,
}) => {
  return (
    <div
      className={`ambient-orb animate-float ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(5, 150, 105, 0.6) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 70%)',
        opacity,
      }}
    />
  );
};

export default React.memo(AmbientOrb);
