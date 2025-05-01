import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: Request) {
  const body = await req.json();

  if (body.secret !== SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ message: "Full cache cleared" });
}
