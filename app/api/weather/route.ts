import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://barber-one-psi.vercel.app/"
];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
console.log("Received OPTIONS request from origin:", origin);
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  const url = new URL(request.url);

  const date = url.searchParams.get("date");
  const time = url.searchParams.get("time");

  const response = {
    forecast: `Weather forecast for ${date} at ${time} is sunny`,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}