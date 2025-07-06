import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const apiKey = process.env.OPENROUTER_API_KEY;
  const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";

  const openrouterRes = await fetch(openrouterUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful and expert AI astrologer. You only answer questions related to astrology, zodiac signs, horoscopes, birth charts, compatibility, and other astrological topics. If the question is not related to astrology, respond by politely saying you can only answer astrology-related queries.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await openrouterRes.json();
  const text =
    data?.choices?.[0]?.message?.content ||
    "No response from OpenRouter.";

  return NextResponse.json({ text });
}
