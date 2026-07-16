import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkeletonCard } from '@/ui/components/shared/skeleton-card';

describe('SkeletonCard', () => {
  it('renders a card wrapper with three skeleton bars', () => {
    render(<SkeletonCard />);
    const card = screen.getByTestId('skeleton-card');
    expect(card).toBeInTheDocument();
    expect(card.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3);
  });
});
