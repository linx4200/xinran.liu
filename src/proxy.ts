import { NextResponse, type NextRequest } from "next/server";


// todo: 测试非定义的 locale 情况

const locales = ['en', 'en-US', 'zh-CN'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) { console.log(request) };

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  // 1. 判断是否已经是中文路径
  if (pathname.startsWith('/cn')) return

  // 2. 如果是英文路径（不带 /cn），则在内部重写到 /en 路径
  // 这样你代码里依然可以用 [lang] 获取 'en'
  return NextResponse.rewrite(new URL(`/en${pathname}`, request.url))

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}