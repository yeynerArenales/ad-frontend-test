import { render, screen, act } from '@testing-library/react';
import { Toast } from './index';

describe('Toast', () => {
  const mockMessage = 'Test message';
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders toast with message when show is true', () => {
    render(
      <Toast
        message={mockMessage}
        show={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    const { container } = render(
      <Toast
        message={mockMessage}
        show={false}
        onClose={mockOnClose}
      />
    );

    expect(container.innerHTML).toBe('');
  });

  it('calls onClose after default duration (2000ms)', () => {
    render(
      <Toast
        message={mockMessage}
        show={true}
        onClose={mockOnClose}
      />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose after custom duration', () => {
    const customDuration = 3000;
    render(
      <Toast
        message={mockMessage}
        show={true}
        onClose={mockOnClose}
        duration={customDuration}
      />
    );

    act(() => {
      jest.advanceTimersByTime(customDuration);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('clears timeout when component unmounts', () => {
    const { unmount } = render(
      <Toast
        message={mockMessage}
        show={true}
        onClose={mockOnClose}
      />
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('has correct styling classes', () => {
    render(
      <Toast
        message={mockMessage}
        show={true}
        onClose={mockOnClose}
      />
    );

    const toast = screen.getByText(mockMessage);
    expect(toast).toHaveClass(
      'fixed',
      'top-6',
      'left-6',
      'right-6',
      'md:top-auto',
      'md:bottom-6',
      'md:left-1/2',
      'md:right-auto',
      'md:w-auto',
      'md:-translate-x-1/2',
      'bg-primary',
      'text-white',
      'px-6',
      'py-3',
      'rounded',
      'shadow-lg',
      'z-50',
      'transition-all',
      'animate-fade-in'
    );
  });
}); 