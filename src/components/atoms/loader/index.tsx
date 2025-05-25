interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Loader = ({ size = 'medium', className = '' }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-secondary rounded-full animate-spin ${className}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}; 