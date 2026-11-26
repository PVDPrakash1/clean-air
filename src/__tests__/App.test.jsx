import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {
  sanitizeUserPrompt,
  calculateCommuteMetrics,
  calculateSustainabilityImpact,
  calculateRecommendedCadr,
} from '../utils/airQualityEngine';

beforeEach(() => {
  Element.prototype.scrollIntoView = () => {};
});

describe('ClearAir AI Core Calculation Engine', () => {
  it('sanitizes control characters, angle brackets, and enforces max length', () => {
    const dirty = '  <script>alert(1)</script> Hello\u0000 World  ';
    const cleaned = sanitizeUserPrompt(dirty, 25);
    expect(cleaned).not.toContain('<');
    expect(cleaned).not.toContain('>');
    expect(cleaned.length).toBeLessThanOrEqual(25);
  });

  it('computes accurate round-trip commute CO2 emissions and savings', () => {
    const metrics = calculateCommuteMetrics(10);
    const metro = metrics.find((m) => m.id === 'metro');
    const car = metrics.find((m) => m.id === 'solo_car');

    expect(metro.co2Kg).toBe('0.64');
    expect(car.co2Kg).toBe('3.50');
    expect(metro.savedVsCar).toBe('2.86');
  });

  it('distinguishes household CO2 avoided and exposure shield percentage', () => {
    const impact = calculateSustainabilityImpact(
      {
        publicTransit: true,
        indoorWorkout: true,
        peakWindowClose: false,
        wetMopping: false,
        noIncenseSmoke: false,
      },
      10
    );

    expect(impact.activeCount).toBe(2);
    expect(impact.exposureReductionPct).toBe(32);
    expect(Number(impact.dailyCo2)).toBeCloseTo(3.16, 2);
  });

  it('calculates HEPA purifier CADR proportional to room area', () => {
    expect(calculateRecommendedCadr(200)).toBe(170);
    expect(calculateRecommendedCadr(400)).toBe(340);
  });
});

describe('ClearAir AI UI, Accessibility & Multilingual Flows', () => {
  it('renders Hyderabad illustrative AQI 185 and updates when switching cities', () => {
    render(<App />);
    expect(screen.getByText('185')).toBeInTheDocument();
    expect(screen.getByText(/Illustrative AQI value, not live monitoring data/i)).toBeInTheDocument();

    const localitySelect = screen.getByLabelText(/Select City Locality/i);
    fireEvent.change(localitySelect, { target: { value: 'delhi_ncr' } });

    expect(screen.getByText('312')).toBeInTheDocument();
    expect(screen.getByText(/Very Unhealthy/i)).toBeInTheDocument();
  });

  it('switches UI language seamlessly between English, Telugu, and Hindi', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Telugu' }));
    expect(screen.getByText(/మీ ప్రాంతపు గాలి నాణ్యత/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Hindi' }));
    expect(screen.getByText(/आपके क्षेत्र की वायु गुणवत्ता/i)).toBeInTheDocument();
  });

  it('navigates accessible WAI-ARIA tabs and interacts with GenAI Family Chat', async () => {
    render(<App />);

    const chatTab = screen.getByRole('tab', { name: /GenAI Family Chat/i });
    fireEvent.click(chatTab);
    expect(chatTab).toHaveAttribute('aria-selected', 'true');

    const input = screen.getByLabelText(/Ask ClearAir AI a question/i);
    fireEvent.change(input, { target: { value: 'Can kids play outside?' } });
    fireEvent.submit(input.closest('form'));

    expect(await screen.findByText(/Current Situation/i)).toBeInTheDocument();
  });
});
