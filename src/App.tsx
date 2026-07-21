/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, GraduationCap, BookOpen, Layers, Award, Sparkles, AlertCircle
} from 'lucide-react';
import { CLINICAL_BLOCKS, PRELOADED_DOCS, PRELOADED_FLASHCARDS, PRELOADED_QUESTIONS } from './data';
import { PDFDocument, Flashcard, ExamQuestion } from './types';
import ChoqueDashboard from './components/ChoqueDashboard';
import ModuloEstudio from './components/ModuloEstudio';
import SimuladorExamen from './components/SimuladorExamen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'estudio' | 'simulador'>('dashboard');
  
  // Dynamic list of documents (preloaded + custom uploaded)
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  // List of processed document IDs
  const [processedDocs, setProcessedDocs] = useState<string[]>([]);
  // Custom uploaded questions or flashcards
  const [customFlashcards, setCustomFlashcards] = useState<Flashcard[]>([]);
  const [customQuestions, setCustomQuestions] = useState<ExamQuestion[]>([]);

  // Simulation loaders
  const [isProcessing, setIsProcessing] = useState(false);

  // Load session states from localStorage on startup
  useEffect(() => {
    try {
      const storedDocs = localStorage.getItem('ucs_documents');
      if (storedDocs) {
        setDocuments(JSON.parse(storedDocs));
      } else {
        setDocuments(PRELOADED_DOCS);
      }

      const storedProcessed = localStorage.getItem('ucs_processed_docs');
      if (storedProcessed) {
        setProcessedDocs(JSON.parse(storedProcessed));
      }

      const storedFlashcards = localStorage.getItem('ucs_custom_flashcards');
      if (storedFlashcards) {
        setCustomFlashcards(JSON.parse(storedFlashcards));
      }

      const storedQuestions = localStorage.getItem('ucs_custom_questions');
      if (storedQuestions) {
        setCustomQuestions(JSON.parse(storedQuestions));
      }
    } catch (e) {
      console.error("Error al cargar sesión de localStorage:", e);
      // Fallback to defaults
      setDocuments(PRELOADED_DOCS);
    }
  }, []);

  // Save states to localStorage when updated
  const saveDocumentsToStorage = (updatedDocs: PDFDocument[]) => {
    localStorage.setItem('ucs_documents', JSON.stringify(updatedDocs));
  };

  const handleProcessAll = () => {
    setIsProcessing(true);
    // Simulate high-performance medical AI scan of all files (12 documents)
    setTimeout(() => {
      const allIds = documents.map(d => d.id);
      setProcessedDocs(allIds);
      localStorage.setItem('ucs_processed_docs', JSON.stringify(allIds));
      setIsProcessing(false);
    }, 2000);
  };

  const handleUploadCustomDoc = (title: string, week: number, topic: string, content: string) => {
    const newDoc: PDFDocument = {
      id: `custom-doc-${Date.now()}`,
      title,
      week,
      topic,
      summary: `Documento personalizado cargado por el estudiante. Tema de estudio sobre: ${topic}.`,
      content
    };

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    saveDocumentsToStorage(updated);

    // Auto-process custom uploaded doc
    setProcessedDocs(prev => {
      const next = [...prev, newDoc.id];
      localStorage.setItem('ucs_processed_docs', JSON.stringify(next));
      return next;
    });
  };

  // API Call: Generate personalized study material using Gemini
  const handleGenerateStudyMaterial = async (week: number, topic: string, content: string) => {
    const response = await fetch('/api/gemini/generate-study', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ week, topic, docContent: content })
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Ocurrió un error en el servidor del Tutor UCS');
    }
    return response.json();
  };

  // API Call: Evaluate answer using Gemini
  const handleEvaluateAnswer = async (
    question: string,
    studentAnswer: string,
    correctAnswer: string,
    topicContext?: string
  ) => {
    const response = await fetch('/api/gemini/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, studentAnswer, correctAnswer, topicContext })
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Ocurrió un error al calificar la respuesta');
    }
    return response.json();
  };

  const allFlashcards = [...PRELOADED_FLASHCARDS, ...customFlashcards];
  const allQuestions = [...PRELOADED_QUESTIONS, ...customQuestions];

  return (
    <div id="app-wrapper" className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-950">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 hidden md:flex flex-col text-slate-300">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">TC</div>
            <h1 className="font-bold text-white tracking-tight text-base">Tutor Clínico UCS</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Intensivo 48h Activo
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <button
            id="sidebar-tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full p-3 rounded-xl cursor-pointer flex items-center gap-3 text-sm font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Plan de Choque
          </button>
          <button
            id="sidebar-tab-estudio"
            onClick={() => setActiveTab('estudio')}
            className={`w-full p-3 rounded-xl cursor-pointer flex items-center gap-3 text-sm font-semibold transition-all ${
              activeTab === 'estudio'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Módulo de Estudio
          </button>
          <button
            id="sidebar-tab-simulador"
            onClick={() => setActiveTab('simulador')}
            className={`w-full p-3 rounded-xl cursor-pointer flex items-center gap-3 text-sm font-semibold transition-all ${
              activeTab === 'simulador'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Simulador UCS
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/60">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">PROGRESO GLOBAL</p>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-2xl font-mono font-bold text-white">
                {documents.length > 0 ? Math.round((processedDocs.length / documents.length) * 100) : 0}%
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {documents.length > 0 ? Math.round((processedDocs.length / documents.length) * 48) : 0}/48 horas
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${documents.length > 0 ? (processedDocs.length / documents.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Layout Pane */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 md:hidden">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">TC</div>
              <h2 className="text-sm font-bold text-slate-900">Tutor UCS</h2>
            </div>
            <h2 className="text-base font-bold text-slate-800 hidden md:block">
              {activeTab === 'dashboard' && 'Dashboard de Prioridad Clínica'}
              {activeTab === 'estudio' && 'Temarios y Personalización con IA'}
              {activeTab === 'simulador' && 'Evaluación y Simulador Fisiopatológico'}
            </h2>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase border border-slate-200/60 font-mono">
              Batería UCS 2024
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Navigation Tabs for Mobile View (hidden on Desktop) */}
            <nav className="flex md:hidden gap-0.5 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
              <button
                id="mobile-tab-dashboard"
                onClick={() => setActiveTab('dashboard')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-sans transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-white text-blue-600 shadow-3xs' 
                    : 'text-slate-500'
                }`}
              >
                Plan 48H
              </button>
              <button
                id="mobile-tab-estudio"
                onClick={() => setActiveTab('estudio')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-sans transition-all ${
                  activeTab === 'estudio' 
                    ? 'bg-white text-blue-600 shadow-3xs' 
                    : 'text-slate-500'
                }`}
              >
                Estudio
              </button>
              <button
                id="mobile-tab-simulador"
                onClick={() => setActiveTab('simulador')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-sans transition-all ${
                  activeTab === 'simulador' 
                    ? 'bg-white text-blue-600 shadow-3xs' 
                    : 'text-slate-500'
                }`}
              >
                Simulador
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 hidden sm:inline-block">
                Mayo 2024
              </span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-200 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
                MD
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Pane */}
        <main className="flex-1 p-4 md:p-8">
          
          {activeTab === 'dashboard' && (
            <ChoqueDashboard
              documents={documents}
              blocks={CLINICAL_BLOCKS}
              processedDocs={processedDocs}
              onProcessAll={handleProcessAll}
              isProcessing={isProcessing}
              onUploadCustomDoc={handleUploadCustomDoc}
            />
          )}

          {activeTab === 'estudio' && (
            <ModuloEstudio
              blocks={CLINICAL_BLOCKS}
              documents={documents}
              flashcards={allFlashcards}
              onGenerateStudyMaterial={handleGenerateStudyMaterial}
            />
          )}

          {activeTab === 'simulador' && (
            <SimuladorExamen
              questions={allQuestions}
              onEvaluateAnswer={handleEvaluateAnswer}
            />
          )}

        </main>

        {/* System Status Footer */}
        <footer className="h-12 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between px-6 py-2 sm:py-0 text-[10px] text-slate-400 font-mono gap-1 mt-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gemini 3.5 Engine: ONLINE</span>
          </div>
          <span>© 2026 Tutor Clínico UCS - Optimizador de Aprendizaje Acelerado</span>
        </footer>

      </div>

    </div>
  );
}
