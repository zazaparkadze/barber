import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import User from "@/model/User"

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value as string

    /* const origin = request.headers.get("origin")

  const headers = {
    "Access-Control-Allow-Origin": origin || "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  } */

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
  const foundUser = await User.findOne({ refreshToken }).lean()
  //console.log((decoded as MyJwtPayload).roles)

  if (!foundUser || !decoded) {
    return NextResponse.json(
      {
        message: "unauthorised",
      },
      {
        status: 401,
        statusText: "unauthorised",
      }
    )
  }

  const rolesFromdecoded = Object.values((decoded as MyJwtPayload).roles)
  const rolesFromfoundUser = Object.values(foundUser.roles)

  const rolesNotMatch = rolesFromfoundUser
    .map((element, index) => element === rolesFromdecoded[index])
    .find((value) => value === false)

  if (rolesNotMatch) {
    return NextResponse.json(
      {
        message: "unauthorised",
      },
      {
        status: 401,
        statusText: "unauthorised",
      }
    )
  }

  const accessToken = jwt.sign(
    {
      id: foundUser.id,
      username: foundUser.username,
      roles: foundUser.roles,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1m" }
  )

  const response = NextResponse.json(null, {
    status: 200,
    statusText: "new access token created",
   /*  headers: headers, */
  })

  response.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 5,
    path: "/",
  })
console.log(response)
  return response
  /* 
  const cookieStore = await cookies()
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  })
 */
}
