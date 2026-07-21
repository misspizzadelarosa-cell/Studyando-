/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, Bot, User, Sparkles, HelpCircle, RefreshCw, CheckCircle2, 
  XCircle, BookOpen, MessageSquare, AlertCircle, ArrowRight
} from 'lucide-react';
import { PDFDocument } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  questionGenerated?: {
    question: string;
    correctAnswer: string;
    explanation: string;
    communityContext?: string;
  };
}

interface TutorChatProps {
  documents: PDFDocument[];
  selectedWeek: number;
  onWeekChange: (week: number) => void;
  onAskTutor: (question: string, topic: string, week: number, docContent: string) => Promise<{ answer: string }>;
  onGenerateQuestion: (week: number, topic: string, docContent: string) => Promise<{
    question: string;
    correctAnswer: string;
    explanation: string;
    communityContext?: string;
  }>;
  onEvaluateAnswer: (question: string, studentAnswer: string, correctAnswer: string) => Promise<{
    isCorrect: boolean;
    grade: string;
    detailedFeedback: string;
    correctExplanation: string;
  }>;
}

export default function TutorChat({
  documents,
  selectedWeek,
  onWeekChange,
  onAskTutor,
  onGenerateQuestion,
  onEvaluateAnswer
}: TutorChatProps) {
  const currentDoc = documents.find(d => d.week === selectedWeek) || documents[0];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `¡Hola! Soy tu Tutor Clínico de la UCS. Estoy listo para explicarte todo sobre el tema de la Semana ${currentDoc.week}: "${currentDoc.topic}". Puedes hacerme cualquier pregunta, pedirme que te explique un concepto o pedirme que TE HAGA PREGUNTAS de autoevaluación. ¿Qué te gustaría revisar?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsGenerating] = useState(false);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<{
    question: string;
    correctAnswer: string;
    explanation: string;
  } | null>(null);
  const [quizStudentAnswer, setQuizStudentAnswer] = useState('');
  const [isEvaluatingQuiz, setIsEvaluatingQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    isCorrect: boolean;
    grade: string;
    detailedFeedback: string;
    correctExplanation: string;
  } | null>(null);

  const handleSendQuestion = async (textToSend?: string) => {
    const qText = (textToSend || inputQuestion).trim();
    if (!qText || isAsking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: qText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsGenerating(true);

    try {
      const res = await onAskTutor(
        qText,
        currentDoc ? currentDoc.topic : 'Morfofisiopatología Humana I',
        currentDoc ? currentDoc.week : 1,
        currentDoc ? currentDoc.content : ''
      );

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `tutor-err-${Date.now()}`,
        sender: 'tutor',
        text: `Respecto a "${qText}": En el contexto de Morfofisiopatología Humana I, este aspecto evalúa la correlación entre las alteraciones estructurales celulares y las manifestaciones clínicas en la comunidad. Te sugiero revisar las causas, patrones morfológicos y la correlación con los exámenes de laboratorio.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRequestAIQuestion = async () => {
    if (isAsking) return;
    setIsGenerating(true);
    setQuizResult(null);
    setQuizStudentAnswer('');

    try {
      const qRes = await onGenerateQuestion(
        currentDoc ? currentDoc.week : 1,
        currentDoc ? currentDoc.topic : 'Morfofisiopatología',
        currentDoc ? currentDoc.content : ''
      );

      setActiveQuizQuestion({
        question: qRes.question,
        correctAnswer: qRes.correctAnswer,
        explanation: qRes.explanation
      });

      const tutorMsg: ChatMessage = {
        id: `tutor-q-${Date.now()}`,
        sender: 'tutor',
        text: `🎯 **PREGUNTA DE AUTOEVALUACIÓN (Semana ${currentDoc.week})**:\n\n${qRes.question}\n\n*Escribe tu respuesta abajo para que te la evalúe con el criterio estricto de la UCS.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEvaluateQuiz = async () => {
    if (!activeQuizQuestion || !quizStudentAnswer.trim() || isEvaluatingQuiz) return;
    setIsEvaluatingQuiz(true);

    try {
      const evalRes = await onEvaluateAnswer(
        activeQuizQuestion.question,
        quizStudentAnswer,
        activeQuizQuestion.correctAnswer
      );

      setQuizResult(evalRes);

      const feedbackMsg: ChatMessage = {
        id: `tutor-eval-${Date.now()}`,
        sender: 'tutor',
        text: `📝 **EVALUACIÓN DE TU RESPUESTA (${evalRes.grade})**:\n\n${evalRes.detailedFeedback}\n\n💡 **Respuesta Patrón UCS**: ${evalRes.correctExplanation}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, feedbackMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluatingQuiz(false);
    }
  };

  const quickPrompts = [
    `Explícame detalladamente todo sobre ${currentDoc.topic}`,
    `¿Cuáles son las preguntas clave de examen de la Semana ${currentDoc.week}?`,
    `Hazme una pregunta de evaluación sobre este tema`,
    `¿Cómo aplico este contenido en el Consultorio Popular?`
  ];

  return (
    <div id="tutor-chat-container" className="space-y-6">
      
      {/* Header Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase font-mono flex items-center gap-1.5">
            <Bot className="w-4 h-4" /> Tutor Clínico Interactivo UCS
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Aclarar Dudas & Explicaciones Personalizadas
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Interactúa directamente con la IA para estudiar, pedir explicaciones completas o ponerte a prueba.
          </p>
        </div>

        {/* Week Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 uppercase font-mono">Semana:</label>
          <select
            value={selectedWeek}
            onChange={(e) => {
              const wk = Number(e.target.value);
              onWeekChange(wk);
              setActiveQuizQuestion(null);
              setQuizResult(null);
            }}
            className="text-sm font-semibold bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-blue-500 cursor-pointer"
          >
            {documents.map(d => (
              <option key={d.id} value={d.week}>
                Semana {d.week}: {d.topic.slice(0, 35)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
        
        {/* Messages Stream */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[550px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'tutor' && (
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200/60'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isAsking && (
            <div className="flex gap-3 items-center text-slate-500 text-xs font-semibold animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
              <span>El Tutor Clínico está redactando la explicación detallada...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase font-mono flex items-center justify-between">
            <span>Sugerencias rápidas para interactuar:</span>
            <button
              onClick={handleRequestAIQuestion}
              disabled={isAsking}
              className="text-blue-600 hover:text-blue-800 text-xs font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" /> ¡Hazme una pregunta de examen!
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuestion(prompt)}
                disabled={isAsking}
                className="text-xs bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Active AI Quiz Answer Box if question pending */}
        {activeQuizQuestion && (
          <div className="p-4 bg-blue-50 border-t border-blue-200 space-y-3">
            <div className="text-xs font-bold text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Responde a la pregunta del Tutor para recibir calificación:</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={quizStudentAnswer}
                onChange={(e) => setQuizStudentAnswer(e.target.value)}
                placeholder="Escribe tu respuesta clínica aquí..."
                className="flex-1 text-sm bg-white border border-blue-300 rounded-xl px-4 py-2 text-slate-900 focus:outline-blue-600"
              />
              <button
                onClick={handleEvaluateQuiz}
                disabled={!quizStudentAnswer.trim() || isEvaluatingQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isEvaluatingQuiz ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Enviar Respuesta
              </button>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={`Haz una pregunta al Tutor sobre el tema: "${currentDoc.topic}"...`}
              disabled={isAsking}
              className="flex-1 text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-blue-600 font-sans"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || isAsking}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 shadow-md shadow-blue-500/10"
            >
              <Send className="w-4 h-4" />
              Preguntar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
