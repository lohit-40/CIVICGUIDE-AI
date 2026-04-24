import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Quiz } from '../Quiz';

/**
 * @fileoverview Unit tests for the Quiz component.
 * Verifies interactive quiz logic, scoring display, state transitions and accessibility.
 * Button text is verified against the actual component source:
 *  - "NEXT QUESTION" for questions 1-4
 *  - "SEE FINAL RESULTS" for the last question
 *  - "RETAKE QUIZ" on the completion screen
 */

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ hint: 'Mock AI hint for testing' }),
    })
  ) as unknown as typeof fetch;
});

describe('Quiz Component — Rendering', () => {
  it('renders the quiz section landmark', () => {
    render(<Quiz />);
    expect(screen.getByRole('region', { name: /Interactive Election Quiz/i })).toBeInTheDocument();
  });

  it('displays the first question on load', () => {
    render(<Quiz />);
    expect(screen.getByText(/What is the minimum voting age for an Indian citizen/i)).toBeInTheDocument();
  });

  it('displays all 4 answer options for the first question', () => {
    render(<Quiz />);
    expect(screen.getByText('16 Years')).toBeInTheDocument();
    expect(screen.getByText('18 Years')).toBeInTheDocument();
    expect(screen.getByText('21 Years')).toBeInTheDocument();
    expect(screen.getByText('25 Years')).toBeInTheDocument();
  });

  it('shows QUESTION 1 / 5 header initially', () => {
    render(<Quiz />);
    expect(screen.getByText('QUESTION 1 / 5')).toBeInTheDocument();
  });

  it('shows SCORE: 0 on initial render', () => {
    render(<Quiz />);
    expect(screen.getByText('SCORE: 0')).toBeInTheDocument();
  });
});

describe('Quiz Component — Interaction & State', () => {
  it('shows explanation after selecting an option', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('18 Years'));
    // Explanation text includes the amendment year
    expect(screen.getByText(/61st Constitutional Amendment/i)).toBeInTheDocument();
  });

  it('shows CORRECT! feedback when the right answer is chosen', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('18 Years')); // correct answer
    expect(screen.getByText(/🎉 CORRECT!/i)).toBeInTheDocument();
  });

  it('shows WRONG ANSWER feedback when the wrong answer is chosen', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('16 Years')); // wrong answer
    expect(screen.getByText(/💡 WRONG ANSWER/i)).toBeInTheDocument();
  });

  it('increments score when correct answer selected', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('18 Years')); // correct
    expect(screen.getByText('SCORE: 1')).toBeInTheDocument();
  });

  it('does not increment score when wrong answer selected', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('16 Years')); // wrong
    expect(screen.getByText('SCORE: 0')).toBeInTheDocument();
  });

  it('advances to next question after clicking NEXT QUESTION', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByText('18 Years'));
    fireEvent.click(screen.getByText(/NEXT QUESTION/i));
    expect(screen.getByText(/constitutional body.*responsible/i)).toBeInTheDocument();
    expect(screen.getByText('QUESTION 2 / 5')).toBeInTheDocument();
  });
});

describe('Quiz Component — Full Flow & Completion', () => {
  const answerAllAndFinish = () => {
    render(<Quiz />);
    // Q1: "18 Years" correct
    fireEvent.click(screen.getByText('18 Years'));
    fireEvent.click(screen.getByText(/NEXT QUESTION/i));
    // Q2: "Election Commission of India" correct
    fireEvent.click(screen.getByText('Election Commission of India'));
    fireEvent.click(screen.getByText(/NEXT QUESTION/i));
    // Q3: "Electronic Voting Machine (EVM)" correct
    fireEvent.click(screen.getByText('Electronic Voting Machine (EVM)'));
    fireEvent.click(screen.getByText(/NEXT QUESTION/i));
    // Q4: "Voter Verified Paper Audit Trail" correct
    fireEvent.click(screen.getByText('Voter Verified Paper Audit Trail'));
    fireEvent.click(screen.getByText(/NEXT QUESTION/i));
    // Q5 (last): "Immediately after the election schedule is announced" correct
    fireEvent.click(screen.getByText('Immediately after the election schedule is announced'));
    fireEvent.click(screen.getByText(/SEE FINAL RESULTS/i));
  };

  it('shows QUIZ COMPLETE! after finishing all 5 questions', () => {
    answerAllAndFinish();
    expect(screen.getByText(/QUIZ COMPLETE!/i)).toBeInTheDocument();
  });

  it('shows the correct perfect score (5/5) on the results screen', () => {
    answerAllAndFinish();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows RETAKE QUIZ button on completion screen', () => {
    answerAllAndFinish();
    expect(screen.getByText(/RETAKE QUIZ/i)).toBeInTheDocument();
  });

  it('resets to the first question when RETAKE QUIZ is clicked', () => {
    answerAllAndFinish();
    fireEvent.click(screen.getByText(/RETAKE QUIZ/i));
    expect(screen.getByText(/minimum voting age/i)).toBeInTheDocument();
    expect(screen.getByText('SCORE: 0')).toBeInTheDocument();
    expect(screen.getByText('QUESTION 1 / 5')).toBeInTheDocument();
  });
});
