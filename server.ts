import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Gemini API client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La variable de entorno GEMINI_API_KEY no está configurada. Por favor, configúrela en la sección Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint to generate customized high-yield study material
app.post("/api/gemini/generate-study", async (req, res) => {
  try {
    const { week, topic, docContent } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Eres un Tutor Clínico UCS de élite. Tu función es entrenar a estudiantes de medicina integral comunitaria para un examen de choque de 48 horas bajo el modelo evaluativo estricto de la Universidad de las Ciencias de la Salud (UCS) en Venezuela.
Aborda los temas directamente, con alto rigor científico pero enfoque sumamente directo (sin rodeos, sin introducciones vacías, sin paréntesis innecesarios).
Debes integrar siempre el enfoque de Atención Primaria de Salud (APS), el abordaje comunitario en el Consultorio Popular y el diagnóstico oportuno en el Barrio Adentro.
Devuelve los resultados obligatoriamente bajo el esquema JSON solicitado.`;

    const prompt = `Analiza la siguiente información de estudio correspondiente a la Semana ${week} de la asignatura Morfofisiopatología Humana I:
Tema: "${topic}"
Contenido del Documento: "${docContent}"

Genera:
1. Una síntesis clave directa (sintesis): detallando fisiopatología, clínica y abordaje comunitario (máximo 4 párrafos compactos y densos).
2. Puntos Focalizados UCS (puntosFocalizados): una lista de 4 aspectos clave de alto rendimiento que suelen preguntar en los exámenes teóricos o prácticos de la UCS (ej: diagnóstico diferencial, clasificaciones, correlaciones clínicas).
3. 3 flashcards interactivas de memorización rápida (flashcards) con preguntas directas, respuestas directas de alto impacto y explicaciones fisiopatológicas.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sintesis: {
              type: Type.STRING,
              description: "Síntesis clave directa detallando fisiopatología, clínica y el abordaje comunitario de APS en español."
            },
            puntosFocalizados: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 4 puntos clave focales que se evalúan con alta frecuencia en exámenes de la UCS."
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "Pregunta directa de autoevaluación" },
                  answer: { type: Type.STRING, description: "Respuesta de alto impacto y High-Yield" },
                  explanation: { type: Type.STRING, description: "Explicación científica abreviada del porqué clínico" }
                },
                required: ["question", "answer", "explanation"]
              },
              description: "Lista de 3-4 flashcards interactivas estructuradas"
            }
          },
          required: ["sintesis", "puntosFocalizados", "flashcards"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No se recibió respuesta válida del modelo de IA.");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Error en generate-study:", error);
    res.status(500).json({ error: error.message || "Error al generar material de estudio" });
  }
});

// Endpoint to evaluate exam responses
app.post("/api/gemini/evaluate-answer", async (req, res) => {
  try {
    const { question, studentAnswer, correctAnswer, topicContext } = req.body;
    const ai = getGenAI();

    const systemInstruction = `Eres un evaluador y Tutor Clínico de la Universidad de las Ciencias de la Salud (UCS) en Venezuela.
Tu tarea es calificar las respuestas escritas por los estudiantes a preguntas de exámenes teóricos y prácticos de Morfofisiopatología Humana I.
Debes basar tu evaluación estrictamente en los conceptos médicos correctos y el enfoque clínico-comunitario de Atención Primaria de Salud (APS).
Sé estricto pero constructivo. Califica con una escala cualitativa: SOBRESALIENTE, SATISFACTORIO, o NECESITA MEJORAR.
Explica detalladamente la respuesta correcta médica y cómo se relaciona con la práctica clínica comunitaria en el consultorio popular.`;

    const prompt = `Pregunta del Examen: "${question}"
Respuesta esperada o patrón de referencia: "${correctAnswer || "Basarse en el conocimiento clínico estándar de Morfofisiopatología Humana I"}"
Contexto del Tema: "${topicContext || ""}"

Respuesta dada por el estudiante: "${studentAnswer}"

Evalúa la respuesta del estudiante y proporciona:
1. isCorrect: boolean (true si capta la esencia conceptual correcta, false si es incorrecta o divaga).
2. grade: string (escala UCS: "SOBRESALIENTE", "SATISFACTORIO", "NECESITA MEJORAR").
3. detailedFeedback: retroalimentación compacta, clara y sin rodeos, fundamentando la fisiopatología, clínica y el abordaje de APS.
4. correctExplanation: justificación estricta de la respuesta correcta según la literatura de la asignatura (Robbins, etc.).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: {
              type: Type.BOOLEAN,
              description: "Indica si la respuesta del alumno es conceptualmente correcta."
            },
            grade: {
              type: Type.STRING,
              description: "Calificación cualitativa: SOBRESALIENTE, SATISFACTORIO, o NECESITA MEJORAR"
            },
            detailedFeedback: {
              type: Type.STRING,
              description: "Retroalimentación científica detallada y constructiva, integrando fisiopatología y APS en el Barrio Adentro."
            },
            correctExplanation: {
              type: Type.STRING,
              description: "Explicación formal rigurosa de la respuesta correcta del patrón."
            }
          },
          required: ["isCorrect", "grade", "detailedFeedback", "correctExplanation"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No se recibió respuesta del modelo evaluador.");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Error en evaluate-answer:", error);
    res.status(500).json({ error: error.message || "Error al evaluar respuesta" });
  }
});

// Configure Vite and static assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
