import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

  const groqRes = await fetch(groqUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI astrologer. You must only answer questions related to astrology, such as horoscopes, birth charts, zodiac signs, planetary movements, compatibility, etc. If a user asks something outside of astrology, politely decline and remind them that you're only here for astrology-related queries.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await groqRes.json();
  const text =
    data?.choices?.[0]?.message?.content || "No response from Groq.";

  return NextResponse.json({ text });
}
