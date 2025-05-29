import { render, screen } from '@testing-library/react';
import { Spinner } from './index';

describe('Spinner', () => {
  it('renders with default medium size', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-12 h-12');
    expect(spinner).toHaveAttribute('aria-label', 'loading');
  });

  it('renders with small size', () => {
    render(<Spinner size="small" />);
    const spinner = screen.getByRole('status');
    
    expect(spinner).toHaveClass('w-6 h-6');
  });

  it('renders with large size', () => {
    render(<Spinner size="large" />);
    const spinner = screen.getByRole('status');
    
    expect(spinner).toHaveClass('w-16 h-16');
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Spinner className={customClass} />);
    const spinner = screen.getByRole('status');
    
    expect(spinner).toHaveClass(customClass);
  });

  it('has correct animation and border classes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('border-4');
    expect(spinner).toHaveClass('border-gray-200');
    expect(spinner).toHaveClass('border-t-secondary');
    expect(spinner).toHaveClass('rounded-full');
  });
}); 