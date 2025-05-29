import { NextRequest, NextResponse } from "next/server";
import { Game } from "@/types/game";
import { delay } from "@/utils/endpoint";

const CART_COOKIE = "cart";

export async function GET(req: NextRequest) {
  const cart = req.cookies.get(CART_COOKIE)?.value;
  await delay(500);
  return NextResponse.json(cart ? JSON.parse(cart) : []);
}

export async function POST(req: NextRequest) {
  const game: Game = await req.json();
  const cart = req.cookies.get(CART_COOKIE)?.value;
  let cartItems: Game[] = cart ? JSON.parse(cart) : [];
  cartItems.push(game);  
  await delay(500);
  const res = NextResponse.json(cartItems);
  res.cookies.set(CART_COOKIE, JSON.stringify(cartItems), { path: "/" });
  return res;
}

export async function DELETE(req: NextRequest) {
  const game: Game = await req.json();
  const cart = req.cookies.get(CART_COOKIE)?.value;
  let cartItems: Game[] = cart ? JSON.parse(cart) : [];
  cartItems = cartItems.filter((item) => item.id !== game.id);
  await delay(500);
  const res = NextResponse.json(cartItems);
  res.cookies.set(CART_COOKIE, JSON.stringify(cartItems), { path: "/" });
  return res;
}
