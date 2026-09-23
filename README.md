# Plataforma de acompañamiento para estudiantes lejos de casa

Proyecto construido en un **hackathon**, con el tiempo contado.

El problema: un estudiante que se va a vivir a otro país pierde de golpe su red
de apoyo. Nadie queda pendiente de cómo está, justo cuando más lo necesita.

---

## Qué tiene

- **Diario personal** — escribir cómo va cada día
- **Seguimiento de ánimo** — ver la evolución en el tiempo, no solo el momento
- **Grupos de apoyo** — conectar con otros en la misma situación
- **Solicitudes de consulta** con profesionales
- **Asistente conversacional** con IA
- Calendario, blog y comunidad

12 pantallas · 8 tablas en base de datos · registro e inicio de sesión

---

## Lo difícil no fue técnico

Fue **el tiempo**. En un hackathon no se puede construir todo, y equivocarse
al decidir qué dejar fuera te deja sin nada que mostrar al final.

Decidimos que el **diario** y el **seguimiento de ánimo** tenían que quedar
completos aunque el resto fuera más básico, porque son el corazón del problema
— todo lo demás es acompañamiento.

Priorizar bajo presión resultó ser una habilidad distinta a programar.

---

## Correr el proyecto

```bash
npm install
cp .env.example .env.local   # y poner las llaves propias
npm run dev
```

## Stack

Next.js 15 · TypeScript · Tailwind · Supabase (Postgres y Auth) · DeepSeek

---

*Hackathon 2025 · Felipe Massuh*
