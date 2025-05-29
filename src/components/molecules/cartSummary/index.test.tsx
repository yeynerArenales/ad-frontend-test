import { render, screen } from '@testing-library/react';
import { CartSummary } from './index';
import { mockGames } from '@/test/mocks/games';

describe('CartSummary', () => {
  it('renders cart summary with products', () => {
    render(<CartSummary products={mockGames} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('2 Items')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
  });

  it('displays correct item count', () => {
    render(<CartSummary products={mockGames} />);
    expect(screen.getByText('2 Items')).toBeInTheDocument();

    render(<CartSummary products={[mockGames[0]]} />);
    expect(screen.getByText('1 Item')).toBeInTheDocument();
  });

  it('displays all products with their names and prices', () => {
    render(<CartSummary products={mockGames} />);

    mockGames.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$ ${product.price}`)).toBeInTheDocument();
    });
  });

  it('calculates and displays correct total', () => {
    render(<CartSummary products={mockGames} />);
    
    const total = mockGames.reduce((acc, product) => acc + product.price, 0).toFixed(2);
    expect(screen.getByText(`$ ${total}`)).toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    render(<CartSummary products={mockGames} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass(
      'py-8',
      'px-4',
      'rounded-lg',
      'border-[0.5px]',
      'border-tertiary',
      'w-full',
      'min-h-[342px]',
      'md:min-h-[366px]',
      'flex',
      'flex-col',
      'justify-between'
    );

    const heading = screen.getByText('Order Summary');
    expect(heading).toHaveClass('text-xxl', 'font-bold', 'text-secondary');

    const total = screen.getByText('Order Total');
    expect(total).toHaveClass('text-xl', 'text-secondary', 'font-bold');
  });

  it('renders empty cart correctly', () => {
    render(<CartSummary products={[]} />);

    expect(screen.getByText('0 Items')).toBeInTheDocument();
    expect(screen.getByText('$ 0.00')).toBeInTheDocument();
  });
}); 