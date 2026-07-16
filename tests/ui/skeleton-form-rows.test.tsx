import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SkeletonFormRows } from '@/ui/components/shared/skeleton-form-rows';

describe('SkeletonFormRows', () => {
  afterEach(cleanup);

  it('renders the default 4 rows plus one button skeleton', () => {
    render(<SkeletonFormRows />);
    const wrapper = screen.getByTestId('skeleton-form-rows');
    expect(wrapper).toBeInTheDocument();
    // 4 rows × 2 bars + 1 button = 9
    expect(wrapper.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(9);
  });

  it('respects the rows and withButton props', () => {
    render(<SkeletonFormRows rows={2} withButton={false} />);
    const wrapper = screen.getByTestId('skeleton-form-rows');
    // 2 rows × 2 bars + 0 button = 4
    expect(wrapper.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(4);
  });
});
