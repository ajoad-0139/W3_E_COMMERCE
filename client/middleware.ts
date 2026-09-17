
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const API_URL = "https://api.escuelajs.co/api/v1";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  // No tokens → login
  if (!accessToken || !refreshToken) {
    return redirectToLogin(request);
  }

  try {
    // 1. Validate current access token
    const profileResponse = await fetch(
      `${API_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    // Access token is valid
    if (profileResponse.ok) {
      return NextResponse.next();
    }

    // Access token is invalid/expired
    if (profileResponse.status !== 401) {
      return redirectToLogin(request);
    }

    // 2. Try refreshing the tokens
    const refreshResponse = await fetch(
      `${API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
        cache: "no-store",
      }
    );

    if (!refreshResponse.ok) {
      return redirectToLogin(request);
    }

    const refreshData = await refreshResponse.json();

    const newAccessToken = refreshData.access_token;
    const newRefreshToken = refreshData.refresh_token;

    if (!newAccessToken || !newRefreshToken) {
      return redirectToLogin(request);
    }

    // 3. Validate the new access token
    const newProfileResponse = await fetch(
      `${API_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!newProfileResponse.ok) {
      return redirectToLogin(request);
    }

    // 4. Continue request and update cookies
    const response = NextResponse.next();

    response.cookies.set({
      name: ACCESS_TOKEN_KEY,
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set({
      name: REFRESH_TOKEN_KEY,
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Authentication validation failed:", error);

    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);

  loginUrl.searchParams.set(
    "redirect",
    request.nextUrl.pathname
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout/:path*"],
};

