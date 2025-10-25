import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ollama.chat({
      model: "llama3",
      messages: [
        {
          role: "system",
          content: `
You are a fashion e-commerce assistant. 
Only answer questions related to fashion clothing, styles, outfits, brands, or shopping in our store. 
If a question is unrelated to fashion, politely refuse and say you can only help with fashion. 
Keep answers short, simple, and minimal.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      result: response.message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
