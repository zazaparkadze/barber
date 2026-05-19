import { NextRequest, NextResponse } from "next/server";
//import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { allowedRoles } from "@/app/config/allowedRoles";
//export const runtime = "nodejs";

interface MyJwtPayload extends JwtPayload {
  roles: {
    root?: number;
    admin?: number;
    editor?: number;
    user: number;
  };
}

export  function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") || 'http://localhost:3000';
  // user's roles from jwt
  const refreshToken = request.cookies.get("refreshToken")?.value as string;
  const accessToken = request.cookies.get("accessToken")?.value as string
  
console.log(accessToken, refreshToken);

 if (!refreshToken || !accessToken) {
    return NextResponse.json(
      { message: "No tokens" },
      { status: 401 }
    )
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const userRoles = (decoded as MyJwtPayload).roles;

    const allowedToSecrets = Object.values(userRoles)
      .map((value) => Object.values(allowedRoles).indexOf(value) !== -1)
      .find((e) => e === true);

    if (!allowedToSecrets) {
      return NextResponse.json(
        { message: "not allowed (MDW), Reason: roles, from allowed-to-secrets" },
        {
          status: 403,
          statusText: "FORBIDDEN (MDW), Reason: roles",
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "not allowed (MDW) from server error", error: error },
      {
        status: 403,
        statusText: "FORBIDDEN (MDW)",
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secret", "/account"],
};