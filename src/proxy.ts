import { NextResponse, type NextRequest } from "next/server";

import { supportedLanguages, DEFAULT_LANG } from "./dictionaries";

// Type guard to check if a string is a supported locale
function isSupportedLocale(locale: string): locale is typeof supportedLanguages[number] {
  return (supportedLanguages as readonly string[]).includes(locale);
}

// Get user's preferred locale
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('Accept-Language');
  if (!acceptLanguage) return DEFAULT_LANG;

  // Simple matching logic - can be upgraded to library usage if needed
  const preferredLocales = acceptLanguage.split(',').map(l => l.split(';')[0].trim());

  for (const locale of preferredLocales) {

    // (简化处理) Check for language code match (e.g. 'en-US' matches 'en')
    const langCode = locale.split('-')[0];
    if (isSupportedLocale(langCode)) return langCode;
  }
  return DEFAULT_LANG;
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = supportedLanguages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;

  // 内部重写到 /{lang} 路径
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}