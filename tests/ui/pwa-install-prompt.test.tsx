import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PwaInstallPrompt } from '@/ui/components/pwa/pwa-install-prompt';

vi.mock('@/ui/hooks/useBeforeInstallPrompt', () => ({
  useBeforeInstallPrompt: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { useBeforeInstallPrompt } from '@/ui/hooks/useBeforeInstallPrompt';

const baseHookReturn = {
  canInstall: false,
  isInstalled: false,
  prompt: vi.fn().mockResolvedValue(undefined),
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  window.sessionStorage.clear();
});

describe('<PwaInstallPrompt>', () => {
  it('renders nothing when the browser cannot install the app', () => {
    vi.mocked(useBeforeInstallPrompt).mockReturnValue(baseHookReturn);
    const { container } = render(<PwaInstallPrompt />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the app is already installed', () => {
    vi.mocked(useBeforeInstallPrompt).mockReturnValue({
      ...baseHookReturn,
      canInstall: true,
      isInstalled: true,
    });
    const { container } = render(<PwaInstallPrompt />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the install banner when the hook reports canInstall', () => {
    vi.mocked(useBeforeInstallPrompt).mockReturnValue({
      ...baseHookReturn,
      canInstall: true,
    });
    render(<PwaInstallPrompt />);
    expect(screen.getByRole('dialog', { name: 'installTitle' })).toBeInTheDocument();
    expect(screen.getByText('installButton')).toBeInTheDocument();
    expect(screen.getByText('dismissButton')).toBeInTheDocument();
  });

  it('hides the banner and remembers dismissal for the session', async () => {
    const user = userEvent.setup();
    vi.mocked(useBeforeInstallPrompt).mockReturnValue({
      ...baseHookReturn,
      canInstall: true,
    });
    const { rerender } = render(<PwaInstallPrompt />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByText('dismissButton'));
    expect(window.sessionStorage.getItem('pwa-install-dismissed')).toBe('1');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // A re-render while still dismissed should remain hidden.
    rerender(<PwaInstallPrompt />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls prompt() when Install is clicked', async () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useBeforeInstallPrompt).mockReturnValue({
      ...baseHookReturn,
      canInstall: true,
      prompt,
    });
    const user = userEvent.setup();
    render(<PwaInstallPrompt />);
    await user.click(screen.getByText('installButton'));
    expect(prompt).toHaveBeenCalled();
  });
});
