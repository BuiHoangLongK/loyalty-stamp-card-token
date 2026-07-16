import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkeletonDetail } from '@/ui/components/shared/skeleton-detail';

describe('SkeletonDetail', () => {
  it('renders a centered detail skeleton with 5 inner bars', () => {
    render(<SkeletonDetail />);
    const wrapper = screen.getByTestId('skeleton-detail');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(5);
  });
});
