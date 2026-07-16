import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useBeforeInstallPrompt } from '@/ui/hooks/useBeforeInstallPrompt';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  platforms: string[];
};

function makeDeferred() {
  const ev = new Event('beforeinstallprompt') as BeforeInstallPromptEvent;
  ev.prompt = vi.fn().mockResolvedValue(undefined);
  ev.userChoice = Promise.resolve({ outcome: 'accepted' as const, platform: 'web' });
  ev.platforms = ['web'];
  // preventDefault is on the base Event prototype in jsdom; spy on it
  vi.spyOn(ev, 'preventDefault');
  return ev;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useBeforeInstallPrompt', () => {
  it('starts in the initial state', () => {
    const { result } = renderHook(() => useBeforeInstallPrompt());
    expect(result.current.canInstall).toBe(false);
    expect(result.current.isInstalled).toBe(false);
    expect(typeof result.current.prompt).toBe('function');
  });

  it('flips canInstall to true on beforeinstallprompt and calls preventDefault', () => {
    const { result } = renderHook(() => useBeforeInstallPrompt());
    const ev = makeDeferred();

    act(() => {
      window.dispatchEvent(ev);
    });

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(result.current.canInstall).toBe(true);
  });

  it('clears canInstall after prompt() resolves', async () => {
    const { result } = renderHook(() => useBeforeInstallPrompt());
    const ev = makeDeferred();

    act(() => {
      window.dispatchEvent(ev);
    });

    await act(async () => {
      await result.current.prompt();
    });

    expect(ev.prompt).toHaveBeenCalled();
    expect(result.current.canInstall).toBe(false);
  });

  it('marks isInstalled when the appinstalled event fires', () => {
    const { result } = renderHook(() => useBeforeInstallPrompt());

    act(() => {
      window.dispatchEvent(new Event('appinstalled'));
    });

    expect(result.current.isInstalled).toBe(true);
    expect(result.current.canInstall).toBe(false);
  });
});
