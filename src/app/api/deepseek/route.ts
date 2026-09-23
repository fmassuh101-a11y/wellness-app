import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // La llave NO va escrita acá: se lee de las variables de entorno.
    // Estaba pegada en el código y este proyecto es público, así que
    // cualquiera que viera el repositorio podía usarla y gastar el saldo.
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "Falta DEEPSEEK_API_KEY en el entorno" },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "⚠️ No reply from DeepSeek";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("DeepSeek API error:", err);
    return NextResponse.json(
      { reply: "Error: Could not connect to DeepSeek API." },
      { status: 500 }
    );
  }
}

