import { render, screen, fireEvent, within } from '@testing-library/react';
import { Dropdown } from './index';

describe('Dropdown', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockSelected = 'Option 1';
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders dropdown with selected option', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText(mockSelected)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows options when clicked', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const list = screen.getByRole('list');
    mockOptions.forEach(option => {
      expect(within(list).getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onSelect when an option is clicked', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const list = screen.getByRole('list');
    const optionToSelect = within(list).getByText('Option 2');
    fireEvent.click(optionToSelect);

    expect(mockOnSelect).toHaveBeenCalledWith('Option 2');
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    fireEvent.mouseDown(document.body);

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
        disabled={true}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
        className={customClass}
      />
    );

    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('applies disabled styles when disabled', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
        disabled={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('highlights selected option in dropdown', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const list = screen.getByRole('list');
    const selectedOption = within(list).getByText(mockSelected);
    expect(selectedOption).toHaveClass('font-semibold');
  });

  it('rotates arrow icon when dropdown is open', () => {
    render(
      <Dropdown
        options={mockOptions}
        selected={mockSelected}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole('button');
    const arrow = screen.getByAltText('Arrow');

    expect(arrow).not.toHaveClass('rotate-180');
    
    fireEvent.click(button);
    expect(arrow).toHaveClass('rotate-180');
  });
}); 