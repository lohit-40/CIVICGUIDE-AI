import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from '../Timeline';

/**
 * @fileoverview Unit tests for the Timeline component.
 * Verifies rendering, accessibility (ARIA attributes), and interactive behavior.
 */

describe('Timeline Component', () => {
  it('renders the component heading', () => {
    render(<Timeline />);
    // Check for section landmark
    expect(screen.getByRole('region', { name: /Election Timeline/i })).toBeInTheDocument();
  });

  it('renders all 4 timeline phases as tabs', () => {
    render(<Timeline />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
  });

  it('shows phase 1 content (Voter Registration) by default', () => {
    render(<Timeline />);
    // Phase 1 title visible in the panel
    expect(screen.getByText(/Voter Registration/i)).toBeInTheDocument();
  });

  it('changes the active phase when a tab is clicked', () => {
    render(<Timeline />);
    const tabs = screen.getAllByRole('tab');

    // Initially, tab 0 is selected
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    // Click tab 2 (Election Notification)
    fireEvent.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');

    // The panel should now show the Election Notification content
    expect(screen.getByText(/Model Code of Conduct/i)).toBeInTheDocument();
  });

  it('has accessible tablist and tabpanel semantics', () => {
    render(<Timeline />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('first tab is focused/selected by default', () => {
    render(<Timeline />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });
});
