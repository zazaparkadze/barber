import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectBD";

export async function GET(request: NextRequest) {
  await connectDB();

  const origin = request.headers.get("origin") || 'http://localhost:3000';
  const refreshToken = (await cookies()).get("refreshToken")?.value as string;
  const accessToken = (await cookies()).get("accessToken")?.value as string;
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH",
  };

  if (!accessToken && !refreshToken) {
    return NextResponse.json(null, {
      status: 200,
      statusText: "NO TOKENS _______nothing to delete",
      headers: headers,
    });
  }
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (foundUser) {
      foundUser.refreshToken = "";
      await foundUser.save();
      const response = NextResponse.json(null, {
        status: 200,
        statusText: "refreshToken deleted in DB",
        headers: headers,
      });
      if (accessToken) response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    } else {
      const response = NextResponse.json(null, {
        status: 200,
        statusText: "refreshToken deleted in DB",
        headers: headers,
      });
      if (accessToken) response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  } catch {
    const response = NextResponse.json(null, {
      status: 200,
      statusText: "nothing to delete",
      headers: headers,
    });
    if (accessToken) response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}