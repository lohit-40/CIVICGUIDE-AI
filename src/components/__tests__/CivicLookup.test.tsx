import { render, screen, fireEvent } from '@testing-library/react';
import { CivicLookup } from '../CivicLookup';
import { describe, it, expect } from 'vitest';

describe('CivicLookup Component', () => {
  it('renders the Official Voter Resources heading', () => {
    render(<CivicLookup />);
    expect(screen.getByRole('heading', { name: /official voter resources/i })).toBeInTheDocument();
  });

  it('renders all three ECI portal links', () => {
    render(<CivicLookup />);
    expect(screen.getByRole('link', { name: /search electoral roll/i })).toHaveAttribute('href', 'https://electoralsearch.eci.gov.in/');
    expect(screen.getByRole('link', { name: /voter service portal/i })).toHaveAttribute('href', 'https://voters.eci.gov.in/');
    expect(screen.getByRole('link', { name: /know your candidate/i })).toHaveAttribute('href', expect.stringContaining('play.google.com'));
  });

  it('ECI links open in a new tab with noopener noreferrer', () => {
    render(<CivicLookup />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('shows placeholder text when pincode is too short', () => {
    render(<CivicLookup />);
    expect(screen.getByText(/type a location above/i)).toBeInTheDocument();
    expect(screen.queryByTitle('Local Area Map')).not.toBeInTheDocument();
  });

  it('shows the map iframe after entering 4+ characters in pincode', () => {
    render(<CivicLookup />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '11001' } });
    expect(screen.getByTitle('Local Area Map')).toBeInTheDocument();
  });

  it('pincode input has an accessible label', () => {
    render(<CivicLookup />);
    const input = screen.getByLabelText(/enter pincode or city/i);
    expect(input).toBeInTheDocument();
  });
});
