/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, CheckCircle2, ShieldAlert, Award, ArrowRight, 
  BookOpen, Sparkles, Upload, FileUp, Info, ListTodo, Activity
} from 'lucide-react';
import { PDFDocument, ClinicalBlock } from '../types';

interface ChoqueDashboardProps {
  documents: PDFDocument[];
  blocks: ClinicalBlock[];
  processedDocs: string[];
  onProcessAll: () => void;
  isProcessing: boolean;
  onUploadCustomDoc: (title: string, week: number, topic: string, content: string) => void;
}

export default function ChoqueDashboard({
  documents,
  blocks,
  processedDocs,
  onProcessAll,
  isProcessing,
  onUploadCustomDoc
}: ChoqueDashboardProps) {
  const [customTitle, setCustomTitle] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [customWeek, setCustomWeek] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const isFullyProcessed = processedDocs.length >= documents.length;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customTopic || !customContent) return;
    onUploadCustomDoc(customTitle, customWeek, customTopic, customContent);
    setCustomTitle('');
    setCustomTopic('');
    setCustomContent('');
    setShowUploadModal(false);
  };

  return (
    <div id="choque-dashboard-root" className="space-y-8">
      {/* Hero Header */}
      <div id="hero-section" className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg border border-blue-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium uppercase tracking-wider font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse text-blue-400" /> Plan Intensivo de Choque
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white">
            Tutor Clínico UCS <span className="text-blue-400 font-extrabold">48 Horas</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Plataforma interactiva de estudio intensivo de alto rendimiento. Diseñada para procesar la materia de 
            <span className="text-white font-medium"> Morfofisiopatología Humana I</span> y simular exámenes oficiales 
            ajustados al modelo evaluativo y comunitario de la <span className="text-blue-300 font-semibold">Universidad de las Ciencias de la Salud (UCS)</span>.
          </p>

          {!isFullyProcessed && (
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                id="btn-process-all"
                onClick={onProcessAll}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-500/20 text-sm"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analizando Sílabo UCS...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-300" /> Procesar Todos los PDF ({documents.length})
                  </>
                )}
              </button>
              <span className="text-xs text-slate-400 font-mono">
                *Carga la base de datos de 12 clases para desbloquear el diagnóstico de bloques.
              </span>
            </div>
          )}

          {isFullyProcessed && (
            <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold bg-blue-950/50 border border-blue-500/40 rounded-xl px-4 py-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" /> ¡12 Guías Docentes UCS procesadas con éxito!
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: PDF Files status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="font-sans font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Guías de Clase ({documents.length})
              </h3>
              <button
                id="btn-upload-notes"
                onClick={() => setShowUploadModal(true)}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-semibold flex items-center gap-1 border border-blue-100"
              >
                <Upload className="w-3.5 h-3.5" /> Agregar
              </button>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Base curricular de 12 semanas pre-cargada. Haz clic para consultar o agrega apuntes comunitarios adicionales.
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {documents.map((doc) => {
                const isProcessed = processedDocs.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    id={`doc-item-${doc.id}`}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isProcessed 
                        ? 'bg-blue-50/40 border-blue-100 text-slate-800' 
                        : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="text-xs font-mono font-medium text-slate-400">Semana {doc.week} — Tema {doc.week === 1 || doc.week === 2 ? 1 : doc.week <= 5 ? 2 : doc.week <= 7 ? 3 : doc.week <= 12 ? 5 : 5}</p>
                      <h4 className="text-sm font-semibold truncate text-slate-800">{doc.topic}</h4>
                    </div>
                    <div className="flex-shrink-0">
                      {isProcessed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded-full font-mono">
                          Listo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick study metrics */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 shadow-3xs">
            <h4 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-2 uppercase tracking-wide">
              <Activity className="w-4 h-4 text-blue-600" /> Estado de la Batería
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-xs block font-mono">Documentos</span>
                <strong className="text-2xl font-bold text-slate-900 font-mono">
                  {processedDocs.length}/{documents.length}
                </strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-xs block font-mono">Meta UCS</span>
                <strong className="text-2xl font-bold text-slate-900 font-mono">
                  {isFullyProcessed ? '100%' : `${Math.round((processedDocs.length / documents.length) * 100)}%`}
                </strong>
              </div>
            </div>
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 flex gap-2">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>Enfoque Clínico:</strong> El modelo UCS exige respuestas sin rodeos clínicos. El simulador te evaluará con énfasis en Atención Primaria de Salud (APS).
              </p>
            </div>
          </div>
        </div>

        {/* Right column: UCS Blocks Dashboard */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-slate-900 text-lg">
                  Dashboard de Contenidos UCS
                </h3>
                <p className="text-slate-500 text-xs">
                  Plan de estudio recomendado por prioridad diagnóstica de la cátedra de Morfofisiopatología I.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium flex items-center gap-1.5 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Guía de 2 Días (48H)
              </div>
            </div>

            {/* Diagnostic Alert if not processed */}
            <AnimatePresence mode="wait">
              {!isFullyProcessed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-4"
                >
                  <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
                  <div className="max-w-md mx-auto space-y-1">
                    <h4 className="font-sans font-bold text-slate-800">Cargar Material para Diagnóstico</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Para organizar la prioridad de los 4 bloques académicos de la UCS, pulsa el botón "Procesar todos los PDF" arriba para que la Inteligencia Artificial analice el material y lo ordene clínicamente.
                    </p>
                  </div>
                  <button
                    onClick={onProcessAll}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-1 text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    Comenzar Análisis
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Recommended Study Path Header */}
                  <div className="p-4 bg-blue-50/50 border border-blue-200/40 rounded-xl flex gap-3 items-center border-l-4 border-l-blue-500">
                    <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-950">Ruta Recomendada de Choque</h4>
                      <p className="text-xs text-blue-800 leading-relaxed font-sans">
                        Inicia de inmediato por el <strong>Bloque I</strong> (Lesión reversible/irreversible) y el <strong>Bloque II</strong> (Inflamación/Reparación). Ambos son evaluados con prioridad <strong>CRÍTICA</strong> y constituyen el 65% de la nota final teórica y práctica.
                      </p>
                    </div>
                  </div>

                  {/* Block Cards List */}
                  <div className="space-y-4">
                    {blocks.map((block, idx) => {
                      const isCritical = block.priority === 'CRÍTICA';
                      const isAlta = block.priority === 'ALTA';
                      
                      return (
                        <div
                          key={block.id}
                          id={`block-card-${block.id}`}
                          className={`p-5 rounded-xl border text-left transition-all ${
                            isCritical 
                              ? 'border-slate-200 bg-white shadow-xs border-l-4 border-l-rose-500' 
                              : isAlta
                              ? 'border-slate-200 bg-white shadow-xs border-l-4 border-l-amber-500'
                              : 'border-slate-200 bg-slate-50/60'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                                  isCritical 
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                    : isAlta
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                                }`}>
                                  PRIORIDAD {block.priority}
                                </span>
                                <span className="text-slate-400 text-xs font-mono">Orden: #{idx + 1}</span>
                              </div>
                              <h4 className="text-base font-bold text-slate-900">{block.name}</h4>
                            </div>
                            <span className="text-xs font-mono font-semibold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-3xs">
                              Semanas: {block.weeks.join(', ')}
                            </span>
                          </div>

                          <div className="mt-3 space-y-3">
                            <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                              <strong>Objetivo Clínico:</strong> {block.clinicalGoal}
                            </p>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide block">Contenido del bloque:</span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-500">
                                {block.syllabusTopics.map((item, i) => (
                                  <div key={i} className="flex items-start gap-1">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span className="truncate">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Modal to upload custom notes */}
      {showUploadModal && (
        <div id="upload-modal-overlay" className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            id="upload-modal"
            className="bg-white rounded-2xl p-6 max-w-xl w-full border border-slate-200 shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="font-sans font-bold text-slate-900 text-base flex items-center gap-2">
                <FileUp className="w-5 h-5 text-blue-600" />
                Cargar Temas o Apuntes Adicionales
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 font-sans text-xl focus:outline-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Título del Apunte</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Apuntes de Shock y Síndrome de Respuesta..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-blue-500 transition-all font-sans"
                  />
                </div>
                <div className="col-span-1 space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Semana Relacionada</label>
                  <select
                    value={customWeek}
                    onChange={(e) => setCustomWeek(Number(e.target.value))}
                    className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-blue-500 transition-all font-sans font-semibold text-slate-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>Semana {num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Tema Específico</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Fisiopatología del shock séptico, cardiogénico e hipovolémico."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-blue-500 transition-all font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Contenido o Resumen del Apunte</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Pega aquí la información, transcripción del PDF o modelo de clase que deseas que la IA procese e incorpore..."
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-blue-500 transition-all font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/10 active:scale-95"
                >
                  Procesar e Incorporar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
