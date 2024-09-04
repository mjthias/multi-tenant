import { NextRequest, NextResponse } from "next/server";
import { loadDomains } from "./lib/loaders/load.domains";
import { domain } from "./sanity/schema/documents/domain/domain.schema";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Ignore on dev and /studio
  if (process.env.NODE_ENV == "development") return;
  if (url.pathname.startsWith("/studio")) return;

  // Get hostName and allowed domains
  const hostname = req.headers.get("host");
  if (!hostname) return new Response(null, { status: 404 });
  const allowedDomains = await loadDomains();

  // Verify if hostname exist in allowed domains
  // AND first path isn't a domain name
  const firstPath = url.pathname.split("/")[1] || "";
  const isAllowed = allowedDomains.some((domain) => hostname === domain.domain && firstPath !== domain.domain);
  if (!isAllowed) return new Response(null, { status: 404 });

  // Rewrite the URL in the dynamic route based in the subdomain
  return NextResponse.rewrite(new URL(`/${domain}${url.pathname}`, req.url));
}
