import { NextResponse } from "next/server";
import { delay } from "@/utils/endpoint";

const CART_COOKIE = "cart";

export async function DELETE() {
  await delay(1000);
  const res = NextResponse.json([]);
  res.cookies.set(CART_COOKIE, JSON.stringify([]), { path: "/" });
  return res;
} 