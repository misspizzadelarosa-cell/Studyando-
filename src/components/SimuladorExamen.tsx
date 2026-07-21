/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, CheckCircle2, XCircle, AlertCircle, RefreshCw, Send,
  Award, ListOrdered, GraduationCap, ClipboardCheck, MessageCircleCode
} from 'lucide-react';
import { ExamQuestion } from '../types';

interface SimuladorExamenProps {
  questions: ExamQuestion[];
  onEvaluateAnswer: (
    question: string,
    studentAnswer: string,
    correctAnswer: string,
    topicContext?: string
  ) => Promise<{
    isCorrect: boolean;
    grade: string;
    detailedFeedback: string;
    correctExplanation: string;
  }>;
}

export default function SimuladorExamen({
  questions,
  onEvaluateAnswer
}: SimuladorExamenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const [isEvaluating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Evaluation response state
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    grade: string;
    detailedFeedback: string;
    correctExplanation: string;
  } | null>(null);

  // Score stats tracker
  const [scoreStats, setScoreStats] = useState({
    answered: 0,
    correct: 0,
    grades: [] as string[]
  });

  const activeQuestion = questions[currentIdx];

  const handleOptionSelect = (opt: string) => {
    if (evaluationResult) return; // Prevent change after evaluation
    setSelectedOption(opt);
    setStudentAnswer(opt);
  };

  const handleEvaluate = async () => {
    if (!studentAnswer.trim()) return;
    setIsGenerating(true);
    setErrorMsg('');
    setEvaluationResult(null);

    try {
      const evalResult = await onEvaluateAnswer(
        activeQuestion.question,
        studentAnswer,
        activeQuestion.correctAnswer,
        activeQuestion.communityContext
      );

      setEvaluationResult(evalResult);
      
      // Update statistics
      setScoreStats(prev => ({
        answered: prev.answered + 1,
        correct: evalResult.isCorrect ? prev.correct + 1 : prev.correct,
        grades: [...prev.grades, evalResult.grade]
      }));
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al conectar con la IA de evaluación de la UCS. Se muestra la respuesta del patrón oficial.');
      
      // Fallback evaluation if server route or Gemini fails
      const isCorrectSimple = studentAnswer.toLowerCase().includes(activeQuestion.correctAnswer.toLowerCase()) || 
                              (activeQuestion.options && studentAnswer === activeQuestion.correctAnswer);
      
      const fallbackResult = {
        isCorrect: isCorrectSimple,
        grade: isCorrectSimple ? 'SOBRESALIENTE' : 'NECESITA MEJORAR',
        detailedFeedback: 'Evaluación local ejecutada debido a desconexión del servidor. Asegúrese de redactar con el vocabulario exacto del Robbins o Clave Docente.',
        correctExplanation: activeQuestion.explanation
      };
      setEvaluationResult(fallbackResult);
      
      setScoreStats(prev => ({
        answered: prev.answered + 1,
        correct: fallbackResult.isCorrect ? prev.correct + 1 : prev.correct,
        grades: [...prev.grades, fallbackResult.grade]
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    setEvaluationResult(null);
    setStudentAnswer('');
    setSelectedOption(null);
    setErrorMsg('');
    setCurrentIdx((prev) => (prev + 1) % questions.length);
  };

  const handleResetStats = () => {
    setScoreStats({
      answered: 0,
      correct: 0,
      grades: []
    });
    setCurrentIdx(0);
    setEvaluationResult(null);
    setStudentAnswer('');
    setSelectedOption(null);
    setErrorMsg('');
  };

  return (
    <div id="simulador-examen-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left panel: Active Question Card & Answer Input */}
      <div className="lg:col-span-8 space-y-6">
        
        {activeQuestion ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
            
            {/* Header: Question meta details */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  PREGUNTA {currentIdx + 1} DE {questions.length}
                </span>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  Tipo: {
                    activeQuestion.type === 'SELECT_SIMPLE' 
                      ? 'Selección Múltiple' 
                      : activeQuestion.type === 'CLINICO_COMUNITARIO' 
                      ? 'Casos Clínico-Comunitarios (APS)' 
                      : 'Desarrollo Corto / Fisiopatología'
                  }
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400 font-mono">
                UCS Batería Oficial 2024
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h3 className="font-sans font-semibold text-slate-800 text-base md:text-lg leading-relaxed">
                {activeQuestion.question}
              </h3>

              {activeQuestion.communityContext && (
                <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex gap-2.5 text-xs text-slate-600">
                  <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="font-sans">
                    <strong>Foco de Atención Primaria (APS):</strong> {activeQuestion.communityContext}
                  </div>
                </div>
              )}
            </div>

            {/* Answer Selector or Text Area */}
            <div className="space-y-4">
              {activeQuestion.type === 'SELECT_SIMPLE' || activeQuestion.type === 'CLINICO_COMUNITARIO' ? (
                // Multiple Choice rendering
                <div className="space-y-2">
                  {activeQuestion.options?.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const showCorrect = evaluationResult && opt === activeQuestion.correctAnswer;
                    const showWrong = evaluationResult && isSelected && !evaluationResult.isCorrect;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleOptionSelect(opt)}
                        disabled={!!evaluationResult}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between gap-3 ${
                          showCorrect 
                            ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold shadow-xs' 
                            : showWrong
                            ? 'bg-rose-50 border-rose-500 text-rose-950'
                            : isSelected
                            ? 'bg-slate-900 border-slate-900 text-white font-semibold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-sans">{opt}</span>
                        {showCorrect && <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                        {showWrong && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Free text answer rendering for short responses
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 font-mono uppercase block">Tu respuesta escrita (Enfoque directo, sin rodeos):</label>
                  <textarea
                    rows={5}
                    disabled={!!evaluationResult}
                    placeholder="Redacta la fisiopatología, clínica o el abordaje solicitado. Basate estrictamente en los textos y PDF cargados..."
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-blue-500 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white transition-all font-sans"
                  />
                </div>
              )}
            </div>

            {/* Call to action & navigation buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition-all"
              >
                Saltar Pregunta
              </button>

              <div className="flex gap-3">
                {!evaluationResult ? (
                  <button
                    type="button"
                    onClick={handleEvaluate}
                    disabled={isEvaluating || !studentAnswer.trim()}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-40 text-sm shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-blue-300" /> Evaluando...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Evaluar Respuesta con IA
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm active:scale-95 cursor-pointer"
                  >
                    Siguiente Pregunta
                  </button>
                )}
              </div>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="font-sans">{errorMsg}</p>
              </div>
            )}

            {/* Evaluation Response Panel */}
            <AnimatePresence>
              {evaluationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl border space-y-4 text-left ${
                    evaluationResult.isCorrect 
                      ? 'bg-blue-50/50 border-blue-100 text-slate-800' 
                      : 'bg-rose-50/50 border-rose-100 text-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-2 uppercase tracking-wide">
                      <ClipboardCheck className={`w-4 h-4 ${evaluationResult.isCorrect ? 'text-blue-600' : 'text-rose-600'}`} />
                      Resultados del Evaluador UCS
                    </h4>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border ${
                      evaluationResult.isCorrect 
                        ? 'bg-blue-100 text-blue-850 border-blue-200' 
                        : 'bg-rose-100 text-rose-850 border-rose-200'
                    }`}>
                      {evaluationResult.grade}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm leading-relaxed">
                    <p className="text-slate-600 font-sans">
                      <strong>Retroalimentación:</strong> {evaluationResult.detailedFeedback}
                    </p>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1.5 shadow-2xs">
                      <strong className="text-slate-900 text-xs flex items-center gap-1.5 font-sans">
                        <MessageCircleCode className="w-4 h-4 text-blue-500" />
                        Respuesta Fisiopatológica Correcta (Patrón de examen):
                      </strong>
                      <p className="text-slate-500 text-xs italic font-serif leading-relaxed">
                        {evaluationResult.correctExplanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-2xl border border-slate-100">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="font-sans font-bold text-slate-800">Cargar Sílabo para comenzar</h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Por favor, procesa primero todos los documentos en la pestaña de Plan de Choque para habilitar el simulador de exámenes.
            </p>
          </div>
        )}

      </div>

      {/* Right panel: Statistics & Performance metrics */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Progress Card */}
        <div className="bg-slate-950 rounded-2xl p-6 text-white border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-white text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" /> Calificación del Simulador
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Métricas acumuladas del plan de choque de 48 horas en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Respondidas</span>
              <strong className="text-2xl font-bold font-mono text-slate-100">{scoreStats.answered}</strong>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Aprobadas</span>
              <strong className="text-2xl font-bold font-mono text-blue-400">{scoreStats.correct}</strong>
            </div>
          </div>

          {/* Efficiency Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Eficiencia de Estudio</span>
              <span>{scoreStats.answered > 0 ? `${Math.round((scoreStats.correct / scoreStats.answered) * 100)}%` : '0%'}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: scoreStats.answered > 0 ? `${(scoreStats.correct / scoreStats.answered) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* Grade distribution tracker */}
          {scoreStats.grades.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Últimas Calificaciones:</span>
              <div className="flex flex-wrap gap-1">
                {scoreStats.grades.map((gr, idx) => {
                  const grColor = gr === 'SOBRESALIENTE' 
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                    : gr === 'SATISFACTORIO'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30';
                  return (
                    <span key={idx} className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${grColor}`}>
                      {gr.substring(0, 4)}.
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetStats}
              className="w-full text-center text-xs font-semibold py-2 rounded-xl text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              Reiniciar Simulador
            </button>
          </div>
        </div>

        {/* Tip Card */}
        <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-5 space-y-3">
          <h4 className="font-sans font-bold text-amber-950 text-sm flex items-center gap-1.5">
            <AlertCircle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
            ¡Advertencia Clave UCS!
          </h4>
          <p className="text-xs text-amber-900 leading-relaxed font-sans">
            La clave para obtener <strong>SOBRESALIENTE</strong> es mencionar los conceptos biológicos exactos que la cátedra evalúa: <strong>fisiopatología subcelular, etiología</strong> (causa) y su <strong>reacción tisular</strong> correspondiente en la consulta de APS. Evita rodeos literarios o explicaciones superficiales.
          </p>
        </div>

      </div>

    </div>
  );
}
