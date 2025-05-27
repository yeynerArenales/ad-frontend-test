import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('renders footer with logo', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(
      'bg-primary',
      'h-[170px]',
      'flex',
      'items-center',
      'justify-center'
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');

    const logo = screen.getByAltText('Apply Digital Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/applyDigitalLogo.svg');
    expect(logo).toHaveAttribute('width', '170');
    expect(logo).toHaveAttribute('height', '44');
  });
}); 