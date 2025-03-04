import Image, { ImageProps } from 'next/image';
import React from 'react';

interface OptimizedImageProps extends ImageProps {
  alt: string;
  className?: string;
}

// This component wraps Next.js Image for automatic optimization.
const OptimizedImage: React.FC<OptimizedImageProps> = ({ alt, className, ...props }) => {
  return (
    <Image
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;
