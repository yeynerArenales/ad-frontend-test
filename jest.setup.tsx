import React from 'react';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} />
  },
}));

// Mock next/navigation
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

declare global {
  var mockUsePathname: jest.Mock;
}
global.mockUsePathname = mockUsePathname;

// Mock Spinner component
jest.mock('@/components/atoms/spinner', () => ({
  Spinner: ({ size = 'medium', className }: { size?: 'small' | 'medium' | 'large'; className?: string }) => {
    const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
      small: 'w-6 h-6',
      medium: 'w-12 h-12',
      large: 'w-16 h-16'
    };

    return (
      <div 
        role="status" 
        aria-label="loading"
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-secondary rounded-full animate-spin ${className || ''}`}
      />
    );
  },
})); 