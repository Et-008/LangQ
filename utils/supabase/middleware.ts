import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const cspHeader = `
    default-src 'self';
    connect-src 'self' https://api.chanty.com https://ymsreanckxyrthosfqiq.supabase.co;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: ${
      process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
    };
    style-src 'self' 'unsafe-inline' https://fonts.cdnfonts.com;
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.cdnfonts.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, " ")
      .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue
    );

    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue
    );

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // protected routes
    // if (request.nextUrl.pathname.startsWith("/projects") && user.error) {
    //   return NextResponse.redirect(new URL("/sign-in", request.url));
    // }

    // if (request.nextUrl.pathname === "/" && !user.error) {
    //   return NextResponse.redirect(new URL("/projects", request.url));
    // }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
