import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with default secondary variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-text-dark');
    expect(button).toHaveClass('text-white');
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('text-secondary');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-secondary');
  });

  it('shows spinner when loading', () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole('button');
    const spinner = screen.getByRole('status');
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6 h-6');
    expect(spinner).toHaveClass('mr-2');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('handles click events', () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle click events when disabled', () => {
    render(<Button onClick={mockOnClick} disabled>Click me</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Button className={customClass}>Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass(customClass);
  });

  it('renders with correct default type', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with submit type', () => {
    render(<Button type="submit">Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('type', 'submit');
  });
}); 