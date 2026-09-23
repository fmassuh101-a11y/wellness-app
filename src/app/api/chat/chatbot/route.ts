import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Eres un asistente especializado en wellness y salud. Ayudas a los usuarios con consejos sobre ejercicio, nutrición, bienestar mental y hábitos saludables. Responde de manera amigable, profesional y en español. Mantén tus respuestas concisas pero útiles."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', response.status, errorData);

      // Handle specific error cases
      if (response.status === 429) {
        // Fallback response for quota exceeded
        const fallbackResponses = [
          "¡Hola! 👋 Aunque el chat con IA no está disponible temporalmente, puedo ofrecerte algunos consejos básicos de wellness:\n\n• 💪 Realiza 30 minutos de ejercicio diario\n• 🥗 Come al menos 5 porciones de frutas y verduras\n• 💧 Bebe 8 vasos de agua al día\n• 😴 Duerme 7-9 horas por noche\n\n¿Hay algo específico en lo que te gustaría enfocarte?",
          "El servicio de chat está temporalmente limitado, pero aquí tienes algunos tips de bienestar:\n\n• 🧘 Practica 5-10 minutos de meditación diaria\n• 🚶 Camina al menos 10,000 pasos\n• 📱 Limita el tiempo de pantalla antes de dormir\n• 🌞 Toma sol por 15-20 minutos al día\n\n¡Explora las otras secciones de la app para más información!",
          "¡No te preocupes! Aunque el chat inteligente no está funcionando, aquí tienes consejos útiles:\n\n• 🏃 Empieza con ejercicios de bajo impacto\n• 🥤 Evita bebidas azucaradas\n• 🤝 Conecta con amigos y familia regularmente\n• 📚 Lee o aprende algo nuevo cada día\n\n¡Visita la anatomía interactiva para aprender sobre músculos!"
        ];

        // Try to provide a relevant response based on keywords
        const lowerMessage = message.toLowerCase();
        let relevantResponse = fallbackResponses[0]; // default

        if (lowerMessage.includes('ejercicio') || lowerMessage.includes('entrenar') || lowerMessage.includes('gym')) {
          relevantResponse = "💪 **Consejos de Ejercicio:**\n\n• Empieza con 20-30 minutos, 3 veces por semana\n• Combina cardio y entrenamiento de fuerza\n• Calienta 5-10 minutos antes de ejercitarte\n• Descansa 1-2 días entre entrenamientos intensos\n\n¡Explora la anatomía interactiva para conocer qué músculos trabajar!";
        } else if (lowerMessage.includes('comida') || lowerMessage.includes('dieta') || lowerMessage.includes('nutricion')) {
          relevantResponse = "🥗 **Consejos de Nutrición:**\n\n• Incluye proteínas en cada comida\n• Come frutas y verduras de colores variados\n• Prefiere alimentos integrales\n• Mantente hidratado (2-3 litros de agua diarios)\n\n¡Una buena nutrición potencia tus entrenamientos!";
        } else if (lowerMessage.includes('dormir') || lowerMessage.includes('sueño') || lowerMessage.includes('descanso')) {
          relevantResponse = "😴 **Consejos para Mejor Descanso:**\n\n• Duerme 7-9 horas cada noche\n• Mantén horarios regulares de sueño\n• Evita pantallas 1 hora antes de dormir\n• Crea un ambiente fresco y oscuro\n\n¡El buen descanso es clave para la recuperación!";
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('ansiedad') || lowerMessage.includes('relajar')) {
          relevantResponse = "🧘 **Manejo del Estrés:**\n\n• Practica respiración profunda (4-7-8)\n• Medita 5-10 minutos diarios\n• Sal a caminar en la naturaleza\n• Habla con amigos o familia\n\n¡Visita nuestra sección de salud mental para más recursos!";
        }

        return NextResponse.json({
          message: relevantResponse
        });
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'invalid_api_key' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'api_error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const botResponse = data.choices?.[0]?.message?.content;

    if (!botResponse) {
      return NextResponse.json(
        { error: 'No se recibió respuesta del asistente' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: botResponse
    });

  } catch (error) {
    console.error('API Route Error:', error);

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}