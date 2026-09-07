import { NextResponse } from "next/server";

const FRANKFURTER_API = "https://api.frankfurter.dev/v2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from")?.toUpperCase();
  const to = searchParams.get("to")?.toUpperCase();

  if (!from || !to) {
    return NextResponse.json(
      { error: "Both 'from' and 'to' currencies are required." },
      { status: 400 },
    );
  }

  if (from === to) {
    return NextResponse.json({
      from,
      to,
      rate: 1,
    });
  }

  try {
    const response = await fetch(
      `${FRANKFURTER_API}/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch exchange rate." },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      date?: string;
      base?: string;
      quote?: string;
      rate?: number;
    };

    if (
      typeof data.rate !== "number" ||
      !Number.isFinite(data.rate)
    ) {
      return NextResponse.json(
        { error: "Invalid exchange rate received." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      date: data.date ?? null,
      from: data.base ?? from,
      to: data.quote ?? to,
      rate: data.rate,
    });
  } catch {
    return NextResponse.json(
      { error: "Exchange rate service is temporarily unavailable." },
      { status: 503 },
    );
  }
}