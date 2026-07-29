import type { NextRequest } from 'next/server';

export type RouteHandler = (req: NextRequest, ctx: HandlerContext) => Promise<Response> | Response;

export type HandlerContext = {
  /** Next.js route params (required for Next.js 16 route handler type compatibility). */
  params?: Promise<Record<string, string | string[] | undefined>>;
  /** Set by `withAuth` — the merchant's Stellar public key. */
  publicKey?: string;
  /** Set by `withCustomerAuth` — the verified customer JWT (opaque, kept for logs). */
  customerToken?: string;
  /** Set by `withCustomerAuth` — the customer's Stellar public key (from JWT `sub`). */
  customerAccount?: string;
  [k: string]: unknown;
};

export type Middleware = (handler: RouteHandler) => RouteHandler;

// Returns a Next.js-compatible handler while keeping the framework context
// opaque until it crosses into the application's typed handler boundary.
export function compose(...middlewares: Middleware[]) {
  return (
    handler: RouteHandler,
  ): ((req: NextRequest, ctx: unknown) => Promise<Response> | Response) => {
    const composed = middlewares.reduceRight((acc, mw) => mw(acc), handler);
    return (req: NextRequest, ctx: unknown) => composed(req, ctx as HandlerContext);
  };
}
