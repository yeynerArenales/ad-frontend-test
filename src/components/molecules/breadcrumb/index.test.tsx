import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './index';

describe('Breadcrumb', () => {
  beforeEach(() => {
    // @ts-ignore
    global.mockUsePathname.mockClear();
  });

  it('renders breadcrumb for non-home pages', () => {
    // @ts-ignore
    global.mockUsePathname.mockReturnValue('/products');
    
    render(<Breadcrumb />);
    
    const navigation = screen.getByRole('navigation', { name: 'Back to catalog' });
    const link = screen.getByRole('link');
    const image = screen.getByAltText('Back to Catalog');
    const text = screen.getByText('Back to Catalog');
    
    expect(navigation).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(image).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('does not render on home page', () => {
    // @ts-ignore
    global.mockUsePathname.mockReturnValue('/');
    
    const { container } = render(<Breadcrumb />);
    
    expect(container.innerHTML).toBe('');
  });

  it('has correct styling classes', () => {
    // @ts-ignore
    global.mockUsePathname.mockReturnValue('/products');
    
    render(<Breadcrumb />);
    
    const navigation = screen.getByRole('navigation');
    const link = screen.getByRole('link');
    
    expect(navigation).toHaveClass('py-4 px-4 md:px-20');
    expect(link).toHaveClass('flex items-center gap-2 text-base text-medium text-secondary hover:text-tertiary');
  });
}); 