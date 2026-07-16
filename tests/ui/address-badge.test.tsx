import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AddressBadge } from '@/ui/components/shared/address-badge';

describe('AddressBadge', () => {
  it('truncates a Stellar public key', () => {
    const key = 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    render(<AddressBadge publicKey={key} />);
    expect(screen.getByText(/GABCDE…WXYZ/)).toBeInTheDocument();
  });
});
