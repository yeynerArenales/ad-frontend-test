import { render, screen, fireEvent } from '@testing-library/react';
import { ProductItem } from './index';
import { mockGames } from '@/test/mocks/games';

describe('ProductItem', () => {
  const mockHandleClick = jest.fn();
  const game = mockGames[0];

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it('renders product item with game information', () => {
    render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    expect(screen.getByAltText(game.name)).toBeInTheDocument();
    expect(screen.getByText(game.name)).toBeInTheDocument();
    expect(screen.getByText(game.genre)).toBeInTheDocument();
    expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
  });

  it('shows "New" badge when game is new', () => {
    render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('New')).toHaveClass(
      'absolute',
      'top-2',
      'left-2',
      'z-10',
      'bg-quaternary',
      'text-secondary',
      'px-2',
      'py-1',
      'rounded',
      'text-base'
    );
  });

  it('does not show "New" badge when game is not new', () => {
    const oldGame = { ...game, isNew: false };
    render(
      <ProductItem
        game={oldGame}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('calls handleOnClick when button is clicked', () => {
    render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('renders with correct styling classes', () => {
    render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass(
      'border-[0.5px]',
      'border-tertiary',
      'rounded-lg',
      'h-[430px]',
      'w-full',
      'p-4',
      'flex',
      'flex-col'
    );

    const image = screen.getByAltText(game.name);
    expect(image).toHaveClass(
      'w-full',
      'h-[240px]',
      'rounded-t-lg',
      'object-cover'
    );

    const genre = screen.getByText(game.genre);
    expect(genre).toHaveClass(
      'text-text-light',
      'text-base',
      'font-bold',
      'uppercase',
      'mt-3'
    );

    const name = screen.getByText(game.name);
    expect(name).toHaveClass(
      'text-secondary',
      'text-lg',
      'font-bold',
      'truncate',
      'max-w-[240px]'
    );

    const price = screen.getByText(`$${game.price}`);
    expect(price).toHaveClass(
      'text-secondary',
      'text-xl',
      'font-bold'
    );
  });

  it('shows correct button text and variant based on isInCart', () => {
    const { rerender } = render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={false}
      />
    );

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Add to cart');

    rerender(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={true}
        isLoading={false}
      />
    );

    expect(screen.getByText('Remove from Cart')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Remove from cart');
  });

  it('disables button and shows loading state', () => {
    render(
      <ProductItem
        game={game}
        handleOnClick={mockHandleClick}
        isInCart={false}
        isLoading={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Add to cart');
  });
}); 