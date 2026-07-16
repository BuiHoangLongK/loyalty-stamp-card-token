export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-violet-600">StampChain</span> · Loyalty Stamp-Card Token
          </div>
          <div className="flex gap-4">
            <span>Stellar Testnet</span>
            <span>·</span>
            <span>AUTH_CLAWBACK · CAP-33</span>
            <span>·</span>
            <span>SEP-7</span>
          </div>
          <div className="text-xs">APAC Hackathon 2026 · Track — Payments &amp; Loyalty</div>
        </div>
      </div>
    </footer>
  );
}
