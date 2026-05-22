import jwt, { JwtPayload } from "jsonwebtoken"
import { allowedRoles } from "@/app/config/allowedRoles"
import { NextRequest, NextResponse } from "next/server"

interface MyJwtPayload extends JwtPayload {
  roles: {
    root?: number
    admin?: number
    editor?: number
    user: number
  }
}

export function GET(request: NextRequest) {
  const origin = request.headers.get("origin") || "http://localhost:3000"
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value as string

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
    const userRoles = (decoded as MyJwtPayload).roles

    const allowedToSecrets = Object.values(userRoles)
      .map((value) => Object.values(allowedRoles).indexOf(value) !== -1)
      .find((e) => e === true)

    if (!allowedToSecrets) {
      return NextResponse.json(
        {
          message: "not allowed (MDW), Reason: roles, from allowed-to-secrets",
        },
        {
          status: 403,
          statusText: "FORBIDDEN (MDW), Reason: roles",
          headers: headers,
        }
      )
    }

    return NextResponse.json(
      {
        chanels: ["11", "12", "13"],
        origin: request.headers.get("origin") || "http://localhost:3000",
      },
      {
        status: 200,
        statusText: "ok",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    )
  } catch {
    return NextResponse.json(
      {
        message: "not allowed (MDW), Reason: roles, from allowed-to-secrets",
      },
      {
        status: 403,
        statusText: "FORBIDDEN (MDW), Reason: roles",
        headers: headers,
      }
    )
  }
}
