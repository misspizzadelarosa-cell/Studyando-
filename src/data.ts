/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PDFDocument, ClinicalBlock, Flashcard, ExamQuestion } from './types';

export const CLINICAL_BLOCKS: ClinicalBlock[] = [
  {
    id: 'block-1',
    name: 'Bloque I: Introducción y Lesión Celular',
    priority: 'CRÍTICA',
    weeks: [1, 2, 3, 4, 5],
    clinicalGoal: 'Dominar la fisiopatología celular de la lesión reversible/irreversible, muerte celular (necrosis/apoptosis), acumulaciones patológicas (aterosclerosis, diabetes) e interpretación de biomarcadores enzimáticos.',
    syllabusTopics: [
      'Semana 1: Conceptos básicos de la Morfofisiopatología (Etiología, Patogenia, Patocronía).',
      'Semana 2: Métodos de estudio diagnósticos (Muestras, Biopsias, Imagenología y Laboratorio Clínico).',
      'Semana 3: Adaptación celular (Atrofia, Hipertrofia, Hiperplasia, Metaplasia) e Hipoxia.',
      'Semana 4: Lesión reversible (Tumefacción, Esteatosis) e irreversible (Necrosis, Apoptosis).',
      'Semana 5: Acumulaciones intracelulares, Aterosclerosis, Diabetes Mellitus y Calcificaciones.'
    ]
  },
  {
    id: 'block-2',
    name: 'Bloque II: Respuesta Tisular (Inflamación y Reparación)',
    priority: 'CRÍTICA',
    weeks: [6, 7],
    clinicalGoal: 'Diferenciar las fases vasculares y celulares de la respuesta inflamatoria, mediadores químicos, patrones morfológicos y el proceso de reparación (cicatrización vs regeneración) con su enfoque comunitario en el Barrio Adentro.',
    syllabusTopics: [
      'Semana 6: Inflamación Aguda y Crónica. Cambios vasculares, fenómenos leucocitarios (fagocitosis) y patrones de exudado.',
      'Semana 7: Reparación Tisular (Regeneración parenquimatosa vs Cicatrización). Fases, curación por 1ra/2da intención y complicaciones (queloides, dehiscencias).'
    ]
  },
  {
    id: 'block-3',
    name: 'Bloque III: Genética Médica Básica y Mendeliana',
    priority: 'ALTA',
    weeks: [8, 9],
    clinicalGoal: 'Analizar la transmisión de simples mutaciones génicas bajo leyes de Mendel, la confección de árboles genealógicos y la identificación de interferencias biológicas como la impronta y la herencia mitocondrial.',
    syllabusTopics: [
      'Semana 8: Enfermedades monogénicas. Patrones de herencia mendeliana (Autosómica Dominante/Recesiva, Ligada al X). Árbol genealógico.',
      'Semana 9: Interferencias biológicas (Herencia mitocondrial, Impronta genómica, Disomías uniparentales, Mosaicismo) y bases bioquímicas.'
    ]
  },
  {
    id: 'block-4',
    name: 'Bloque IV: Genética Médica Avanzada, Poblacional y Bioética',
    priority: 'MODERADA',
    weeks: [10, 11, 12],
    clinicalGoal: 'Diagnosticar aberraciones cromosómicas estructurales/numéricas, aplicar la Ley de Hardy-Weinberg en genética poblacional y dominar el asesoramiento genético prenatal con sólidos principios de bioética médica.',
    syllabusTopics: [
      'Semana 10: Aberraciones cromosómicas numéricas (Síndromes de Down, Patau, Edwards, Turner, Klinefelter) y estructurales.',
      'Semana 11: Marcadores genéticos (Sistemas ABO, Rh, HLA) y Genética de Poblaciones (Equilibrio de Hardy-Weinberg).',
      'Semana 12: Herencia multifactorial, defectos congénitos (Malformación, Deformación, Disrupción, Displasia), Asesoramiento Genético y Bioética.'
    ]
  }
];

export const PRELOADED_DOCS: PDFDocument[] = [
  {
    id: 'doc-w1',
    title: 'Guía Docente de Clase - Semana 1',
    week: 1,
    topic: 'Procesos Patológicos y Métodos de Estudio',
    summary: 'Caracterización de la disciplina Morfofisiopatología Humana. Conceptos de proceso patológico, etiología, patogenia, cambios morfológicos, semiología, fisiopatología y patocronía. Clasificación causal fundamental: Genéticos y Adquiridos.',
    content: 'La Morfofisiopatología Humana es una disciplina integradora que unifica los conocimientos de la Genética, Anatomía Patológica, Inmunología, Microbiología, Parasitología, Laboratorio Clínico e Imagenología. Un proceso patológico es el trastorno fisiopatológico dinámico caracterizado por alteraciones moleculares, celulares, tisulares y de órganos que causan síntomas y signos de enfermedad. Su núcleo de estudio incluye: 1. Etiología (estudia las causas que los originan), 2. Patogenia (mecanismos de producción), 3. Cambios morfológicos (alteraciones estructurales microscópicas y macroscópicas), 4. Fisiopatología (consecuencias funcionales de las alteraciones), 5. Semiología (síntomas y signos) y 6. Patocronía (evolución de la enfermedad en el tiempo). Atendiendo a su etiología, los procesos patológicos se clasifican clásicamente en: Genéticos (daño en el genoma, subdivididos en monogénicos, cromosómicos y multifactoriales) y Adquiridos (provocados por agentes físicos, químicos, biológicos, hemodinámicos, inmunes, nutricionales, etc.).'
  },
  {
    id: 'doc-w2',
    title: 'Guía Docente de Clase - Semana 2',
    week: 2,
    topic: 'Métodos de Estudio Generales y Toma de Muestras',
    summary: 'Muestra biológica (sangre, orina, heces, semen, saliva, LCR, fragmentos de tejido). Requisitos de toma y conservación de muestras (ayuno, evitar ejercicio, recipientes estériles). Métodos de estudio diagnósticos por departamento y consideraciones bioéticas (consentimiento informado y confidencialidad).',
    content: 'Una muestra biológica es la porción proveniente de tejidos o fluidos obtenida para análisis y diagnóstico. Tipos principales: sangre (suero para bioquímica, sangre total para hematología), orina (para sistema urinario), heces (parasitología y digestivo), LCR (líquido cefalorraquídeo para infecciones de SNC por punción lumbar), y fragmentos de tejido (para biopsia). Requisitos de calidad: indicación médica precisa, orientación al paciente, condiciones previas (ayuno de 8-12h para lípidos, reposo físico ya que el ejercicio intenso altera glucosa y urea, suspensión o reporte de medicamentos). Los departamentos diagnósticos incluyen: 1. Anatomía Patológica (procesa biopsias incisionales, excisionales, por trocar, por congelación, citologías y necropsias clínicas o médico-legales), 2. Laboratorio Clínico y de Inmunología (química sanguínea cuantitativa y cualitativa, hematología, hemostasia, orina y líquidos articulares/pleurales), 3. Microbiología y Parasitología (cultivos, microscopía, serología), 4. Laboratorio de Genética (cariotipo, cromatina sexual, PCR y secuenciación), 5. Imagenología (Rayos X, Ultrasonido, TAC, Resonancia Magnética y Gammagrafía). Bioética: consentimiento informado obligatorio para todo procedimiento diagnóstico, confidencialidad absoluta de los resultados, protección al médico frente a riesgos biológicos (bata, guantes, material desechable).'
  },
  {
    id: 'doc-w3',
    title: 'Guía Docente de Clase - Semana 3',
    week: 3,
    topic: 'Adaptación Celular y Etiopatogenia de la Lesión',
    summary: 'Adaptación celular como estado reversible frente a demandas fisiológicas o estímulos patológicos. Tipos: Atrofia (disminución de tamaño), Hipertrofia (aumento de tamaño), Hiperplasia (aumento de número) y Metaplasia (sustitución celular). Etiología y patogenia del daño celular con modelo de hipoxia.',
    content: 'La homeostasis celular puede ser alterada por demandas fisiológicas excesivas o estímulos patológicos dañinos. Ante ello, las células responden mediante la Adaptación Celular, un estado reversible para preservar la viabilidad celular. Tipos de adaptación: 1. Atrofia: disminución de tamaño celular por pérdida de material estructural (fisiológica como el útero postparto, patológica como la renal por isquemia crónica o senil), 2. Hipertrofia: aumento de tamaño celular por aumento de síntesis proteica en células incapaces de dividirse (fisiológica en deportistas, patológica en miocardio por hipertensión arterial crónica), 3. Hiperplasia: aumento de número de células en respuesta a hormonas o factores de crecimiento en tejidos capaces de dividirse (fisiológica como mama en embarazo, patológica como próstata por andrógenos o tiroides), 4. Metaplasia: sustitución reversible de un tipo celular diferenciado por otro mejor preparado para el estrés (epitelio cilíndrico a escamoso en fumadores con pérdida de función ciliar). Si el estrés supera la capacidad adaptativa, se genera Lesión Celular. La causa más común es la Privación de Oxígeno (Hipoxia o Isquemia por oclusión arterial). Patogenia de la hipoxia: 1. Caída de fosforilación oxidativa mitocondrial y depleción de ATP, 2. Falla de la bomba Na-K ATPasa, ingresando sodio y agua con tumefacción celular, 3. Glucólisis anaeróbica con caída del pH celular y dispersión del citoesqueleto.'
  },
  {
    id: 'doc-w4',
    title: 'Guía Docente de Clase - Semana 4',
    week: 4,
    topic: 'Lesión Celular Reversible, Irreversible y Muerte Celular',
    summary: 'Cuadros de lesión reversible (tumefacción celular y esteatosis/cambio graso). Lesión irreversible con sus dos patrones: Necrosis (cambios morfológicos microscópicos nucleares: picnosis, cariolisis, cariorrexis) y Apoptosis (muerte programada sin inflamación). Patrones morfológicos de necrosis (coagulación, colicuativa, caseosa, grasa). Evidencias diagnósticas de daño celular.',
    content: 'La lesión celular reversible se caracteriza por dos cuadros morfológicos: 1. Tumefacción Celular (vacuolización hidrópica: acumulación de agua por falla de bombas de membrana dependientes de energía, visible como pequeñas vacuolas claras en citoplasma de hepatocitos, cardiomiocitos o células renales), 2. Cambio Graso o Esteatosis (acumulación de vacuolas de triglicéridos en citoplasma por agentes tóxicos, alcohol o malnutrición en hígado o corazón, visible mediante tinción de Rojo Oleoso o Sudán IV en cortes por congelación). La lesión irreversible conlleva a Muerte Celular por dos mecanismos: 1. Necrosis: proceso patológico accidental caracterizado por desnaturalización de proteínas y digestión enzimática celular. Presenta eosinofilia intensa en citoplasma e imagen en "fantasma". Cambios nucleares típicos: Picnosis (encogimiento y basofilia), Cariorrexis (fragmentación nuclear) y Cariolisis (desvanecimiento cromatínico). 2. Apoptosis: muerte celular programada regulada genéticamente por caspasas. Características: constricción celular, condensación cromatínica marginal, cuerpos apoptóticos rodeados de membrana fagocitados sin provocar respuesta inflamatoria. Patrones de necrosis: Necrosis por coagulación (isquemia en todos los órganos excepto cerebro, conserva contornos celulares temporales como en el infarto agudo de miocardio), Necrosis colicuativa (isquemia cerebral y pancreatitis aguda, autólisis rápida con licuefacción del tejido), Necrosis caseosa (tuberculosis, aspecto blanco-amarillento como queso seco con granulomas circundantes), y Necrosis grasa (saponificación de grasas en pancreatitis con depósitos blanquecinos de calcio/jabones). Evidencias diagnósticas: elevación sérica de enzimas intracelulares, como amilasa y lipasa en pancreatitis aguda, AST, ALT en hepatitis, y Creatina Quinasa MB (CK-MB) y troponinas en el infarto de miocardio.'
  },
  {
    id: 'doc-w5',
    title: 'Guía Docente de Clase - Semana 5',
    week: 5,
    topic: 'Acumulaciones Intracelulares, Aterosclerosis, Diabetes y Calcificaciones',
    summary: 'Trastornos metabólicos celulares. Acumulación de lípidos, glucógeno y pigmentos (melanina, lipofuscina, hemosiderina). Aterosclerosis como enfermedad inflamatoria íntima. Diabetes mellitus tipo 1 y 2 con complicaciones micro/macrovasculares. Calcificación patológica distrófica vs metastásica.',
    content: 'Las acumulaciones intracelulares resultan de anomalías metabólicas celulares. Pueden acumularse constituyentes normales (agua en riñón, grasas en hígado graso, colesterol en ateromas, glucógeno en túbulos renales en diabetes mellitus) o sustancias anormales (proteínas mutadas como alfa-1-antitripsina o pigmentos exógenos como antracosis pulmonar por carbón y endógenos como melanina en melanocarcinoma, lipofuscina dorada por senescencia/daño oxidativo y hemosiderina por sobrecarga de hierro). La Aterosclerosis es una enfermedad inflamatoria crónica arterial de gran/mediano calibre. Su lesión básica es la placa de ateroma, lesión elevada focal en la túnica íntima con centro lipídico (principalmente colesterol y ésteres) cubierto por envoltura fibrosa. Complicaciones: ulceración, hemorragia, calcificación, trombosis (oclusión que causa infartos) y aneurismas. La Diabetes Mellitus es un grupo de trastornos metabólicos caracterizados por hiperglicemia. Tipo 1: destrucción autoinmune absoluta de células beta pancreáticas. Tipo 2: resistencia periférica a la insulina y secreción compensatoria inadecuada. Complicaciones crónicas: macrovascular (aterosclerosis severa precoz con infartos y gangrena de miembros inferiores) y microvascular (microangiopatía diabética por engrosamiento de membrana basal capilar en retina, nervios y riñón - glomeruloesclerosis nodular o Kimmelstiel-Wilson con insuficiencia renal crónica). Calcificación patológica: 1. Calcificación Distrófica: depósito de sales de calcio en tejidos degenerados o necróticos con niveles séricos de calcio normales (frecuente en válvulas cardíacas estenosadas, placas de ateroma o necrosis caseosa tuberculosa), 2. Calcificación Metastásica: depósito de calcio en tejidos normales debido a hipercalcemia sistémica por insuficiencia renal crónica, hiperparatiroidismo o toxicidad de Vitamina D.'
  },
  {
    id: 'doc-w6',
    title: 'Guía Docente de Clase - Semana 6',
    week: 6,
    topic: 'Respuesta Inflamatoria Aguda y Crónica',
    summary: 'La inflamación como respuesta inespecífica compleja ante agentes lesivos. Fases vasculares (calibre, permeabilidad) y acontecimientos celulares (marginación, rodamiento, adhesión, migración, quimiotaxis y fagocitosis). Signos cardinales de inflamación. Patrones morfológicos y efectos sistémicos.',
    content: 'La inflamación es una respuesta compleja del tejido conjuntivo vascularizado ante agentes lesivos, cuyo objetivo es eliminar la causa inicial de la lesión y sus consecuencias. Se clasifica en: Aguda (comienzo rápido, corta duración de minutos a días, infiltrado predominantemente de neutrófilos) y Crónica (duración prolongada de semanas a años, infiltrado de linfocitos, macrófagos y células plasmáticas, coexistiendo destrucción y reparación por fibrosis). Signos cardinales clínicos (Celsus y Virchow): rubor (enrojecimiento por vasodilatación), calor (aumento de temperatura por hiperemia), tumor (hinchazón/edema por exudado de líquido), dolor (por mediadores químicos e irritación de fibras nerviosas) e impotencia funcional (pérdida de función). Mecanismo de inflamación aguda: 1. Cambios vasculares: modificaciones en el calibre (dilatación arteriolar que aumenta el flujo, apertura de lechos capilares) y aumento de la permeabilidad vascular con salida de líquido rico en proteínas (exudado). 2. Acontecimientos celulares leucocitarios: marginación (neutrófilos se desplazan a la periferia vascular), rodamiento (adhesión transitoria mediada por selectinas), adhesión o pavimentación firme (mediada por integrinas en endotelio), migración o diapedesis (atravesar pared capilar en uniones celulares), quimiotaxis (movimiento unidireccional orientado por un gradiente químico hacia la lesión) y fagocitosis (fijación por pseudópodos, ingestión en fagosoma, fusión con lisosoma y digestión lisosómica). Mediadores químicos: histamina (primer mediador de fase inmediata, secretada por mastocitos, basófilos y plaquetas que causa vasodilatación arteriolar y permeabilidad), sistema de complemento, prostaglandinas, cininas (bradicinina causa dolor) y citocinas. Patrones de inflamación: serosa (fluido pobre en proteínas, ej. ampolla o derrame pleural), fibrinosa (salida de moléculas mayores como fibrinógeno que se deposita en pericarditis fibrinosa "en pan con mantequilla"), supurativa/purulenta (exudado rico en neutrófilos y bacterias piógenas, ej. meningitis o apendicitis flemonosa) y granulomatosa (crónica con acumulación de macrófagos epitelioides y células gigantes, ej. tuberculosis).'
  },
  {
    id: 'doc-w7',
    title: 'Guía Docente de Clase - Semana 7',
    week: 7,
    topic: 'Reparación Tisular, Regeneración y Cicatrización',
    summary: 'Reparación tisular para restablecer la continuidad anatómica y funcional. Dos formas: Regeneración (células del parénquima) y Cicatrización (tejido conectivo). Clasificación celular según capacidad regenerativa (lábiles, estables y permanentes). Fases de la cicatrización. Curación por primera y segunda intención. Factores modificantes.',
    content: 'La reparación tisular es la capacidad del organismo para restituir células dañadas o muertas y reparar tejidos tras un proceso inflamatorio con el fin de restablecer la continuidad tisular. Dos formas fundamentales: 1. Regeneración parenquimatosa: sustitución del tejido lesionado por células funcionales del mismo tipo celular, manteniendo la arquitectura y función intactas. Requiere la conservación de la membrana basal y del estroma de sostén. 2. Cicatrización o curación: sustitución por tejido conectivo fibroso de reparación cuando las células del parénquima no pueden regenerarse o el estroma está seriamente destruido. Produce disfunción tisular permanente. Clasificación celular por regeneración: A. Células Lábiles (están continuamente en el ciclo celular, proliferan toda la vida: células de la piel, mucosas oral, gastrointestinal, respiratoria, vaginal, cuello uterino y hematopoyéticas), B. Células Estables (conservan la capacidad de regeneración pero se mantienen quiescentes en G0 en estado normal, entrando al ciclo ante estímulos: hepatocitos, células tubulares renales, páncreas, fibroblastos, osteoblastos, músculo liso y endotelio), C. Células Permanentes (altamente especializadas, incapaces de dividirse después del nacimiento, sus lesiones curan siempre por cicatrización: neuronas, fotorreceptores de la retina y células miocárdicas). Fases de la cicatrización: 1. Formación del coágulo, 2. Angiogénesis o neovascularización mediada por VEGF a las 48-72h, 3. Migración y proliferación de fibroblastos estimulado por TGF-beta con formación de tejido de granulación (blando, edematoso, rosado, muy vascularizado), 4. Depósito de matriz extracelular (colágeno) y 5. Remodelado y maduración de la cicatriz por metaloproteinasas (MMPs). Tipos de curación cutánea: Primera intención (incisión quirúrgica limpia, bordes aproximados por sutura, mínimo coágulo y cicatriz lineal) y Segunda intención (heridas con gran pérdida de tejido, heridas infectadas o úlceras, amplio coágulo de fibrina, reacción inflamatoria extensa, gran cantidad de tejido de granulación y contracción de la herida mediada por miofibroblastos con cicatriz deformante amplia). Factores modificantes: Locales (riego sanguíneo insuficiente, infección local que es la causa más común de retraso, cuerpos extraños/suturas, tensión mecánica, tejido necrótico) y Sistémicos (malnutrición con déficit proteico o de Vitamina C que inhiben síntesis de colágeno, diabetes mellitus, mala circulación arterial, y hormonas como glucocorticoides/esteroides que inhiben la inflamación y síntesis de colágeno retrasando la curación).'
  },
  {
    id: 'doc-w8',
    title: 'Guía Docente de Clase - Semana 8',
    week: 8,
    topic: 'Transmisión de Simples Mutaciones e Herencia Mendeliana',
    summary: 'Clasificación de enfermedades genéticas: monogénicas, cromosómicas y multifactoriales. Conceptos de genotipo, fenotipo, alelos, locus. Confección del árbol genealógico y pedigrí familiar. Patrones de herencia mendeliana monogénica y criterios clínicos.',
    content: 'Los procesos patológicos de etiología genética se clasifican en: Monogénicos (alteración de un solo gen, herencia mendeliana clásica), Cromosómicos (alteración numérica o estructural de cromosomas, afectando muchos genes) y Multifactoriales (interacción aditiva de múltiples poligenes con factores ambientales). Conceptos nucleares: Genotipo (constitución genética para un locus en combinaciones homocigóticas, heterocigóticas o hemicigóticas), Fenotipo (expresión observable física, fisiológica o molecular del genotipo, modificable por el ambiente), Locus (lugar que ocupa un gen en el cromosoma), Genes alelos (formas alternativas de un gen). Árbol genealógico o pedigrí: representación gráfica de la composición familiar con símbolos estandarizados (círculo para mujer, cuadrado para hombre, relleno para afectado, punto para portadora ligada al X, línea diagonal para fallecido). Patrones de herencia monogénica: 1. Autosómica Dominante (gen se expresa en dosis única heterocigótica Pp, ej. polidactilia o acondroplasia. Criterios: transmisión vertical en todas las generaciones, afecta por igual sexos, riesgo de recurrencia del 50%, hijos de sanos son sanos). 2. Autosómica Recesiva (gen requiere doble dosis homocigótica aa, ej. albinismo oculocutáneo o fibrosis quística. Criterios: transmisión horizontal con hermanos afectados de padres sanos portadores Aa, riesgo de recurrencia del 25% por embarazo, afecta por igual sexos, aumenta frecuencia ante consanguinidad). 3. Dominante Ligada al X (ej. raquitismo hipofosfatémico. Criterios: no hay transmisión varón a varón, varón afectado transmite al 100% de sus hijas y 0% de sus hijos, mujeres afectadas transmiten al 50% de descendencia, predominio de mujeres afectadas). 4. Recesiva Ligada al X (ej. hemofilia A o distrofia muscular de Duchenne. Criterios: varones afectados hemicigóticos expresan siempre la enfermedad, transmiten el gen mutado al 100% de hijas que serán portadoras sanas y 0% de hijos, mujeres portadoras sanas transmiten al 50% de hijos varones afectados y 50% de hijas portadoras, incidencia casi exclusiva en hombres).'
  },
  {
    id: 'doc-w9',
    title: 'Guía Docente de Clase - Semana 9',
    week: 9,
    topic: 'Interferencias Biológicas y Bases Bioquímicas de Trastornos Genéticos',
    summary: 'Fenómenos biológicos no clásicos que alteran la interpretación mendeliana. Penetrancia reducida, expresividad variable, inactivación del cromosoma X, mutaciones de novo, pleiotropía y heterogeneidad genética. Herencia mitocondrial, impronta genómica, disomías uniparentales y mosaicismo.',
    content: 'Ciertas anomalías genéticas presentan conductas clínicas que se desvían de las predicciones mendelianas puras por interferencias biológicas: 1. Penetrancia reducida o incompleta: un individuo hereda el gen mutado dominante pero no expresa el carácter fenotípico (ej. polidactilia en padres sanos que transmiten el rasgo), 2. Expresividad variable: el gen mutado se expresa con severidades clínicas diferentes entre los afectados de una misma familia (ej. polidactilia afectando una sola mano vs los cuatro miembros), 3. Inactivación del cromosoma X (Lyonización): ocurre en el tercer día de desarrollo embrionario en hembras (estado de mórula), inactivando al azar uno de los dos cromosomas X formando el corpúsculo de Barr. Causa compensación de dosis proteicas y expresión clínica leve de hemofilia o Duchenne en mujeres portadoras heterocigóticas, 4. Nuevas mutaciones o de novo: mutaciones espontáneas surgidas en gametos de padres sanos sin antecedentes (ej. acondroplasia), 5. Efecto pleiotrópico: una sola mutación génica explica múltiples manifestaciones fenotípicas en diferentes órganos o sistemas (ej. Síndrome de Marfan, alterando el gen FBN1 de la fibrilina afectando ojos, esqueleto y sistema cardiovascular), 6. Heterogeneidad genética: puede ser alélica (diferentes mutaciones en el mismo gen causan la misma enfermedad, ej. fibrosis quística con más de 800 mutaciones) o no alélica/de locus (mutaciones en genes ubicados en diferentes cromosomas causan la misma entidad, ej. retinosis pigmentaria), 7. Herencia Mitocondrial: mutaciones en el genoma mitocondrial circular. Se transmite exclusivamente por vía materna a través del citoplasma del óvulo. Afecta a hombres y mujeres por igual, pero los varones nunca la transmiten. Causa neuropatía óptica de Leber (pérdida progresiva de visión central), 8. Impronta Genómica: inactivación epigenética selectiva de un alelo según su origen materno o paterno. Ejemplos en deleción del cromosoma 15: si la deleción es del cromosoma materno, se expresa el Síndrome de Angelman (ataxia, epilepsia, risa alegre, retraso severo); si la deleción es del cromosoma paterno, se expresa el Síndrome de Prader-Willi (estatura baja, obesidad, hipogonadismo, hiperfagia), 9. Disomía Uniparental: herencia de ambos cromosomas de un par de un solo progenitor por un mecanismo de rescate trisómico (ej. fibrosis quística heredada de un solo padre portador), 10. Mosaicismo: coexistencia de dos o más líneas celulares con diferente genotipo en un mismo individuo, puede ser somático o gonadal (causa recurrencia de mutaciones dominantes en hijos de padres sanos).'
  },
  {
    id: 'doc-w10',
    title: 'Guía Docente de Clase - Semana 10',
    week: 10,
    topic: 'Aberraciones Cromosómicas Numéricas y Estructurales',
    summary: 'Citogenética y cariotipo humano (constitución de 46,XX y 46,XY). Corpúsculo de Barr en interfase. Aberraciones numéricas: aneuploidías por no disyunción meiótica y poliploidías. Síndromes de Down, Patau, Edwards, Turner y Klinefelter. Aberraciones estructurales balanceadas y no balanceadas.',
    content: 'La citogenética estudia los cromosomas y sus anomalías. La constitución cromosómica humana normal es de 46 cromosomas: 44 autosomas y 2 cromosomas sexuales (46,XX en mujeres, 46,XY en varones). El Cariotipo es el ordenamiento de los cromosomas metafásicos por tamaño, posición del centrómero (metacéntricos, submetacéntricos, acrocéntricos) y patrón de bandas en pares del 1 al 22. La cromatina sexual o corpúsculo de Barr representa al cromosoma X inactivo fijado a la envoltura nuclear en interfase, calculable como Nro de cromosomas X - 1 (mujeres normales: 1 corpúsculo; Turner 45,X: 0 corpúsculos; Klinefelter 47,XXY: 1 corpúsculo). Las Aberraciones Cromosómicas son anomalías genéticas severas: A. Numéricas: alteran el número diploide. 1. Aneuploidías (no es múltiplo exacto del número haploide: trisomías 2n+1 o monosomías 2n-1, generadas por no disyunción o no separación de un par de cromosomas durante anafase meiótica materna asociada a edad avanzada o anafase retardada), 2. Poliploidías (múltiplo exacto superior al diploide, ej. triploidía 3n o tetraploidía 4n, incompatibles con la vida en humanos). Síndromes por aneuploidías autosómicas: Síndrome de Down o Trisomía 21 (fórmula: 47,XX,+21 o 47,XY,+21, caracterizado por hipotonía, pliegue palmar único, retraso mental, cardiopatía congénita, fascie mongoloide), Síndrome de Patau o Trisomía 13 (malformaciones severas de línea media, labio leporino, polidactilia, fallecen en primer año), Síndrome de Edwards o Trisomía 18 (micrognatia, puño cerrado con dedos cabalgados, retraso severo). Síndromes por aneuploidías sexuales: Síndrome de Turner o Monosomía X (fórmula 45,X, mujeres con baja estatura, cuello alado/palmeado, implantación baja del cabello, amenorrea primaria y coartación aórtica), Síndrome de Klinefelter (fórmula 47,XXY, varones con alta estatura, extremidades largas, ginecomastia, testículos pequeños, azoospermia e infertilidad). B. Estructurales: alteración estructural por ruptura y reordenamiento. Se dividen en Balanceadas (sin pérdida ni ganancia de material, fenotipo normal pero con fallas reproductivas, ej. translocaciones recíprocas o robertsonianas por fusión céntrica en acrocéntricos 13, 14, 15, 21, 22, e inversiones pericéntricas o paracéntricas) y No Balanceadas (con pérdida o ganancia de material genético, fenotipo alterado, ej. deleciones intersticiales o terminales como el Síndrome de Cri Du Chat o maullido de gato por deleción en brazo corto del cromosoma 5 con microcefalia e hipotonía, duplicaciones e isocromosomas formados por separación transversal del centrómero en meiosis II).'
  },
  {
    id: 'doc-w11',
    title: 'Guía Docente de Clase - Semana 11',
    week: 11,
    topic: 'Marcadores Genéticos y Genética de Poblaciones',
    summary: 'Marcadores genéticos polimórficos de herencia simple (Grupos sanguíneos ABO y Rh, Sistema HLA/MHC y RFLPs). Aplicaciones clínicas (transfusiones, trasplantes y medicina forense). Genética de Poblaciones y Ley de Hardy-Weinberg en equilibrio genético.',
    content: 'Un marcador genético es un locus con alelos polimórficos de fácil identificación que presentan un modelo simple de herencia. Características: codominantes, no se afectan por el ambiente ni edad. Sistemas de grupos sanguíneos: 1. Sistema ABO (codificados por alelos múltiples A, B, O en cromosoma 9; alelos A y B muestran dominancia completa sobre el recesivo O, y codominancia entre sí originando fenotipo AB. Importancia: incompatibilidad transfusional o conflicto ABO neonatal que genera ictericia y kerníctero), 2. Sistema Rh (alelo D dominante sobre d recesivo; Rh positivo es DD o Dd, Rh negativo es dd. Importancia: eritroblastosis fetal en madre Rh- con feto Rh+), 3. Sistema MN (alelos codominantes M y N en cromosoma 4). Sistema Mayor de Histocompatibilidad (MHC/HLA): ubicado en el brazo corto del cromosoma 6, compuesto por genes estrechamente ligados con altísima heterogeneidad alélica. Clase I (loci A, B, C) y Clase II (DP, DQ, DR) corresponden al sistema HLA, esencial para el rechazo de trasplantes y susceptibilidad a enfermedades. Polimorfismos de ADN (RFLPs): marcadores moleculares excelentes obtenidos por cortes con enzimas de restricción y revelados por Southern blot. Genética Poblacional: estudia la distribución de genes y genotipos en poblaciones humanas. Ley de Hardy-Weinberg: enuncia que las frecuencias génicas y genotípicas se mantienen constantes de generación en generación en una población ideal (muy grande, matrimonios al azar o panmictica, sin mutaciones, sin selección natural y sin migración). Ecuación matemática: p + q = 1 (frecuencias génicas, donde p es alelo dominante y q es recesivo) y (p + q)^2 = p^2 + 2pq + q^2 = 1 (frecuencias genotípicas, donde p^2 es la frecuencia del homocigoto dominante AA, q^2 es el homocigoto recesivo aa y 2pq es el heterocigoto Aa).'
  },
  {
    id: 'doc-w12',
    title: 'Guía Docente de Clase - Semana 12',
    week: 12,
    topic: 'Herencia Multifactorial, Defectos Congénitos y Asesoramiento Genético',
    summary: 'Herencia multifactorial determinada por poligenes y factores ambientales. Modelo de umbral y heredabilidad. Clasificación clínica de defectos congénitos (Malformación, Deformación, Disrupción, Displasia). Teratógenos exógenos y endógenos. Asesoramiento Genético, riesgo genético, diagnóstico prenatal y bioética.',
    content: 'La Herencia Multifactorial explica rasgos normales continuos (altura, peso, inteligencia con distribución en curva de Gauss) y enfermedades comunes del adulto (Hipertensión Arterial Esencial, Diabetes Mellitus Tipo 2, Cáncer, Asma Bronquial) o defectos congénitos aislados. Está determinada por la acción aditiva de múltiples genes (poligénica) en estrecha interacción con el medio ambiente. Modelo de Umbral: la susceptibilidad a enfermar se distribuye de forma continua en la población, expresándose la enfermedad solo si se supera un "umbral" de predisposición genética y ambiental. Heredabilidad: proporción de la variación total de un carácter atribuible a factores genéticos. Defecto congénito: anomalía anatómica o estructural visible al nacimiento o posterior. Clasificación etiopatogénica: 1. Malformación: defecto primario estructural resultante de una pobre formación intrínseca de tejido debido a fallas genéticas monogénicas o cromosómicas (ej. labio leporino, fisura palatina, anencefalia o espina bífida por falla en cierre del tubo neural), 2. Deformación: alteración de la forma o posición de una estructura normalmente formada debido a fuerzas mecánicas extrínsecas inusuales en útero durante últimos meses de gestación (ej. pie zambo, displasia de cadera por oligohidramnios o gemelaridad), 3. Disrupción: defecto estructural por ruptura o interferencia extrínseca en un tejido originalmente bien formado (ej. bridas amnióticas que causan amputaciones de dedos, no es heredable), 4. Displasia: organización celular anormal en un tejido específico (ej. displasia esquelética tanatofórica por mutación del gen FGFR3). Teratógenos: agentes externos que causan defectos congénitos en embrión o feto. Exógenos: Biológicos (TORCH: Toxoplasma, Rubéola, Citomegalovirus, Herpes, VIH, Sífilis que causan microcefalia y coriorretinitis), Químicos (alcohol que es la principal causa de retraso mental ambiental, talidomida, fármacos anticancerígenos, anticonvulsivantes como fenitoína) e Físicos (radiaciones ionizantes, calor). Endógenos: enfermedades metabólicas maternas (Diabetes Mellitus descontrolada con cardiopatías congénitas y agenesia sacra, hipotiroidismo). Asesoramiento Genético: proceso de comunicación para ayudar a comprender la situación clínica, apreciar el riesgo de recurrencia en la familia (Riesgo Mendeliano teórico de 50% o 25% o Riesgo Empírico estadístico basado en tablas poblacionales), entender alternativas y ajustarse éticamente. Diagnóstico prenatal: invasivo (amniocentesis, cordocentesis, biopsia coriónica) y no invasivo (ultrasonido fetal o ecografía). Principios éticos: Autonomía (respeto a decisión voluntaria no directiva), Beneficencia, No maleficencia, y Justicia.'
  }
];

export const PRELOADED_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    topicId: 'doc-w3',
    question: '¿Cuál es el primer mediador químico liberado en la fase de respuesta inmediata de la inflamación aguda?',
    answer: 'La HISTAMINA.',
    yield: 'HIGH-YIELD',
    explanation: 'La histamina provoca de inmediato vasodilatación y aumento de la permeabilidad vascular. Se encuentra preformada en gránulos dentro de los mastocitos, basófilos y plaquetas.'
  },
  {
    id: 'fc-2',
    topicId: 'doc-w3',
    question: '¿Qué tipo de adaptación celular ocurre en las células epiteliales respiratorias de un fumador habitual?',
    answer: 'METAPLASIA escamosa (reemplazo de epitelio cilíndrico por escamoso).',
    yield: 'HIGH-YIELD',
    explanation: 'El epitelio cilíndrico ciliado es reemplazado por epitelio escamoso estratificado, más resistente a la agresión del humo, pero perdiendo la función ciliar protectora de barrido mucociliar.'
  },
  {
    id: 'fc-3',
    topicId: 'doc-w4',
    question: '¿Cuáles son los tres patrones morfológicos microscópicos del núcleo en una célula necrótica?',
    answer: 'PICNOSIS (encogimiento), CARIORREXIS (fragmentación) y CARIOLISIS (disolución cromatínica).',
    yield: 'HIGH-YIELD',
    explanation: 'Estos tres cambios nucleares marcan morfológicamente el punto de no retorno de la lesión celular irreversible o muerte celular por necrosis.'
  },
  {
    id: 'fc-4',
    topicId: 'doc-w4',
    question: '¿Qué patrón de necrosis es patognomónico de la tuberculosis pulmonar?',
    answer: 'Necrosis CASEOSA.',
    yield: 'HIGH-YIELD',
    explanation: 'Microscópicamente, el tejido necrótico caseoso pierde por completo sus contornos celulares, formando una masa amorfa granular rodeada de una pared inflamatoria granulomatosa (células epitelioides y gigantes).'
  },
  {
    id: 'fc-5',
    topicId: 'doc-w5',
    question: '¿Cuál es la lesión patognomónica o típica de la nefropatía diabética en la diabetes mellitus?',
    answer: 'Glomeruloesclerosis nodular o ENFERMEDAD DE KIMMELSTIEL-WILSON.',
    yield: 'HIGH-YIELD',
    explanation: 'Se caracteriza por nódulos ovoides de matriz mesangial acelular eosinófila en la periferia de los capilares glomerulares, acompañados de arteriolosclerosis hialina.'
  },
  {
    id: 'fc-6',
    topicId: 'doc-w7',
    question: '¿En qué tipo de células según su capacidad regenerativa se clasifica el miocardio y las neuronas?',
    answer: 'Células PERMANENTES.',
    yield: 'HIGH-YIELD',
    explanation: 'Son células altamente especializadas que no se dividen después del nacimiento. Sus lesiones destruyen el parénquima y se reparan exclusivamente por cicatrización (fibrosis) con disfunción permanente.'
  },
  {
    id: 'fc-7',
    topicId: 'doc-w9',
    question: '¿Cuál es la diferencia diagnóstica de origen en la impronta de la deleción del cromosoma 15 para Prader-Willi y Angelman?',
    answer: 'Si la deleción es del cromosoma PATERNO, causa PRADER-WILLI. Si es del MATERNO, causa ANGELMAN.',
    yield: 'HIGH-YIELD',
    explanation: 'Ambas son causadas por la misma deleción (del15q11-13). Sin embargo, debido a la impronta genómica, la expresión fenotípica depende estrictamente del progenitor que aporta el cromosoma delecionado.'
  },
  {
    id: 'fc-8',
    topicId: 'doc-w10',
    question: '¿Cuál es el número de corpúsculos de Barr esperados en un paciente con Síndrome de Klinefelter (47,XXY)?',
    answer: 'UN (1) corpúsculo de Barr.',
    yield: 'HIGH-YIELD',
    explanation: 'La regla general es Número de Cromosomas X menos 1. En el Klinefelter (XXY), hay dos X, por lo que se inactiva uno de ellos, dejando un único corpúsculo de Barr visible en la cromatina sexual.'
  },
  {
    id: 'fc-9',
    topicId: 'doc-w11',
    question: '¿Cuáles son las variables representadas en el equilibrio genético de la ecuación de Hardy-Weinberg?',
    answer: 'p (alelo dominante), q (alelo recesivo), p² (homocigoto dominante), q² (homocigoto recesivo) y 2pq (heterocigoto).',
    yield: 'HIGH-YIELD',
    explanation: 'En poblaciones ideales, las frecuencias alélicas p + q = 1 determinan las frecuencias genotípicas correspondientes al desarrollo del binomio p² + 2pq + q² = 1.'
  },
  {
    id: 'fc-10',
    topicId: 'doc-w12',
    question: '¿Qué tipo de defecto congénito representa el pie zambo o las deformidades uterinas por gemelaridad?',
    answer: 'DEFORMACIÓN.',
    yield: 'HIGH-YIELD',
    explanation: 'Una deformación es provocada por fuerzas mecánicas inusuales extrínsecas que alteran la forma de un órgano que originalmente estaba bien formado, a diferencia de la malformación que es intrínseca.'
  }
];

export const PRELOADED_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q-1',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w4',
    question: 'Paciente masculino de 48 años de edad acude a urgencias por dolor abdominal agudo en epigastrio irradiado a la espalda y vómitos. Se constata elevación severa de lipasas y amilasas pancreáticas. El ecosonograma confirma pancreatitis hemorrágica aguda. Atendiendo al tipo de lesión celular, este proceso se caracteriza por necrosis de tipo:',
    options: [
      'Necrosis de coagulación',
      'Necrosis colicuativa',
      'Necrosis caseosa',
      'Necrosis enzimática de las grasas (saponificación)'
    ],
    correctAnswer: 'Necrosis enzimática de las grasas (saponificación)',
    explanation: 'La pancreatitis libera lipasas y enzimas líticas que digieren el tejido adiposo peripancreático, liberando ácidos grasos que se combinan con calcio (saponificación) formando áreas blanquecinas semejantes a jabón.',
    communityContext: 'En la atención comunitaria integral (ASIC), el dolor en barra abdominal irradiado a la espalda debe levantar sospechas inmediatas de pancreatitis, remitiendo de urgencia para evitar shock sistémico.'
  },
  {
    id: 'q-2',
    type: 'CLINICO_COMUNITARIO',
    topicId: 'doc-w5',
    question: 'En un consultorio popular del ASIC en Venezuela, se evalúa a una paciente de 66 años con antecedentes de Diabetes Mellitus tipo 2 y várices en miembros inferiores. Presenta una úlcera crónica en el maléolo medial derecho. Al examen físico se observa tejido de granulación abundante, blando y rosado. ¿Cuál es el proceso reparativo fisiológico por el cual cura esta úlcera con pérdida extensa de tejido, y qué factor local la retarda?',
    options: [
      'Cicatrización por primera intención; retardada por el uso de corticosteroides.',
      'Cicatrización por segunda intención; retardada por el mal estado circulatorio venoso e infección.',
      'Regeneración parenquimatosa; retardada por la edad de la paciente.',
      'Cicatrización por primera intención; retardada por acumulación de colágeno.'
    ],
    correctAnswer: 'Cicatrización por segunda intención; retardada por el mal estado circulatorio venoso e infección.',
    explanation: 'Las heridas con gran pérdida de tejido, como las úlceras diabéticas/varicosas, curan por segunda intención con formación de abundante tejido de granulación y contracción de bordes por miofibroblastos. Se retrasa localmente por el mal retorno venoso (várices) y la propensión a infecciones por hiperglicemia crónica.',
    communityContext: 'En la Atención Primaria de Salud (APS) de la UCS, el control glucémico domiciliario, curas estériles y el reposo con elevación de miembros inferiores son pilares del tratamiento comunitario de úlceras.'
  },
  {
    id: 'q-3',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w10',
    question: 'Se recibe un informe citogenético en el consultorio de Barrio Adentro que indica que un lactante femenino presenta una constitución cromosómica de 45,X. Al examen físico se aprecia baja estatura y cuello palmeado (alado). ¿A qué síndrome corresponde este cariotipo y cuántos corpúsculos de Barr se observarán en el raspado de mucosa oral?',
    options: [
      'Síndrome de Down; 1 corpúsculo de Barr.',
      'Síndrome de Turner; 0 corpúsculos de Barr.',
      'Síndrome de Klinefelter; 1 corpúsculo de Barr.',
      'Síndrome de Edwards; 2 corpúsculos de Barr.'
    ],
    correctAnswer: 'Síndrome de Turner; 0 corpúsculos de Barr.',
    explanation: 'El cariotipo 45,X (monosomía del X) corresponde al Síndrome de Turner. Como tiene un solo cromosoma X, el número de corpúsculos de Barr (X - 1) es 0, ya que no ocurre inactivación del único X funcional.',
    communityContext: 'La pesquisa activa de dismorfologías en el consultorio popular permite orientar tempranamente a las familias hacia el asesoramiento genético multidisciplinario.'
  },
  {
    id: 'q-4',
    type: 'DESARROLLO_CORTO',
    topicId: 'doc-w3',
    question: 'Mencione la causa más común de lesión celular reversible en la práctica clínica y explique brevemente el mecanismo molecular por el cual se produce la tumefacción celular en este cuadro.',
    correctAnswer: 'La hipoxia o isquemia. El mecanismo es la pérdida de la fosforilación oxidativa mitocondrial que causa depleción de ATP, lo cual inactiva la bomba de sodio-potasio de la membrana, permitiendo la entrada masiva de sodio y agua al interior de la célula, causando su hinchazón.',
    explanation: 'La depleción de ATP causa que el sodio se acumule intracelularmente. Por arrastre osmótico, el agua entra a la célula provocando la dilatación del retículo endoplásmico y la aparición de vacuolas claras de agua (tumefacción hidrópica).',
    communityContext: 'El diagnóstico precoz de la hipoxia tisular (como en infartos o crisis asmáticas graves en la comunidad) previene la progresión de lesión celular de reversible a muerte celular irreversible por necrosis.'
  },
  {
    id: 'q-5',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w6',
    question: 'Un paciente de 27 años acude al CDI local con dolor intenso en fosa ilíaca derecha y fiebre de 38.5°C. Se le diagnostica apendicitis aguda purulenta y se opera. Histológicamente, ¿cuál es el leucocito predominante en el infiltrado inflamatorio de esta fase aguda y qué mediador químico inmediato inició la permeabilidad vascular?',
    options: [
      'Linfocitos; Bradicinina.',
      'Eosinófilos; Prostaglandinas.',
      'Polimorfonucleares neutrófilos; Histamina.',
      'Macrófagos; Factor de necrosis tumoral (TNF).'
    ],
    correctAnswer: 'Polimorfonucleares neutrófilos; Histamina.',
    explanation: 'La inflamación aguda supurativa o purulenta está mediada predominantemente por polimorfonucleares neutrófilos que acuden al sitio por quimiotaxis para fagocitar bacterias. La permeabilidad vascular inmediata es iniciada por la histamina liberada de mastocitos.',
    communityContext: 'El control del hemograma (leucocitosis con neutrofília) en la clínica comunitaria es indicativo de un proceso infeccioso bacteriano agudo tributario de resolución quirúrgica o antimicrobiana.'
  },
  {
    id: 'q-6',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w11',
    question: 'En un estudio de genética de poblaciones realizado en un municipio para determinar la frecuencia del factor Rh, se observa que en una muestra de 1000 personas, 90 son Rh negativas (genotipo dd). Basándose en la ley de Hardy-Weinberg, ¿cuál es la frecuencia génica del alelo recesivo "d" (q) y cuál es la frecuencia estimada de portadores heterocigotos (2pq) en dicha población?',
    options: [
      'q = 0.30; Portadores (2pq) = 0.42 (42%)',
      'q = 0.09; Portadores (2pq) = 0.18 (18%)',
      'q = 0.50; Portadores (2pq) = 0.50 (50%)',
      'q = 0.70; Portadores (2pq) = 0.21 (21%)'
    ],
    correctAnswer: 'q = 0.30; Portadores (2pq) = 0.42 (42%)',
    explanation: 'La frecuencia del genotipo homocigoto recesivo (dd) es q² = 90 / 1000 = 0.09. Por lo tanto, la frecuencia del alelo d (q) es la raíz cuadrada de 0.09, que es q = 0.30. La frecuencia del alelo dominante D (p) es 1 - q = 0.70. La frecuencia de heterocigotos (Dd) es 2pq = 2 * 0.70 * 0.30 = 0.42 (42%).',
    communityContext: 'La genética poblacional permite planificar la disponibilidad de inmunoglobulina anti-D en la red de consultorios populares para prevenir la enfermedad hemolítica perinatal.'
  },
  {
    id: 'q-7',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w7',
    question: 'Un paciente masculino de 35 años sufre una herida incisa limpia en antebrazo provocada por bisturí en quirófano. Se realiza sutura quirúrgica afrontando los bordes con técnica aséptica en las primeras horas. ¿Qué tipo de reparación tisular predomina y cuál es la característica del tejido cicatrizal resultante?',
    options: [
      'Cicatrización por segunda intención; deja una cicatriz grande e irregular con contracción severa.',
      'Cicatrización por primera intención; deja una cicatriz delgada, lineal y estéticamente mínima.',
      'Regeneración parenquimatosa pura; no queda ninguna cicatriz ni colágeno.',
      'Cicatrización por tercera intención; requiere injerto cutáneo heterólogo.'
    ],
    correctAnswer: 'Cicatrización por primera intención; deja una cicatriz delgada, lineal y estéticamente mínima.',
    explanation: 'Las heridas quirúrgicas limpias con bordes aproximados por suturas curan por primera intención. Hay mínima muerte celular, leve exudado inflamatorio y escasa formación de tejido de granulación, resultando en una cicatriz lineal fina.',
    communityContext: 'En la cirugía menor en el CDI, el adecuado afrontamiento de bordes y la curación plana precoz minimizan la cicatrización por segunda intención y el riesgo de infecciones secundarias.'
  },
  {
    id: 'q-8',
    type: 'CLINICO_COMUNITARIO',
    topicId: 'doc-w8',
    question: 'En la consulta de Genética del ASIC, se confecciona el árbol genealógico de una familia donde el abuelo paterno y dos de sus hijos varones padecen hemofilia A. Las hijas mujeres de los varones afectados no padecen la enfermedad pero son portadoras sanas, mientras que los hijos varones de estas portadoras tienen un 50% de probabilidad de padecer la enfermedad. ¿A qué patrón de herencia monogénica corresponde esta patología?',
    options: [
      'Autosómica Dominante',
      'Autosómica Recesiva',
      'Recesiva Ligada al Cromosoma X',
      'Herencia Mitocondrial'
    ],
    correctAnswer: 'Recesiva Ligada al Cromosoma X',
    explanation: 'La hemofilia A se hereda de forma recesiva ligada al X. Los varones afectados (XhY) no transmiten el gen mutado a sus hijos varones (les dan el Y), pero todas sus hijas mujeres reciben el Xh convirtiéndose en portadoras obligadas.',
    communityContext: 'El dibujo riguroso del árbol genealógico familiar en la historia médica comunitaria es la herramienta fundamental de pesquisa primaria de coagulopatías en la APS.'
  },
  {
    id: 'q-9',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w9',
    question: 'Una madre de 29 años acude al consultorio con su hijo de 4 años que presenta miopatía severa, acidosis láctica y episodios convulsivos. Se constata que la madre padece una forma leve de la misma alteración metabólica, al igual que los dos hermanos del paciente (varón y hembra). El padre del lactante es completamente sano. La biopsia muscular revela "fibras rojas rasgadas". ¿Qué patrón de herencia no mendeliana está presente?',
    options: [
      'Disomía uniparental paterna',
      'Herencia Mitocondrial (maternal)',
      'Impronta genómica paternal',
      'Mosaicismo somático'
    ],
    correctAnswer: 'Herencia Mitocondrial (maternal)',
    explanation: 'El ADN mitocondrial se hereda exclusivamente por vía materna a través del citoplasma del óvulo. Un madre afectada transmite el rasgo a todos sus hijos (varones y hembras), pero los varones no lo transmiten a su descendencia.',
    communityContext: 'Identificar el origen materno estricto en encefalomiopatías orienta el consejo genético, informando a la madre sobre el riesgo para futuras gestaciones.'
  },
  {
    id: 'q-10',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w10',
    question: 'Lactante varón recién nacido en la maternidad del hospital con llanto débil, hipotonía generalizada, hendiduras palpebrales oblicuas hacia arriba, pliegue palmar único simiano, epicanto y pabellones auriculares de implantación baja. El cariotipo reporta 47,XY,+21. ¿Cuál fue el mecanismo citogenético más frecuente responsable de esta aberración cromosómica numéricas?',
    options: [
      'Translocación robertsoniana t(14;21)',
      'No disyunción meiótica durante la gametogénesis materna',
      'Mosaicismo por falla mitótica poscigótica',
      'Inversión pericéntrica del cromosoma 21'
    ],
    correctAnswer: 'No disyunción meiótica durante la gametogénesis materna',
    explanation: 'El 95% de los casos de Trisomía 21 (Síndrome de Down) corresponden a trisomía libre causada por una no disyunción meiótica (falla de separación de los cromosomas homólogos), con mayor frecuencia en la meiosis I de la ovogénesis materna.',
    communityContext: 'El acompañamiento amoroso, humanizado y la estimulación temprana en la comunidad (ASIC) son clave para el desarrollo pleno de niñas y niños con Síndrome de Down.'
  },
  {
    id: 'q-11',
    type: 'DESARROLLO_CORTO',
    topicId: 'doc-w12',
    question: 'Diferencie desde el punto de vista etiopatogénico una Malformación de una Disrupción en la génesis de defectos congénitos.',
    correctAnswer: 'Una malformación es una alteración intrínseca del desarrollo morfológico de un órgano desde su primordio (ej. labio leporino genético). Una disrupción es la destrucción o interferencia extrinsicade un órgano o tejido que originalmente se estaba formando de manera completamente normal (ej. bridas amnióticas o infección por Zika).',
    explanation: 'La malformación responde a un defecto intrínseco (frecuentemente génico o cromosómico). La disrupción se debe a un agente extrínseco destructivo (isquémico, teratogénico, infeccioso o mecánico).',
    communityContext: 'El control prenatal sistemático en Barrio Adentro (evitar medicamentos teratogénicos, prevención de infecciones TORCH) reduce la incidencia de disrupciones en la comunidad.'
  },
  {
    id: 'q-12',
    type: 'SELECT_SIMPLE',
    topicId: 'doc-w12',
    question: 'Durante la consulta de Asesoramiento Genético en el CDI, los padres de un recién nacido con un defecto severo preguntan sobre la conducta a seguir. ¿Cuál es el principio ético fundamental que debe guiar la postura del médico al brindar este asesoramiento?',
    options: [
      'Directividad paternalista eligiendo la mejor opción por los padres',
      'No directividad respetando la autonomía de los padres para tomar decisiones informadas',
      'Obligatoriedad de interrupción del embarazo en todos los casos',
      'Someter la decisión a votación del comité de salud comunitario'
    ],
    correctAnswer: 'No directividad respetando la autonomía de los padres para tomar decisiones informadas',
    explanation: 'El asesoramiento genético moderno se rige por el principio de NO DIRECTIVIDAD, donde el profesional aporta información clara, científica y comprensible para que los padres decidan libremente respetando su autonomía y principios morales.',
    communityContext: 'El respeto a la dignidad humana y la autonomía familiar en la red de salud primaria fortalece la confianza ética entre la comunidad y el equipo médico de la UCS.'
  }
];
