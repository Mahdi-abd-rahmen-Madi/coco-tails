import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Image = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  placeholder = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    
    const handleLoad = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    
    const handleError = () => {
      setIsError(true);
      setIsLoaded(false);
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  // If there's an error and no placeholder, return null or a fallback
  if (isError && !placeholder) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Placeholder */}
      {(!isLoaded || isError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wellness-cream to-wellness-gold-50">
          {placeholder || (
            <div className="text-4xl text-wellness-gold-400">
              {alt.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}
      
      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full ${className}`}
        style={{
          objectFit,
          opacity: isLoaded && !isError ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !isError ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default Image;
