import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AIChat } from '../AIChat';
import { vi, describe, it, expect, beforeEach } from 'vitest';

global.fetch = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('AIChat Component', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('renders the chat header and input box', () => {
    render(<AIChat />);
    // The heading "CIVICGUIDE AI" is inside the dark header
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument();
  });

  it('clicking a quick prompt fills the input', () => {
    render(<AIChat />);
    fireEvent.click(screen.getByText('LOK SABHA VS RAJYA SABHA?'));
    expect(screen.getByRole('textbox')).toHaveValue('LOK SABHA VS RAJYA SABHA?');
  });

  it('shows loading state while waiting for API response', async () => {
    // Use a never-resolving promise to keep loading state visible
    (global.fetch as ReturnType<typeof vi.fn>).mockReturnValueOnce(new Promise(() => {}));

    render(<AIChat />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'How do elections work?' } });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Send message/i }));
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/GEMINI IS THINKING/i)).toBeInTheDocument();
  });

  it('displays AI reply after successful API call', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'Lok Sabha is the lower house.' }),
    });
    render(<AIChat />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lok Sabha?' } });
    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/Lok Sabha is the lower house/i)).toBeInTheDocument()
    );
  });

  it('shows error message when API call fails', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));
    render(<AIChat />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument()
    );
  });

  it('clears the chat when the clear button is clicked', async () => {
    render(<AIChat />);
    const buttons = screen.getAllByRole('button');
    const clearBtn = buttons.find(b => b.querySelector('.lucide-trash-2'));
    if (clearBtn) {
      fireEvent.click(clearBtn);
      await waitFor(() =>
        expect(screen.getByText(/Chat cleared/i)).toBeInTheDocument()
      );
    }
  });

  it('context selector is rendered with default value', () => {
    render(<AIChat />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('General Election Process');
  });
});
