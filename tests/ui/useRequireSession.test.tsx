import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRequireSession } from '@/ui/hooks/useRequireSession';

vi.mock('@/ui/hooks/useSession', () => ({
  useSession: vi.fn(),
}));

import { useSession } from '@/ui/hooks/useSession';

describe('useRequireSession', () => {
  it('reports loading initially when session is loading', () => {
    vi.mocked(useSession).mockReturnValue({
      session: { publicKey: null },
      loading: true,
      refresh: vi.fn(),
      logout: vi.fn(),
    });
    const { result } = renderHook(() => useRequireSession());
    expect(result.current).toEqual({
      status: 'loading',
      publicKey: null,
    });
  });

  it('reports unauthenticated when loading is done and no publicKey', () => {
    vi.mocked(useSession).mockReturnValue({
      session: { publicKey: null },
      loading: false,
      refresh: vi.fn(),
      logout: vi.fn(),
    });
    const { result } = renderHook(() => useRequireSession());
    expect(result.current.status).toBe('unauthenticated');
  });

  it('reports authenticated with publicKey when present', () => {
    vi.mocked(useSession).mockReturnValue({
      session: { publicKey: 'GABC' },
      loading: false,
      refresh: vi.fn(),
      logout: vi.fn(),
    });
    const { result } = renderHook(() => useRequireSession());
    expect(result.current).toEqual({ status: 'authenticated', publicKey: 'GABC' });
  });
});
