import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RequireAuth } from '@/ui/components/shared/require-auth';

const replaceMock = vi.fn();

vi.mock('@/ui/hooks/useRequireSession', () => ({
  useRequireSession: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

import { usePathname } from '@/i18n/routing';
import { useRequireSession } from '@/ui/hooks/useRequireSession';

afterEach(() => {
  cleanup();
  replaceMock.mockReset();
});

describe('<RequireAuth>', () => {
  it('renders children during loading (so pages can show their own skeleton)', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'loading', publicKey: null });
    render(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.getByText('secret')).toBeInTheDocument();
    expect(screen.queryByTestId('require-auth-loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('require-auth-cta')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'authenticated', publicKey: 'GABC' });
    render(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.getByText('secret')).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('renders not-connected CTA when unauthenticated and not on a pass-through route', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'unauthenticated', publicKey: null });
    render(
      <RequireAuth>
        <p>secret</p>
      </RequireAuth>,
    );
    expect(screen.getByTestId('require-auth-cta')).toBeInTheDocument();
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });

  it('passes children through on /connect even when unauthenticated', () => {
    vi.mocked(usePathname).mockReturnValue('/connect');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'unauthenticated', publicKey: null });
    render(
      <RequireAuth>
        <p>sign-in UI</p>
      </RequireAuth>,
    );
    expect(screen.getByText('sign-in UI')).toBeInTheDocument();
    expect(screen.queryByTestId('require-auth-cta')).not.toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('passes children through on /connect subroutes too (e.g. /connect/foo)', () => {
    vi.mocked(usePathname).mockReturnValue('/connect/foo');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'unauthenticated', publicKey: null });
    render(
      <RequireAuth>
        <p>sign-in UI</p>
      </RequireAuth>,
    );
    expect(screen.getByText('sign-in UI')).toBeInTheDocument();
  });

  it('redirects authenticated users on /connect to /dashboard (re-auth blocked)', () => {
    vi.mocked(usePathname).mockReturnValue('/connect');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'authenticated', publicKey: 'GABC' });
    render(
      <RequireAuth>
        <p>sign-in UI</p>
      </RequireAuth>,
    );
    // Children render briefly before the effect runs; the auth gate then
    // bounces the user off the sign-in route so a second wallet can't
    // replace the active session.
    expect(replaceMock).toHaveBeenCalledWith('/dashboard');
  });

  it('redirects authenticated users on /connect subroutes too', () => {
    vi.mocked(usePathname).mockReturnValue('/connect/foo');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'authenticated', publicKey: 'GABC' });
    render(
      <RequireAuth>
        <p>sign-in UI</p>
      </RequireAuth>,
    );
    expect(replaceMock).toHaveBeenCalledWith('/dashboard');
  });

  it('does not redirect during loading on /connect', () => {
    vi.mocked(usePathname).mockReturnValue('/connect');
    vi.mocked(useRequireSession).mockReturnValue({ status: 'loading', publicKey: null });
    render(
      <RequireAuth>
        <p>sign-in UI</p>
      </RequireAuth>,
    );
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
