import { NextRequest, NextResponse } from "next/server";
import { isDraftMode } from "./lib/isDraftMode";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|studio|robots.txt).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Ignore dev-env and draftMode/preview
  if (process.env.NODE_ENV == "development" || isDraftMode()) return;

  // Get hostName and allowed domains
  const hostname = req.headers.get("host");
  if (!hostname) return new Response(null, { status: 404 });
  // const allowedDomains = await loadDomains();

  // Verify if hostname exist in allowed domains
  // AND first path isn't a domain name - to avoid acces to ex: domain.com/domain/**/*
  // const firstPath = url.pathname.split("/")[1] || "";
  // const isAllowed = allowedDomains?.some((domain) => hostname === domain.domain && firstPath !== domain.domain);
  // if (!isAllowed) return new Response(null, { status: 404 });

  // Rewrite the URL in the dynamic route based in the subdomain
  return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
}
