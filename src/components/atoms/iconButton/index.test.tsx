import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './index';

describe('IconButton', () => {
  const mockIcon = '/test-icon.png';
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders correctly with required props', () => {
    render(<IconButton icon={mockIcon} />);
    const button = screen.getByRole('button');
    const image = screen.getByAltText('Icon button');
    
    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockIcon);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<IconButton icon={mockIcon} className={customClass} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass(customClass);
  });

  it('handles click events', () => {
    render(<IconButton icon={mockIcon} onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct image dimensions', () => {
    render(<IconButton icon={mockIcon} />);
    const image = screen.getByAltText('Icon button');
    
    expect(image).toHaveAttribute('width', '24');
    expect(image).toHaveAttribute('height', '24');
    expect(image).toHaveClass('h-6 w-6');
  });
}); 