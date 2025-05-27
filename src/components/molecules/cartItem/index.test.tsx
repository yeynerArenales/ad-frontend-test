import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from './index';
import { mockGames } from '@/test/mocks/games';

describe('CartItem', () => {
  const mockHandleRemove = jest.fn();
  const game = mockGames[0];

  beforeEach(() => {
    mockHandleRemove.mockClear();
  });

  it('renders cart item with game information', () => {
    render(<CartItem game={game} handleRemove={mockHandleRemove} />);

    expect(screen.getByAltText(game.name)).toBeInTheDocument();
    expect(screen.getByText(game.name)).toBeInTheDocument();
    expect(screen.getByText(game.genre)).toBeInTheDocument();
    expect(screen.getByText(game.description)).toBeInTheDocument();
    expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
  });

  it('calls handleRemove when remove button is clicked', () => {
    render(<CartItem game={game} handleRemove={mockHandleRemove} />);

    const removeButtons = screen.getAllByRole('button');
    removeButtons.forEach(button => {
      fireEvent.click(button);
      expect(mockHandleRemove).toHaveBeenCalledWith(game);
    });
  });

  it('renders with correct styling classes', () => {
    render(<CartItem game={game} handleRemove={mockHandleRemove} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass(
      'grid',
      'grid-cols-[1fr_auto]',
      'items-start',
      'gap-4',
      'border-b-[0.5px]',
      'border-tertiary',
      'p-4',
      'md:grid-cols-[1fr_2fr_auto]'
    );

    const image = screen.getByAltText(game.name);
    expect(image).toHaveClass(
      'h-[136px]',
      'w-full',
      'object-cover',
      'md:h-[156px]'
    );

    const genre = screen.getByText(game.genre);
    expect(genre).toHaveClass(
      'text-base',
      'font-bold',
      'uppercase',
      'text-text-light'
    );

    const name = screen.getByText(game.name);
    expect(name).toHaveClass(
      'text-xl',
      'font-bold',
      'text-secondary',
      'truncate'
    );

    const description = screen.getByText(game.description);
    expect(description).toHaveClass(
      'text-base',
      'text-text-light',
      'md:line-clamp-2'
    );

    const price = screen.getByText(`$${game.price}`);
    expect(price).toHaveClass(
      'text-end',
      'text-xl',
      'font-bold',
      'text-secondary'
    );
  });

  it('renders remove buttons with correct visibility classes', () => {
    render(<CartItem game={game} handleRemove={mockHandleRemove} />);

    const removeButtons = screen.getAllByRole('button');
    expect(removeButtons[0]).toHaveClass('md:hidden');
    expect(removeButtons[1]).toHaveClass('hidden', 'md:block');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<CartItem game={game} handleRemove={mockHandleRemove} className={customClass} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass(customClass);
  });
}); 