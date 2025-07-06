import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const geminiRes = await fetch(geminiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert AI astrologer. Answer only astrology-related questions like horoscopes, birth charts, zodiac signs, predictions, compatibility, etc. If the user asks about anything unrelated to astrology, politely say you can only answer astrology-related questions.`
            }
          ]
        },
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    }),
  });

  const data = await geminiRes.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  return NextResponse.json({ text });
}
