import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('Header', () => {
  it('renders header with navigation and links', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass(
      'bg-surface',
      'px-4',
      'md:px-20',
      'py-2.5',
      'flex',
      'items-center',
      'justify-between'
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    const homeLink = links[0];
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass('font-bold', 'text-xxl', 'text-text-gray');
    expect(homeLink).toHaveTextContent('GamerShop');

    const cartLink = links[1];
    expect(cartLink).toHaveAttribute('href', '/cart');

    const cartIcon = screen.getByAltText('cart');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute('src', '/icons/cart.svg');
    expect(cartIcon).toHaveAttribute('width', '24');
    expect(cartIcon).toHaveAttribute('height', '24');
  });
}); 