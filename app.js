/* ═══════════════════════════════════════════════════
   EDU-ICFES v3 — app.js
   Firebase: configura tu URL abajo
   Admin: nico57
   ═══════════════════════════════════════════════════ */
'use strict';
 
/* ── FIREBASE CONFIG ───────────────────────────── */
const FB        = 'https://edu-icfesv3-default-rtdb.firebaseio.com';
const FB_APIKEY = 'AIzaSyC_PLACEHOLDER'; // Reemplaza con tu API Key de Firebase
const FB_AUTH   = 'https://identitytoolkit.googleapis.com/v1';
/* ─────────────────────────────────────────────────── */
 
const ADMIN = 'nico.joya2010@gmail.com'; // Admin por correo
const XP_STREAK_BONUS = 10;
 
/* ── RANGOS ──────────────────────────────────────── */
const RANKS = [
  { min:1,  max:4,  rank:'E', label:'Aprendiz',    color:'#8a8480' },
  { min:5,  max:9,  rank:'D', label:'Explorador',  color:'#2563eb' },
  { min:10, max:14, rank:'C', label:'Combatiente', color:'#16a34a' },
  { min:15, max:19, rank:'B', label:'Guerrero',     color:'#7c3aed' },
  { min:20, max:24, rank:'A', label:'Élite',        color:'#c2410c' },
  { min:25, max:99, rank:'S', label:'Leyenda',      color:'#b5893a' },
];
 
/* ── MATERIAS ────────────────────────────────────── */
const SUBJECTS = {
  math:     { label:'Matemáticas',     icon:'∑',  tag:'tag-math'     },
  reading:  { label:'Lectura Crítica', icon:'📖', tag:'tag-reading'  },
  english:  { label:'Inglés',          icon:'🌐', tag:'tag-english'  },
  science:  { label:'Ciencias',        icon:'⚗',  tag:'tag-science'  },
  sociales: { label:'Sociales',        icon:'🌎', tag:'tag-sociales' },
};
 
/* ── XP ──────────────────────────────────────────── */
function xpNecesaria(nivel) {
  if (nivel < 5) return 100 + nivel * 20;
  return Math.floor(200 * Math.pow(1.15, nivel - 5));
}
function recompensaXP(nivel) { return 20 + nivel * 5; }
 
/* ── BANCO DE PREGUNTAS ──────────────────────────── */
const QUESTIONS = [
  /* MATEMÁTICAS */
  { id:1,  subject:'math', question:'Si f(x) = 3x² − 2x + 1, ¿cuál es f(2)?', options:['9','11','13','7'], answer:0, explanation:'f(2) = 3(4) − 4 + 1 = 9' },
  { id:2,  subject:'math', question:'¿Cuánto es el 15% de 240?', options:['32','36','40','24'], answer:1, explanation:'15/100 × 240 = 36' },
  { id:3,  subject:'math', question:'Triángulo con lados 5, 12 y 13 cm. ¿Qué tipo es?', options:['Acutángulo','Obtusángulo','Rectángulo','Equilátero'], answer:2, explanation:'5² + 12² = 169 = 13² → rectángulo' },
  { id:4,  subject:'math', question:'log₂(32) = ?', options:['4','5','6','3'], answer:1, explanation:'2⁵ = 32 → log₂(32) = 5' },
  { id:5,  subject:'math', question:'(x+3)(x−3) = ?', options:['x²+6x+9','x²−6','x²−9','x²+9'], answer:2, explanation:'Diferencia de cuadrados: a²−b²' },
  { id:6,  subject:'math', question:'2x + 5 = 17 → x = ?', options:['5','6','7','4'], answer:1, explanation:'2x = 12 → x = 6' },
  { id:7,  subject:'math', question:'√144 = ?', options:['11','12','13','14'], answer:1, explanation:'12 × 12 = 144' },
  { id:8,  subject:'math', question:'El 30% de un número es 90. ¿Cuál es?', options:['250','270','300','330'], answer:2, explanation:'0.30n = 90 → n = 300' },
  { id:9,  subject:'math', question:'2³ × 2⁴ = ?', options:['2⁷','2¹²','4⁷','2⁶'], answer:0, explanation:'Suma exponentes: 3+4=7' },
  { id:10, subject:'math', question:'Pendiente de y = 3x − 5:', options:['−5','3','5','−3'], answer:1, explanation:'En y=mx+b, m es la pendiente → m=3' },
  { id:11, subject:'math', question:'π ≈ ?', options:['3.14159','3.12345','3.16227','3.14142'], answer:0, explanation:'π ≈ 3.14159...' },
  { id:12, subject:'math', question:'Media de 4, 7, 10, 13:', options:['7','8','8.5','9'], answer:2, explanation:'(4+7+10+13)/4 = 34/4 = 8.5' },
  { id:13, subject:'math', question:'7! = ?', options:['2520','5040','720','40320'], answer:1, explanation:'7×6×5×4×3×2×1 = 5040' },
  { id:14, subject:'math', question:'Área de rectángulo 8×5:', options:['26','40','13','32'], answer:1, explanation:'A = 8×5 = 40' },
  { id:15, subject:'math', question:'sen(90°) = ?', options:['0','0.5','1','−1'], answer:2, explanation:'sen(90°) = 1' },
  { id:16, subject:'math', question:'cos(0°) = ?', options:['0','1','−1','0.5'], answer:1, explanation:'cos(0°) = 1' },
  { id:17, subject:'math', question:'Volumen de cubo de lado 3:', options:['9','18','27','12'], answer:2, explanation:'V = 3³ = 27' },
  { id:18, subject:'math', question:'(x²×x³)/x⁴ = ?', options:['x','x²','x³','x⁵'], answer:0, explanation:'x⁵/x⁴ = x' },
  { id:19, subject:'math', question:'¿Cuántos primos entre 1 y 20?', options:['6','7','8','9'], answer:2, explanation:'2,3,5,7,11,13,17,19 → 8' },
  { id:20, subject:'math', question:'Tren a 80 km/h. ¿Cuánto tarda 200 km?', options:['2h','2.5h','3h','1.5h'], answer:1, explanation:'t=200/80=2.5h' },
  { id:21, subject:'math', question:'0.25 como fracción:', options:['1/2','1/3','1/4','1/5'], answer:2, explanation:'25/100 = 1/4' },
  { id:22, subject:'math', question:'Perímetro círculo radio 5:', options:['10π','5π','25π','2π'], answer:0, explanation:'P=2π(5)=10π' },
  { id:23, subject:'math', question:'(−3)² = ?', options:['−9','6','9','−6'], answer:2, explanation:'(−3)×(−3) = +9' },
  { id:24, subject:'math', question:'Mediana de {2,4,6,8,10}:', options:['4','5','6','7'], answer:2, explanation:'El central de 5 ordenados es 6' },
  { id:25, subject:'math', question:'Solución de x²−5x+6=0:', options:['x=1,6','x=2,3','x=−2,−3','x=3,4'], answer:1, explanation:'(x−2)(x−3)=0 → x=2 o x=3' },
  { id:26, subject:'math', question:'3/4 de un número es 18. ¿Cuál?', options:['13.5','20','24','27'], answer:2, explanation:'n×3/4=18 → n=24' },
  { id:27, subject:'math', question:'10²+10¹+10⁰ = ?', options:['111','110','1110','100'], answer:0, explanation:'100+10+1=111' },
  { id:28, subject:'math', question:'Suma ángulos internos triángulo:', options:['90°','180°','270°','360°'], answer:1, explanation:'Siempre 180°' },
  { id:29, subject:'math', question:'MCD de 12 y 18:', options:['2','3','6','9'], answer:2, explanation:'El mayor divisor común es 6' },
  { id:30, subject:'math', question:'MCM de 4 y 6:', options:['8','10','12','24'], answer:2, explanation:'El menor múltiplo común es 12' },
  { id:31, subject:'math', question:'Vértice parábola y=ax²+bx+c en x=?', options:['−b/2a','b/2a','−c/a','b/a'], answer:0, explanation:'Fórmula del vértice: x=−b/(2a)' },
  { id:32, subject:'math', question:'1 metro = ? centímetros', options:['10','100','1000','0.1'], answer:1, explanation:'1m = 100cm' },
  { id:33, subject:'math', question:'P(sacar 4 en dado) = ?', options:['1/4','1/6','1/3','1/2'], answer:1, explanation:'6 caras → 1/6' },
  { id:34, subject:'math', question:'5/8 + 3/8 = ?', options:['8/16','1/8','1','2/8'], answer:2, explanation:'8/8 = 1' },
  { id:35, subject:'math', question:'Área triángulo base 10, altura 6:', options:['30','60','16','26'], answer:0, explanation:'(10×6)/2 = 30' },
  { id:36, subject:'math', question:'2/3 de 90:', options:['45','60','30','75'], answer:1, explanation:'90×2/3=60' },
  { id:37, subject:'math', question:'Notación científica de 0.00045:', options:['4.5×10⁻³','4.5×10⁻⁴','45×10⁻⁵','4.5×10⁴'], answer:1, explanation:'0.00045=4.5×10⁻⁴' },
  { id:38, subject:'math', question:'Recta con pendiente 0 es:', options:['Vertical','Diagonal','Horizontal','Curva'], answer:2, explanation:'m=0 → horizontal' },
  { id:39, subject:'math', question:'Lados de un dodecágono:', options:['10','11','12','13'], answer:2, explanation:'Dodeca=doce' },
  { id:40, subject:'math', question:'√(25+144) = ?', options:['13','14','15','12'], answer:0, explanation:'√169=13' },
  { id:41, subject:'math', question:'4×(3+2)−6 = ?', options:['14','10','26','8'], answer:0, explanation:'4×5−6=14' },
  { id:42, subject:'math', question:'Suma primeros 10 naturales:', options:['45','50','55','60'], answer:2, explanation:'n(n+1)/2=55' },
  { id:43, subject:'math', question:'tan(45°) = ?', options:['0','0.5','1','√2'], answer:2, explanation:'sen/cos = 1' },
  { id:44, subject:'math', question:'Número racional es:', options:['Solo enteros','Solo decimales','Cociente de dos enteros','Raíces irracionales'], answer:2, explanation:'p/q con q≠0' },
  { id:45, subject:'math', question:'Derivada de x³:', options:['x²','3x','3x²','x⁴/4'], answer:2, explanation:'d/dx(xⁿ)=nxⁿ⁻¹ → 3x²' },
  { id:46, subject:'math', question:'1000 ÷ 0.1 = ?', options:['100','1000','10000','10'], answer:2, explanation:'÷0.1 = ×10 → 10000' },
  { id:47, subject:'math', question:'270° en radianes:', options:['π','3π/2','2π','π/2'], answer:1, explanation:'270×π/180=3π/2' },
  { id:48, subject:'math', question:'Fibonacci: 1,1,2,3,5,¿sigue?', options:['6','7','8','9'], answer:2, explanation:'3+5=8' },
  { id:49, subject:'math', question:'P(A)=0.3, P(B)=0.4 independientes → P(A∩B)=?', options:['0.7','0.12','0.1','0.04'], answer:1, explanation:'0.3×0.4=0.12' },
  { id:50, subject:'math', question:'−5−(−3) = ?', options:['−8','−2','2','8'], answer:1, explanation:'−5+3=−2' },
 
  /* LECTURA CRÍTICA */
  { id:51, subject:'reading', question:'"Todos los cisnes son blancos" es razonamiento:', options:['Deductivo','Inductivo','Analógico','Hipotético'], answer:1, explanation:'De casos particulares a general → inductivo' },
  { id:52, subject:'reading', question:'"El viento suspira en la tarde" es:', options:['Metáfora','Hipérbole','Personificación','Símil'], answer:2, explanation:'Atribuir acción humana a algo inanimado' },
  { id:53, subject:'reading', question:'En texto argumentativo, la tesis es:', options:['La conclusión','La posición que se defiende','Un ejemplo','La introducción'], answer:1, explanation:'La tesis es el punto de vista central' },
  { id:54, subject:'reading', question:'La ironía consiste en:', options:['Insultar','Decir lo contrario con intención crítica','Definir','Narrar'], answer:1, explanation:'Expresa lo opuesto con intención crítica o humorística' },
  { id:55, subject:'reading', question:'"Más rápido que un rayo" es:', options:['Metáfora','Hipérbole','Símil','Anáfora'], answer:2, explanation:'Comparación con "más...que" = símil' },
  { id:56, subject:'reading', question:'Función principal del texto expositivo:', options:['Narrar ficción','Persuadir','Informar y explicar','Entretener'], answer:2, explanation:'Informa y explica con objetividad' },
  { id:57, subject:'reading', question:'La metáfora se diferencia del símil porque:', options:['Usa "como"','Identifica sin nexo comparativo','Solo habla de animales','Es más exagerada'], answer:1, explanation:'La metáfora no usa "como"' },
  { id:58, subject:'reading', question:'El narrador omnisciente:', options:['Solo narra lo que ve','Conoce pensamientos de todos','Es un personaje','Narra en 2ª persona'], answer:1, explanation:'Conoce todo, incluyendo pensamientos' },
  { id:59, subject:'reading', question:'"Mil veces te lo he dicho" es:', options:['Metáfora','Símil','Hipérbole','Eufemismo'], answer:2, explanation:'Exageración con fines expresivos' },
  { id:60, subject:'reading', question:'Coherencia textual es:', options:['Buena ortografía','Unidad temática lógica','Vocabulario amplio','Oraciones cortas'], answer:1, explanation:'Unidad de sentido y lógica del texto' },
  { id:61, subject:'reading', question:'Argumento de autoridad usa:', options:['Estadísticas','Opiniones de expertos','Ejemplos de vida','Comparaciones'], answer:1, explanation:'Cita expertos para dar credibilidad' },
  { id:62, subject:'reading', question:'Función poética del lenguaje se enfoca en:', options:['Informar','La forma del mensaje','Dar órdenes','Expresar emociones'], answer:1, explanation:'Se centra en la forma del mensaje' },
  { id:63, subject:'reading', question:'Una receta de cocina es texto:', options:['Narrativo','Argumentativo','Instructivo','Expositivo'], answer:2, explanation:'Da pasos a seguir → instructivo' },
  { id:64, subject:'reading', question:'La idea principal suele estar en:', options:['Última oración','Oración temática','Los ejemplos','Los conectores'], answer:1, explanation:'La oración temática la enuncia' },
  { id:65, subject:'reading', question:'Antónimo de "efímero":', options:['Breve','Fugaz','Eterno','Rápido'], answer:2, explanation:'Efímero=pasajero; antónimo=eterno' },
  { id:66, subject:'reading', question:'La aliteración es repetición de:', options:['Palabras al inicio','Sonidos consonánticos','Versos completos','Ideas'], answer:1, explanation:'Repetición de sonidos similares' },
  { id:67, subject:'reading', question:'El eufemismo reemplaza una expresión:', options:['Técnica','Desagradable o tabú','Extranjera','Poética'], answer:1, explanation:'Suaviza expresiones incómodas' },
  { id:68, subject:'reading', question:'"Llegué, vi, vencí" es:', options:['Anáfora','Asíndeton','Polisíndeton','Quiasmo'], answer:1, explanation:'Omisión de conjunciones = asíndeton' },
  { id:69, subject:'reading', question:'Propósito del texto publicitario:', options:['Informar','Narrar','Persuadir para vender','Exponer teorías'], answer:2, explanation:'Convencer al consumidor' },
  { id:70, subject:'reading', question:'"Sin embargo" conecta ideas de:', options:['Adición','Contraste','Causa','Conclusión'], answer:1, explanation:'Introduce idea contraria' },
  { id:71, subject:'reading', question:'Voz pasiva en "El libro fue escrito por el autor":', options:['Sujeto actúa','Sujeto recibe acción','Tiempo futuro','Modo subjuntivo'], answer:1, explanation:'El sujeto gramatical recibe la acción' },
  { id:72, subject:'reading', question:'Intertextualidad es:', options:['Texto entre párrafos','Relación de un texto con otros previos','Traducción literal','Cita directa'], answer:1, explanation:'Cuando un texto alude a otros textos' },
  { id:73, subject:'reading', question:'El clímax narrativo es:', options:['El inicio','Momento de mayor tensión','La resolución','Presentación de personajes'], answer:1, explanation:'Punto de máxima tensión dramática' },
  { id:74, subject:'reading', question:'Falacia ad hominem ataca:', options:['El argumento','La evidencia','La persona','Las estadísticas'], answer:2, explanation:'Ataca a la persona, no al argumento' },
  { id:75, subject:'reading', question:'La anáfora consiste en:', options:['Repetición al final','Repetición al inicio de versos','Comparación directa','Exageración'], answer:1, explanation:'Repetición al comienzo de versos o frases' },
  { id:76, subject:'reading', question:'"Por consiguiente" es conector de:', options:['Contraste','Adición','Conclusión','Causa'], answer:2, explanation:'Introduce conclusión o consecuencia' },
  { id:77, subject:'reading', question:'Denotación de una palabra:', options:['Significado emocional','Significado literal','Etimología','Sinónimo'], answer:1, explanation:'Significado objetivo del diccionario' },
  { id:78, subject:'reading', question:'Oxímoron une:', options:['Ideas similares','Ideas contradictorias','Sonidos similares','Versos con rima'], answer:1, explanation:'"Silencio ensordecedor" — contradicción interna' },
  { id:79, subject:'reading', question:'Estructura básica del texto argumentativo:', options:['Inicio–nudo–desenlace','Tesis–argumentos–conclusión','Problema–causas–efectos','Tema–desarrollo–resumen'], answer:1, explanation:'Tesis → argumentos → conclusión' },
  { id:80, subject:'reading', question:'La paradoja expresa:', options:['Una exageración','Idea contradictoria pero verdadera','Una comparación','Un insulto'], answer:1, explanation:'"Muero porque no muero" — contradicción con sentido profundo' },
 
  /* INGLÉS */
  { id:81,  subject:'english', question:'Choose the correct sentence:', options:["She don't like coffee.","She doesn't likes coffee.","She doesn't like coffee.","She not like coffee."], answer:2, explanation:"doesn't + base verb with she/he/it." },
  { id:82,  subject:'english', question:'Past tense of "go":', options:['goed','gone','went','goes'], answer:2, explanation:'Irregular: go → went.' },
  { id:83,  subject:'english', question:'"The book ___ written by García Márquez."', options:['is','was','were','be'], answer:1, explanation:'Passive simple past = was.' },
  { id:84,  subject:'english', question:'"Although" means:', options:['por lo tanto','además','aunque','sin embargo'], answer:2, explanation:'"Although" = aunque.' },
  { id:85,  subject:'english', question:'Present Perfect sentence:', options:['I went to Paris.','I have been to Paris.','I go to Paris.','I was going.'], answer:1, explanation:'have/has + past participle.' },
  { id:86,  subject:'english', question:'"Courage" in Spanish:', options:['crueldad','valentía','curiosidad','cortesía'], answer:1, explanation:'"Courage" = valentía.' },
  { id:87,  subject:'english', question:'Plural of "child":', options:['childs','childes','children','childer'], answer:2, explanation:'Irregular plural: children.' },
  { id:88,  subject:'english', question:'"You are a student, ___?"', options:["aren't you","is not you","are you","don't you"], answer:0, explanation:'Positive → negative tag: aren\'t you.' },
  { id:89,  subject:'english', question:'"I will call you" is in:', options:['Simple past','Present continuous','Simple future','Past perfect'], answer:2, explanation:'will + base verb = simple future.' },
  { id:90,  subject:'english', question:'Superlative of "good":', options:['gooder','more good','better','the best'], answer:3, explanation:'Irregular: good → better → the best.' },
  { id:91,  subject:'english', question:'"She ___ studying when I arrived."', options:['was','is','were','has been'], answer:0, explanation:'Past continuous = was + -ing.' },
  { id:92,  subject:'english', question:'"Neither…nor" expresses:', options:['Adición','Choice','Negative alternatives','Contrast'], answer:2, explanation:'Links two negative alternatives.' },
  { id:93,  subject:'english', question:'Passive of "They built the bridge":', options:['The bridge builds.','The bridge was built.','The bridge is building.','The bridge built.'], answer:1, explanation:'was/were + past participle.' },
  { id:94,  subject:'english', question:'"I wish I ___ fly."', options:['can','could','will','would'], answer:1, explanation:'"Wish" + past (could) = unreal wish.' },
  { id:95,  subject:'english', question:'Which is a conjunction?', options:['quickly','beautiful','although','run'], answer:2, explanation:'"Although" is a subordinating conjunction.' },
  { id:96,  subject:'english', question:'Synonym of "enormous":', options:['tiny','huge','average','narrow'], answer:1, explanation:'"Huge" = very large.' },
  { id:97,  subject:'english', question:'"By the time she arrived, I ___ eaten."', options:['have','had','was','did'], answer:1, explanation:'Past perfect = had + p.p.' },
  { id:98,  subject:'english', question:'Prefix "un-" means:', options:['again','before','not','under'], answer:2, explanation:'un- = not.' },
  { id:99,  subject:'english', question:'Adverb in "She sings beautifully":', options:['She','sings','beautifully','none'], answer:2, explanation:'"Beautifully" modifies the verb.' },
  { id:100, subject:'english', question:'"If I were rich, I ___ travel."', options:['will','would','can','should'], answer:1, explanation:'2nd conditional: would + base verb.' },
 
  /* CIENCIAS */
  { id:101, subject:'science', question:'H₂O tiene:', options:['2O y 1H','2H y 1O','3H y 1O','1H y 2O'], answer:1, explanation:'2 hidrógenos y 1 oxígeno' },
  { id:102, subject:'science', question:'Velocidad de la luz ≈:', options:['300 km/s','300.000 km/s','30.000 km/s','3.000 km/s'], answer:1, explanation:'c ≈ 3×10⁸ m/s' },
  { id:103, subject:'science', question:'F = m×a es la:', options:['1ª ley de Newton','2ª ley de Newton','3ª ley de Newton','Ley de Hooke'], answer:1, explanation:'Segunda Ley de Newton' },
  { id:104, subject:'science', question:'"Fe" en la tabla periódica es:', options:['Flúor','Fósforo','Hierro','Francio'], answer:2, explanation:'Fe = Ferrum = Hierro' },
  { id:105, subject:'science', question:'Fotosíntesis produce:', options:['CO₂ y H₂O','O₂ y glucosa','N₂ y glucosa','O₂ y CO₂'], answer:1, explanation:'6CO₂+6H₂O+luz → glucosa+6O₂' },
  { id:106, subject:'science', question:'pH del agua pura:', options:['6','7','8','9'], answer:1, explanation:'pH=7 es neutro' },
  { id:107, subject:'science', question:'Unidad de fuerza en el SI:', options:['Joule','Pascal','Newton','Watt'], answer:2, explanation:'Newton (N)' },
  { id:108, subject:'science', question:'Cromosomas en célula humana normal:', options:['23','44','46','48'], answer:2, explanation:'46 cromosomas (23 pares)' },
  { id:109, subject:'science', question:'ADN tiene forma de:', options:['Cadena simple','Doble hélice','Esfera','Cilindro'], answer:1, explanation:'Doble hélice (Watson y Crick, 1953)' },
  { id:110, subject:'science', question:'Organelo que produce energía:', options:['Núcleo','Ribosoma','Mitocondria','Vacuola'], answer:2, explanation:'Mitocondria produce ATP' },
  { id:111, subject:'science', question:'Tabla periódica organiza por:', options:['Masa','Número atómico','Color','T° de fusión'], answer:1, explanation:'Por número atómico creciente' },
  { id:112, subject:'science', question:'Gas más abundante en atmósfera:', options:['Oxígeno','CO₂','Nitrógeno','Argón'], answer:2, explanation:'N₂ ≈ 78% de la atmósfera' },
  { id:113, subject:'science', question:'Gravedad terrestre ≈:', options:['9.8 m/s²','8.9 m/s²','10.8 m/s²','9.0 m/s²'], answer:0, explanation:'g ≈ 9.8 m/s²' },
  { id:114, subject:'science', question:'NaCl tiene enlace:', options:['Covalente','Metálico','Iónico','Hidrógeno'], answer:2, explanation:'Na⁺ y Cl⁻ → enlace iónico' },
  { id:115, subject:'science', question:'Respiración celular ocurre en:', options:['Cloroplasto','Núcleo','Mitocondria','Membrana'], answer:2, explanation:'Mitocondria realiza respiración aerobia' },
  { id:116, subject:'science', question:'Unidad básica de la materia:', options:['Molécula','Átomo','Célula','Núcleo'], answer:1, explanation:'El átomo es la unidad química básica' },
  { id:117, subject:'science', question:'Conservación de la energía: la energía...', options:['Se crea','Se destruye','Se transforma','Desaparece'], answer:2, explanation:'No se crea ni destruye, se transforma' },
  { id:118, subject:'science', question:'El sonido es onda:', options:['Electromagnética','Transversal','Longitudinal','Gravitacional'], answer:2, explanation:'Onda mecánica longitudinal' },
  { id:119, subject:'science', question:'División celular para reproducción sexual:', options:['Mitosis','Meiosis','Fisión','Gemación'], answer:1, explanation:'Meiosis produce gametos' },
  { id:120, subject:'science', question:'Carga del protón:', options:['Negativa','Positiva','Neutra','Variable'], answer:1, explanation:'Protón = carga positiva (+1)' },
 
  /* SOCIALES */
  { id:121, subject:'sociales', question:'Constitución de Colombia vigente, año:', options:['1886','1991','1978','2002'], answer:1, explanation:'Promulgada el 4 de julio de 1991' },
  { id:122, subject:'sociales', question:'Líderes de la Independencia de Colombia:', options:['Bolívar y Santander','Antonio Nariño','Camilo Torres','Policarpa Salavarrieta'], answer:0, explanation:'Bolívar y Santander lideraron el proceso' },
  { id:123, subject:'sociales', question:'Independencia de Colombia declarada en:', options:['1810','1819','1821','1830'], answer:0, explanation:'20 de julio de 1810, Bogotá' },
  { id:124, subject:'sociales', question:'Batalla de Boyacá:', options:['7 ago 1819','20 jul 1810','17 dic 1819','25 sep 1828'], answer:0, explanation:'7 de agosto de 1819 selló la independencia' },
  { id:125, subject:'sociales', question:'Colombia tiene cuántos departamentos:', options:['28','30','32','34'], answer:2, explanation:'32 departamentos + Distrito Capital' },
  { id:126, subject:'sociales', question:'La Revolución Francesa comenzó en:', options:['1776','1789','1799','1815'], answer:1, explanation:'1789: toma de la Bastilla' },
  { id:127, subject:'sociales', question:'La Revolución Industrial fue:', options:['Revolución política','Transformación económica s. XVIII-XIX','Guerra mundial','Movimiento artístico'], answer:1, explanation:'Transformación de producción artesanal a industrial' },
  { id:128, subject:'sociales', question:'Primera Guerra Mundial comenzó:', options:['1910','1914','1918','1939'], answer:1, explanation:'Julio 1914 tras el asesinato del Archiduque' },
  { id:129, subject:'sociales', question:'El capitalismo se basa en:', options:['Propiedad estatal','Propiedad privada y mercado libre','Planificación central','Colectivismo'], answer:1, explanation:'Propiedad privada, libre mercado, ganancia' },
  { id:130, subject:'sociales', question:'Democracia significa:', options:['Gobierno de un rey','Gobierno del pueblo','Gobierno militar','Gobierno de expertos'], answer:1, explanation:'Demos=pueblo, kratos=gobierno' },
  { id:131, subject:'sociales', question:'Capital de Colombia:', options:['Medellín','Cali','Bogotá','Barranquilla'], answer:2, explanation:'Bogotá D.C.' },
  { id:132, subject:'sociales', question:'PIB significa:', options:['Programa de inversión','Valor total bienes/servicios del país','Partido político','Sistema de impuestos'], answer:1, explanation:'Producto Interno Bruto' },
  { id:133, subject:'sociales', question:'La ONU fue fundada en:', options:['1919','1939','1945','1950'], answer:2, explanation:'24 de octubre de 1945' },
  { id:134, subject:'sociales', question:'Inflación es:', options:['Caída de precios','Aumento sostenido de precios','Crecimiento económico','Desempleo'], answer:1, explanation:'Aumento generalizado y sostenido de precios' },
  { id:135, subject:'sociales', question:'Primer país en dar voto a la mujer:', options:['Francia','Reino Unido','Nueva Zelanda','EE.UU.'], answer:2, explanation:'Nueva Zelanda, 1893' },
  { id:136, subject:'sociales', question:'Caída del Imperio Romano de Occidente:', options:['476 d.C.','1453','1492','410 d.C.'], answer:0, explanation:'476 d.C., deposición de Rómulo Augústulo' },
  { id:137, subject:'sociales', question:'La Edad Media comprende:', options:['S. V–XV','S. I–IV','S. XV–XVIII','S. XVIII–XIX'], answer:0, explanation:'476 (caída Roma) → 1453 (caída Constantinopla)' },
  { id:138, subject:'sociales', question:'La tutela en Colombia protege:', options:['Propiedad','Derechos fundamentales','Contratos','Impuestos'], answer:1, explanation:'Art. 86: protección de derechos fundamentales' },
  { id:139, subject:'sociales', question:'Colón llegó a América en:', options:['1492','1498','1494','1500'], answer:0, explanation:'12 de octubre de 1492' },
  { id:140, subject:'sociales', question:'La OEA fue fundada en:', options:['1945','1948','1960','1969'], answer:1, explanation:'En Bogotá, 1948' },
];
 
/* Las preguntas extra se combinan en init — ver preguntas.js */
 
/* ── LOGROS ──────────────────────────────────────── */
const ACHIEVEMENTS = [
  { id:'first',      icon:'⚡', name:'Primer Paso',        desc:'Responde tu primera pregunta',              check:(u)=>u.totalAnswered>=1 },
  { id:'streak3',    icon:'🔥', name:'Racha de 3',          desc:'3 respuestas correctas seguidas',          check:(u)=>u.maxStreak>=3 },
  { id:'streak5',    icon:'💥', name:'Imparable',           desc:'5 respuestas correctas seguidas',          check:(u)=>u.maxStreak>=5 },
  { id:'streak10',   icon:'🌊', name:'Maestro de Racha',    desc:'10 respuestas correctas seguidas',         check:(u)=>u.maxStreak>=10 },
  { id:'lv5',        icon:'⭐', name:'Rango D',             desc:'Alcanza nivel 5',                           check:(u)=>u.level>=5 },
  { id:'lv10',       icon:'🌟', name:'Rango C',             desc:'Alcanza nivel 10',                          check:(u)=>u.level>=10 },
  { id:'lv20',       icon:'👑', name:'Rango A',             desc:'Alcanza nivel 20',                          check:(u)=>u.level>=20 },
  { id:'lv25',       icon:'💎', name:'Leyenda',             desc:'Alcanza nivel 25',                          check:(u)=>u.level>=25 },
  { id:'allSubj',    icon:'🎓', name:'Polifacético',        desc:'Responde preguntas de las 5 materias',      check:(u)=>Object.keys(u.subjectStats||{}).length>=5 },
  { id:'c10',        icon:'🎯', name:'Diez Correctas',      desc:'10 respuestas correctas',                   check:(u)=>u.totalCorrect>=10 },
  { id:'c50',        icon:'🏆', name:'Maestro',             desc:'50 respuestas correctas',                   check:(u)=>u.totalCorrect>=50 },
  { id:'c100',       icon:'🔱', name:'Centurión',           desc:'100 respuestas correctas',                  check:(u)=>u.totalCorrect>=100 },
  { id:'a100',       icon:'📚', name:'Erudito',             desc:'100 preguntas respondidas',                 check:(u)=>u.totalAnswered>=100 },
  { id:'a250',       icon:'🧠', name:'Enciclopedia',        desc:'250 preguntas respondidas',                 check:(u)=>u.totalAnswered>=250 },
  { id:'top1',       icon:'🥇', name:'Campeón',             desc:'Finaliza #1 en una temporada',              check:(u)=>!!(u.medals?.gold>0) },
  { id:'top2',       icon:'🥈', name:'Subcampeón',          desc:'Top 2 en una temporada',                    check:(u)=>!!(u.medals?.gold>0||u.medals?.silver>0) },
  { id:'top3',       icon:'🥉', name:'Podio',               desc:'Top 3 en una temporada',                    check:(u)=>!!(u.medals?.gold>0||u.medals?.silver>0||u.medals?.bronze>0) },
  { id:'duelo1',     icon:'⚔️', name:'Primer Duelo',        desc:'Completa tu primer duelo',                  check:(u)=>u.duelosJugados>=1 },
  { id:'duelo10',    icon:'🗡️', name:'Duelista',            desc:'Completa 10 duelos',                        check:(u)=>u.duelosJugados>=10 },
  { id:'duelo_win',  icon:'🏅', name:'Victoria Gloriosa',   desc:'Gana tu primer duelo',                      check:(u)=>u.duelosGanados>=1 },
];
 
/* ── STORAGE ─────────────────────────────────────── */
const Store = {
  get(k)      { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k,v)    { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  remove(k)   { localStorage.removeItem(k); },
};
 
/* ── CREAR USUARIO ───────────────────────────────── */
function newUser(email, displayName, uid) {
  return {
    uid,                           // Firebase Auth UID
    email: email.toLowerCase(),
    username: email.toLowerCase(), // alias para compatibilidad
    displayName,
    banned: false,
    level:1, xp:0, totalXP:0,
    totalAnswered:0, totalCorrect:0,
    streak:0, maxStreak:0,
    achievements:[], subjectStats:{},
    medals:{ gold:0, silver:0, bronze:0 },
    duelosJugados:0, duelosGanados:0,
    dominioNombre: null,
    monedas: 0,
    lastLoginDay: '',
    correctasHoy: 0,
    correctasHoyFecha: '',
    poderesComprados: {},
    createdAt: Date.now(), lastLogin: Date.now(),
  };
}
 
/* ══════════════════════════════════════════════════
   FIREBASE AUTH HELPERS
══════════════════════════════════════════════════ */
const FBAuth = {
  // Registrar con correo y contraseña
  async signUp(email, password) {
    const r = await fetch(`${FB_AUTH}/accounts:signUp?key=${FB_APIKEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const d = await r.json();
    if (d.error) return { ok: false, error: traducirError(d.error.message) };
    return { ok: true, uid: d.localId, idToken: d.idToken, email: d.email };
  },
 
  // Login con correo y contraseña
  async signIn(email, password) {
    const r = await fetch(`${FB_AUTH}/accounts:signInWithPassword?key=${FB_APIKEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const d = await r.json();
    if (d.error) return { ok: false, error: traducirError(d.error.message) };
    return { ok: true, uid: d.localId, idToken: d.idToken, email: d.email };
  },
 
  // Enviar correo de recuperación de contraseña
  async resetPassword(email) {
    const r = await fetch(`${FB_AUTH}/accounts:sendOobCode?key=${FB_APIKEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestType: 'PASSWORD_RESET', email }),
    });
    const d = await r.json();
    if (d.error) return { ok: false, error: traducirError(d.error.message) };
    return { ok: true };
  },
};
 
function traducirError(code) {
  const map = {
    'EMAIL_EXISTS':             'Este correo ya está registrado.',
    'INVALID_LOGIN_CREDENTIALS':'Correo o contraseña incorrectos.',
    'USER_NOT_FOUND':           'Correo no registrado.',
    'WRONG_PASSWORD':           'Contraseña incorrecta.',
    'WEAK_PASSWORD':            'La contraseña debe tener al menos 6 caracteres.',
    'INVALID_EMAIL':            'El correo no es válido.',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'Demasiados intentos. Espera un momento.',
    'USER_DISABLED':            '⛔ Esta cuenta ha sido suspendida.',
  };
  return map[code] || 'Error: ' + code;
}
 
/* ══════════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════════ */
const Auth = {
  SK: 'ei_session',
  UK: 'ei_users',
 
  users()       { return Store.get(this.UK) || {}; },
  saveUsers(u)  { Store.set(this.UK, u); },
  me()          { const s = Store.get(this.SK); return s ? this.users()[s] || null : null; },
  isAdmin(u)    { return u?.email?.toLowerCase() === ADMIN || u?.username?.toLowerCase() === ADMIN; },
 
  async register(email, displayName, password) {
    email = email.toLowerCase().trim();
    if (!displayName?.trim()) return { ok:false, error:'Ingresa tu nombre.' };
    if (password.length < 6)  return { ok:false, error:'La contraseña debe tener al menos 6 caracteres.' };
 
    // Crear usuario en Firebase Auth
    const fbRes = await FBAuth.signUp(email, password);
    if (!fbRes.ok) return fbRes;
 
    const u = newUser(email, displayName.trim(), fbRes.uid);
    const users = this.users();
    users[email] = u;
    this.saveUsers(users);
    Store.set(this.SK, email);
 
    // Guardar perfil en Firebase Realtime DB
    try {
      await fetch(`${FB}/users/${fbRes.uid}.json`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          email, displayName: u.displayName, uid: fbRes.uid,
          level:1, banned:false, createdAt: u.createdAt,
        }),
      });
    } catch {}
 
    // Push al leaderboard desde el registro
    Leaderboard.push(u);
    return { ok:true };
  },
 
  async loginAsync(email, password) {
    email = email.toLowerCase().trim();
 
    // Autenticar con Firebase Auth
    const fbRes = await FBAuth.signIn(email, password);
    if (!fbRes.ok) return fbRes;
 
    // Cargar o crear perfil local
    const users = this.users();
    let u = users[email];
    if (!u) {
      // Primera vez en este dispositivo — crear perfil local desde Firebase
      try {
        const r = await fetch(`${FB}/users/${fbRes.uid}.json`);
        const remote = await r.json();
        if (remote) {
          u = { ...newUser(email, remote.displayName||email, fbRes.uid), ...remote };
        } else {
          u = newUser(email, email.split('@')[0], fbRes.uid);
        }
      } catch {
        u = newUser(email, email.split('@')[0], fbRes.uid);
      }
    }
 
    // Verificar ban
    if (u.banned) return { ok:false, error:'⛔ Esta cuenta ha sido suspendida.' };
 
    // Actualizar datos de sesión
    u.uid       = fbRes.uid;
    u.lastLogin = Date.now();
    if (!u.medals)           u.medals = { gold:0, silver:0, bronze:0 };
    if (!u.poderesComprados) u.poderesComprados = {};
 
    // Monedas diarias
    const hoy = new Date().toISOString().split('T')[0];
    if ((u.lastLoginDay||'') !== hoy) {
      u.lastLoginDay = hoy;
      u.monedas = (u.monedas||0) + 2;
      Store.set('ei_login_coin_notif', '1');
    }
 
    users[email] = u;
    this.saveUsers(users);
    Store.set(this.SK, email);
 
    // Push inmediato al leaderboard (para que aparezca en ranking)
    Leaderboard.push(u);
 
    // Verificar ban en segundo plano
    setTimeout(async () => {
      try {
        const r = await fetch(`${FB}/bans/${fbRes.uid}.json`);
        const d = await r.json();
        if (d?.banned) { Auth.logout(); window.location.href='index.html?banned=1'; return; }
      } catch {}
    }, 200);
 
    return { ok:true };
  },
 
  // Recuperación de contraseña via Firebase (envía email)
  async resetPassword(email) {
    return FBAuth.resetPassword(email.toLowerCase().trim());
  },
 
  async banUser(email, admin) {
    if (!this.isAdmin(admin)) return { ok:false, error:'Sin permisos.' };
    if (email === ADMIN)      return { ok:false, error:'No puedes banearte a ti mismo.' };
    const uid = this.users()[email]?.uid || email;
    try {
      await fetch(`${FB}/bans/${uid}.json`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ banned:true, at:Date.now(), by:admin.email }),
      });
      await fetch(`${FB}/users/${uid}/banned.json`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(true),
      });
    } catch {}
    const users = this.users();
    if (users[email]) { users[email].banned = true; this.saveUsers(users); }
    return { ok:true };
  },
 
  async unbanUser(email, admin) {
    if (!this.isAdmin(admin)) return { ok:false, error:'Sin permisos.' };
    const uid = this.users()[email]?.uid || email;
    try {
      await fetch(`${FB}/bans/${uid}.json`, { method:'DELETE' });
      await fetch(`${FB}/users/${uid}/banned.json`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(false),
      });
    } catch {}
    const users = this.users();
    if (users[email]) { users[email].banned = false; this.saveUsers(users); }
    return { ok:true };
  },
 
  async getBans() {
    try { const r = await fetch(`${FB}/bans.json`); return await r.json() || {}; } catch { return {}; }
  },
 
  async getAllGlobal() {
    try {
      const r    = await fetch(`${FB}/users.json`);
      const data = await r.json();
      if (!data) return [];
      const local = this.users();
      return Object.values(data).map(fb => {
        // Buscar en local por email o uid
        const loc = local[fb.email] || local[fb.username] || {};
        return {
          username:    fb.email || fb.username,
          displayName: fb.displayName || loc.displayName || 'Sin nombre',
          level:       loc.level || fb.level || 1,
          banned:      fb.banned || loc.banned || false,
          uid:         fb.uid || '',
        };
      });
    } catch {
      // Fallback: usuarios locales
      return Object.values(this.users()).map(u=>({
        username: u.email || u.username,
        displayName: u.displayName,
        level: u.level||1,
        banned: u.banned||false,
      }));
    }
  },
 
  setDominioNombre(nombre) {
    const u = this.me();
    if (!u)              return { ok:false, error:'No hay sesión activa.' };
    if (!nombre || nombre.trim().length < 3) return { ok:false, error:'El nombre debe tener al menos 3 caracteres.' };
    if (u.dominioNombre) return { ok:false, error:'Ya tienes un nombre asignado: "'+u.dominioNombre+'".' };
    if (u.level < 40)    return { ok:false, error:'Necesitas nivel 40.' };
    u.dominioNombre = nombre.trim();
    this.updateUser(u);
    // Guardar también en Firebase users/
    try {
      fetch(`${FB}/users/${u.username}/dominioNombre.json`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(nombre.trim()),
      });
    } catch {}
    return { ok:true };
  },
 
  updateUser(u) {
    const users = this.users();
    users[u.username] = u;
    this.saveUsers(users);
    // Sincronizar progreso completo a Firebase (sin contraseña)
    try {
      fetch(`${FB}/progress/${u.username}.json`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          username:      u.username,
          displayName:   u.displayName,
          level:         u.level,
          xp:            u.xp||0,
          totalXP:       u.totalXP||0,
          totalAnswered: u.totalAnswered||0,
          totalCorrect:  u.totalCorrect||0,
          streak:        u.streak||0,
          maxStreak:     u.maxStreak||0,
          subjectStats:  u.subjectStats||{},
          achievements:  u.achievements||[],
          medals:        u.medals||{gold:0,silver:0,bronze:0},
          duelosJugados: u.duelosJugados||0,
          duelosGanados: u.duelosGanados||0,
          dominioNombre: u.dominioNombre||null,
          updatedAt:     Date.now(),
        }),
      });
    } catch {}
  },
  logout()      { Store.remove(this.SK); },
 
  setDominioNombre(nombre) {
    const u = this.me();
    if (!u)              return { ok:false, error:'No autenticado.' };
    if (u.level < 40)    return { ok:false, error:'Necesitas nivel 40 para nombrar tu Dominio.' };
    if (u.dominioNombre) return { ok:false, error:'Ya tienes un nombre asignado: "'+u.dominioNombre+'".' };
    if (!nombre?.trim()) return { ok:false, error:'El nombre no puede estar vacío.' };
    u.dominioNombre = nombre.trim();
    this.updateUser(u);
    Leaderboard.push(u);
    return { ok:true };
  },
};
 
/* ══════════════════════════════════════════════════
   PROGRESS
══════════════════════════════════════════════════ */
const Progress = {
  getRank(lv)   { return RANKS.find(r=>lv>=r.min&&lv<=r.max) || RANKS.at(-1); },
  xpPct(u)      { return Math.min(Math.round((u.xp/xpNecesaria(u.level))*100), 100); },
 
  addXP(u, amt) {
    u.xp += amt; u.totalXP += amt;
    const leveled = [];
    while (u.xp >= xpNecesaria(u.level)) {
      u.xp -= xpNecesaria(u.level);
      u.level++;
      leveled.push(u.level);
    }
    Auth.updateUser(u);
    Leaderboard.push(u);
    return leveled;
  },
 
  record(u, correct, subject, qId) {
    u.totalAnswered = (u.totalAnswered||0) + 1;
    u.subjectStats  = u.subjectStats || {};
    if (!u.subjectStats[subject]) u.subjectStats[subject] = { answered:0, correct:0 };
    u.subjectStats[subject].answered++;
    if (correct) {
      u.totalCorrect = (u.totalCorrect||0) + 1;
      u.subjectStats[subject].correct++;
      u.streak     = (u.streak||0) + 1;
      u.maxStreak  = Math.max(u.maxStreak||0, u.streak);
      // Anti-hack: registrar respuesta correcta para esta pregunta
      if (qId !== undefined) QEngine.recordCorrect(u, qId);
    } else {
      u.streak = 0;
    }
    Auth.updateUser(u);
  },
 
  checkAchievements(u) {
    u.achievements = u.achievements || [];
    const newOnes  = [];
    for (const a of ACHIEVEMENTS) {
      if (!u.achievements.includes(a.id) && a.check(u)) {
        u.achievements.push(a.id);
        newOnes.push(a);
      }
    }
    if (newOnes.length) Auth.updateUser(u);
    return newOnes;
  },
};
 
/* ══════════════════════════════════════════════════
   QUESTION ENGINE  (con anti-hack de repetición)
══════════════════════════════════════════════════ */
const MAX_CORRECT_PER_Q = 3; // máximo de veces que cuenta XP por la misma pregunta
 
const QEngine = {
  _used: [],
  reset() { this._used = []; },
 
  // Cuántas veces el usuario ya respondió correctamente esta pregunta
  _correctCount(u, qId) {
    return (u.qCorrectCounts || {})[qId] || 0;
  },
 
  // Registrar que respondió correctamente
  recordCorrect(u, qId) {
    u.qCorrectCounts = u.qCorrectCounts || {};
    u.qCorrectCounts[qId] = (u.qCorrectCounts[qId] || 0) + 1;
    Auth.updateUser(u);
  },
 
  // ¿Aún da XP esta pregunta para este usuario?
  givesXP(u, qId) {
    return this._correctCount(u, qId) < MAX_CORRECT_PER_Q;
  },
 
  getRandom(subj, u) {
    // Priorizar preguntas que aún dan XP (no saturadas)
    const saturadas = new Set(
      u ? Object.entries(u.qCorrectCounts || {})
        .filter(([,v]) => v >= MAX_CORRECT_PER_Q)
        .map(([k]) => parseInt(k)) : []
    );
 
    let pool = QUESTIONS.filter(q => !this._used.includes(q.id));
    if (subj) pool = pool.filter(q => q.subject === subj);
 
    // Si hay preguntas no saturadas disponibles, preferirlas
    const frescas = pool.filter(q => !saturadas.has(q.id));
    const fuente  = frescas.length > 0 ? frescas : pool;
 
    if (!fuente.length) {
      // Reset del pool usado
      this._used = [];
      const fullPool = subj ? QUESTIONS.filter(q=>q.subject===subj) : [...QUESTIONS];
      const frescos2 = fullPool.filter(q => !saturadas.has(q.id));
      const base = frescos2.length > 0 ? frescos2 : fullPool;
      const q = base[Math.floor(Math.random() * base.length)];
      this._used.push(q.id);
      return q;
    }
 
    const q = fuente[Math.floor(Math.random() * fuente.length)];
    this._used.push(q.id);
    return q;
  },
 
  shuffle(q) {
    const arr = q.options.map((opt,i) => ({ opt, orig:i }));
    for (let i=arr.length-1; i>0; i--) { const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    return { options: arr.map(x=>x.opt), correctIndex: arr.findIndex(x=>x.orig===q.answer) };
  },
};
 
/* ══════════════════════════════════════════════════
   LEADERBOARD (Firebase)
══════════════════════════════════════════════════ */
const Leaderboard = {
  async push(u) {
    if (!u) return;
    // Usar UID como clave si existe, sino email (no exponer correo como clave visible)
    const key = u.uid || (u.email||u.username||'').replace(/[.#$/[\]]/g,'_');
    try {
      await fetch(`${FB}/leaderboard/${key}.json`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          username:    u.email || u.username,
          displayName: u.displayName,
          level:       u.level,
          xp:          u.xp||0,
          totalXP:     u.totalXP||0,
          totalAnswered: u.totalAnswered||0,
          totalCorrect:  u.totalCorrect||0,
          streak:      u.streak||0,
          maxStreak:   u.maxStreak||0,
          subjectStats: u.subjectStats||{},
          achievements: u.achievements||[],
          medals:      u.medals||{gold:0,silver:0,bronze:0},
          duelosJugados: u.duelosJugados||0,
          duelosGanados: u.duelosGanados||0,
          dominioNombre: u.dominioNombre||null,
          banned:      u.banned||false,
          createdAt:   u.createdAt||Date.now(),
          updatedAt:   Date.now(),
        }),
      });
    } catch {}
  },
 
  async getTop(n=10) {
    try {
      const r    = await fetch(`${FB}/leaderboard.json`);
      const data = await r.json();
      if (!data) return [];
      return Object.values(data).sort((a,b)=>b.totalXP-a.totalXP).slice(0,n);
    } catch {
      return Auth.users() ? Object.values(Auth.users()).sort((a,b)=>(b.totalXP||0)-(a.totalXP||0)).slice(0,n) : [];
    }
  },
 
  async getAll() {
    try {
      const r    = await fetch(`${FB}/leaderboard.json`);
      const data = await r.json();
      if (!data) return [];
      return Object.values(data).sort((a,b)=>b.totalXP-a.totalXP);
    } catch { return []; }
  },
 
  async resetSeason() {
    try {
      const top = await this.getTop(3);
      const medalMap = ['gold','silver','bronze'];
      for (let i=0; i<top.length; i++) {
        const p  = top[i];
        const mt = medalMap[i];
        const pkey = p.uid || (p.username||'').replace(/[.#$/[\]]/g,'_');
        const r  = await fetch(`${FB}/leaderboard/${pkey}.json`);
        const e  = await r.json() || {};
        e.medals = e.medals || {gold:0,silver:0,bronze:0};
        e.medals[mt]++;
        await fetch(`${FB}/leaderboard/${pkey}.json`, {
          method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(e),
        });
        const lu = Auth.users();
        const lk = p.username;
        if (lu[lk]) { lu[lk].medals=lu[lk].medals||{gold:0,silver:0,bronze:0}; lu[lk].medals[mt]++; Auth.saveUsers(lu); }
      }
      // Reset all
      const all = await fetch(`${FB}/leaderboard.json`).then(r=>r.json()).catch(()=>({})) || {};
      const reset = {};
      for (const [k,v] of Object.entries(all)) {
        reset[k] = { ...v, level:1, xp:0, totalXP:0, totalCorrect:0, totalAnswered:0, streak:0, maxStreak:0, subjectStats:{}, updatedAt:Date.now() };
      }
      await fetch(`${FB}/leaderboard.json`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(reset) });
      // Señal global
      const ts = Date.now();
      await fetch(`${FB}/season_reset.json`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ at:ts, by:ADMIN }) });
      Store.set('ei_last_reset', ts);
      // Local reset
      const lu = Auth.users();
      for (const u of Object.values(lu)) { u.level=1;u.xp=0;u.totalXP=0;u.totalAnswered=0;u.totalCorrect=0;u.streak=0;u.maxStreak=0;u.subjectStats={}; }
      Auth.saveUsers(lu);
      return { ok:true, top3:top };
    } catch(e) { return { ok:false, error:e.message }; }
  },
};
 
/* ══════════════════════════════════════════════════
   ANNOUNCEMENTS
══════════════════════════════════════════════════ */
const Announcements = {
  async publish(text, admin) {
    if (!Auth.isAdmin(admin)) return { ok:false, error:'Sin permisos.' };
    if (!text?.trim())        return { ok:false, error:'Mensaje vacío.' };
    const entry = { text:text.trim(), author:admin.displayName, createdAt:Date.now(), id:Date.now().toString() };
    try {
      await fetch(`${FB}/announcements/${entry.id}.json`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(entry) });
    } catch { const l=Store.get('ei_ann')||{}; l[entry.id]=entry; Store.set('ei_ann',l); }
    return { ok:true };
  },
  async getNew(u) {
    const seen  = Store.get('ei_seen_'+u.username) || [];
    const since = Date.now() - 48*60*60*1000;
    let all = [];
    try { const r=await fetch(`${FB}/announcements.json`); const d=await r.json(); if(d) all=Object.values(d); }
    catch { all = Object.values(Store.get('ei_ann')||{}); }
    return all.filter(a=>a.createdAt>since&&!seen.includes(a.id)).sort((a,b)=>b.createdAt-a.createdAt);
  },
  markSeen(u, ids) { const k='ei_seen_'+u.username; const s=Store.get(k)||[]; Store.set(k,[...new Set([...s,...ids])]); },
  async delete(id, admin) {
    if (!Auth.isAdmin(admin)) return { ok:false };
    try { await fetch(`${FB}/announcements/${id}.json`, { method:'DELETE' }); }
    catch { const l=Store.get('ei_ann')||{}; delete l[id]; Store.set('ei_ann',l); }
    return { ok:true };
  },
  async getAll() {
    try { const r=await fetch(`${FB}/announcements.json`); const d=await r.json(); return d?Object.values(d).sort((a,b)=>b.createdAt-a.createdAt):[]; }
    catch { return Object.values(Store.get('ei_ann')||{}).sort((a,b)=>b.createdAt-a.createdAt); }
  },
};
 
/* ══════════════════════════════════════════════════
   MASCOTA  (Huevo → Cría → Adulto)
   Se alimenta con racha de días consecutivos
══════════════════════════════════════════════════ */
const PET_STAGES = [
  { stage:0, name:'Huevo',   emoji:'🥚', desc:'Responde 3 días seguidos para eclosionar',  days:0  },
  { stage:1, name:'Cría',    emoji:'🐣', desc:'Sigue respondiendo para que crezca',         days:3  },
  { stage:2, name:'Joven',   emoji:'🐥', desc:'Ya casi es adulto...',                        days:7  },
  { stage:3, name:'Adulto',  emoji:'🦅', desc:'¡Tu mascota está en su máximo esplendor!',   days:14 },
];
 
const Pet = {
  // Actualiza la racha de días y retorna el estado actual
  update(u) {
    u.pet = u.pet || { dayStreak:0, lastDate:'', stage:0, totalDays:0 };
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const last  = u.pet.lastDate;
 
    if (last === today) return u.pet; // ya jugó hoy
 
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (last === yesterday) {
      // Día consecutivo
      u.pet.dayStreak++;
      u.pet.totalDays++;
    } else if (last === '') {
      // Primera vez
      u.pet.dayStreak = 1;
      u.pet.totalDays = 1;
    } else {
      // Rompió la racha
      u.pet.dayStreak = 1;
      u.pet.totalDays = (u.pet.totalDays||0) + 1;
    }
 
    u.pet.lastDate = today;
 
    // Calcular etapa según racha de días consecutivos
    const stg = [...PET_STAGES].reverse().find(s => u.pet.dayStreak >= s.days);
    u.pet.stage = stg ? stg.stage : 0;
 
    Auth.updateUser(u);
    return u.pet;
  },
 
  getStageInfo(stage) {
    return PET_STAGES[stage] || PET_STAGES[0];
  },
 
  // Mensaje de estado según racha
  getStatus(pet) {
    const streak = pet.dayStreak || 0;
    if (streak === 0) return 'Huérfano... necesita atención 😔';
    if (streak === 1) return '¡Bienvenido! Primer día 🌱';
    if (streak < 3)   return `${streak} días seguidos — ¡sigue así!`;
    if (streak < 7)   return `${streak} días seguidos — está creciendo 🌟`;
    if (streak < 14)  return `${streak} días seguidos — ¡increíble constancia! 💪`;
    return `${streak} días seguidos — ¡Leyenda! 🔥`;
  },
};
 
/* ══════════════════════════════════════════════════
   ECONOMÍA — Monedas y Tienda
══════════════════════════════════════════════════ */
 
const SHOP_ITEMS = [
  {
    id: 'maldiccion',
    name: 'Maldición Persistente',
    icon: '👁️‍🗨️',
    desc: 'Cada fallo del rival te da +5% XP (máx 25%). Se cancela con 2 aciertos seguidos del rival.',
    precio: 15,
    tipo: 'duelo',
    usos: 1,
    reqLevel: 20,
  },
  {
    id: 'inversa',
    name: 'Energía Inversa',
    icon: '🔄',
    desc: 'Al fallar recuperas 50% de la XP. Si fallas dos seguidas, la segunda recuperación baja a 25%.',
    precio: 20,
    tipo: 'ambos',
    usos: 2,
    reqLevel: 15,
  },
  {
    id: 'bruja',
    name: 'Factor Bruja',
    icon: '🎲',
    desc: 'Efecto aleatorio al inicio de ronda: 80% positivo (más XP, tiempo, elimina opción), 20% negativo.',
    precio: 25,
    tipo: 'duelo',
    usos: 1,
    reqLevel: 25,
  },
  {
    id: 'contrato',
    name: 'Contrato Vinculante',
    icon: '📜',
    desc: 'Elige un sacrificio y una recompensa. Alto riesgo, alta recompensa. 1 uso por duelo.',
    precio: 30,
    tipo: 'duelo',
    usos: 1,
    reqLevel: 30,
  },
  {
    id: 'bendicion',
    name: 'Bendición del Prodigio',
    icon: '✨',
    desc: 'Respuestas correctas automáticas y opciones incorrectas eliminadas. 1 uso/día. XP a la mitad. Solo nivel 100 o 500 monedas.',
    precio: 500,
    tipo: 'duelo',
    usos: 1,
    reqLevel: 100,
    esLegendario: true,
  },
];
 
const CONTRATO_OPCIONES = {
  sacrificios: [
    { id:'s1', label:'−50% XP si fallas',  icon:'⚠️', desc:'Pierdes la mitad de la XP de la ronda si no cumples' },
    { id:'s2', label:'Bajas 2 niveles',     icon:'📉', desc:'Si fallas antes de cumplir, bajas 2 niveles' },
    { id:'s3', label:'Bajas 5 niveles',     icon:'💀', desc:'Si fallas antes de cumplir, bajas 5 niveles' },
  ],
  recompensas: [
    { id:'r1', label:'+100% XP',            icon:'⚡', desc:'El doble de XP al completar el contrato', mult:2 },
    { id:'r2', label:'+150% XP',            icon:'🔥', desc:'2.5× XP al completar el contrato',        mult:2.5 },
    { id:'r3', label:'+250% XP + monedas',  icon:'👑', desc:'3.5× XP y +5 monedas al completar',       mult:3.5, bonusCoins:5 },
  ],
};
 
const Economy = {
  // Dar monedas
  add(u, cantidad, motivo='') {
    u.monedas = (u.monedas||0) + cantidad;
    Auth.updateUser(u);
    if (motivo) console.log('[Coins] +'+cantidad+' ('+motivo+') → total:', u.monedas);
    return u.monedas;
  },
 
  // Gastar monedas
  spend(u, cantidad) {
    if ((u.monedas||0) < cantidad) return { ok:false, error:'Monedas insuficientes.' };
    u.monedas -= cantidad;
    Auth.updateUser(u);
    return { ok:true };
  },
 
  // Registrar respuesta correcta y dar moneda si corresponde
  registrarCorrecta(u) {
    const hoy = new Date().toISOString().split('T')[0];
    if ((u.correctasHoyFecha||'') !== hoy) {
      u.correctasHoy = 0;
      u.correctasHoyFecha = hoy;
    }
    u.correctasHoy = (u.correctasHoy||0) + 1;
    let ganada = false;
    if (u.correctasHoy % 5 === 0) {
      u.monedas = (u.monedas||0) + 1;
      ganada = true;
    }
    Auth.updateUser(u);
    return { ganada, total: u.monedas, correctasHoy: u.correctasHoy };
  },
 
  // Comprar poder en la tienda
  comprar(u, itemId) {
    const item = SHOP_ITEMS.find(i=>i.id===itemId);
    if (!item) return { ok:false, error:'Item no encontrado.' };
    if (u.level < item.reqLevel && !(item.id==='bendicion' && u.level>=100))
      return { ok:false, error:'Necesitas nivel '+item.reqLevel+'.' };
    // Bendición: gratis para nivel 100
    const precio = (item.id==='bendicion' && u.level>=100) ? 0 : item.precio;
    if (precio > 0) {
      const r = this.spend(u, precio);
      if (!r.ok) return r;
    }
    u.poderesComprados = u.poderesComprados||{};
    if (item.id==='bendicion') {
      u.poderesComprados.bendicion = true;
    } else {
      u.poderesComprados[itemId] = (u.poderesComprados[itemId]||0) + item.usos;
    }
    Auth.updateUser(u);
    return { ok:true, gratis: precio===0 };
  },
 
  // Usar un poder comprado
  usar(u, itemId) {
    u.poderesComprados = u.poderesComprados||{};
    if (itemId==='bendicion') {
      if (!u.poderesComprados.bendicion && u.level<100)
        return { ok:false, error:'No tienes la Bendición del Prodigio.' };
      // Verificar cooldown 1×/día
      const hoy = new Date().toISOString().split('T')[0];
      if (u.poderesComprados.bendicionUsadaHoy===hoy)
        return { ok:false, error:'Ya usaste la Bendición hoy. Vuelve mañana.' };
      u.poderesComprados.bendicionUsadaHoy = hoy;
      Auth.updateUser(u);
      return { ok:true };
    }
    const usos = u.poderesComprados[itemId]||0;
    if (usos<=0) return { ok:false, error:'No tienes usos de este poder.' };
    u.poderesComprados[itemId] = usos-1;
    Auth.updateUser(u);
    return { ok:true };
  },
 
  tieneUsos(u, itemId) {
    u.poderesComprados = u.poderesComprados||{};
    if (itemId==='bendicion') {
      const hoy = new Date().toISOString().split('T')[0];
      return (u.poderesComprados.bendicion||u.level>=100) && u.poderesComprados.bendicionUsadaHoy!==hoy;
    }
    return (u.poderesComprados[itemId]||0)>0;
  },
};
 
// Efectos de los poderes comprados en duelo
const SHOP_EFFECTS = {
  // Maldición Persistente
  maldiccion: {
    marcas: 0, // cuántas marcas tiene el rival
    rivalAciertosConsecutivos: 0,
    bonusXP(u) { return Math.min(this.marcas*0.05, 0.25); },
    onRivalFalla() { this.marcas = Math.min(this.marcas+1, 5); this.rivalAciertosConsecutivos=0; },
    onRivalAcierta() {
      this.rivalAciertosConsecutivos++;
      if (this.rivalAciertosConsecutivos>=2) { this.marcas=0; this.rivalAciertosConsecutivos=0; }
    },
    reset() { this.marcas=0; this.rivalAciertosConsecutivos=0; },
  },
  // Energía Inversa
  inversa: {
    fallosConsecutivos: 0,
    recuperar(xpBase) {
      this.fallosConsecutivos++;
      const pct = this.fallosConsecutivos>=2 ? 0.25 : 0.5;
      return Math.floor(xpBase * pct);
    },
    onAcierta() { this.fallosConsecutivos=0; },
    reset() { this.fallosConsecutivos=0; },
  },
  // Factor Bruja
  bruja: {
    getEfecto() {
      const r = Math.random();
      if (r < 0.20) return { tipo:'negativo', desc:'−30% XP esta ronda', mult:0.7 };
      if (r < 0.45) return { tipo:'positivo', desc:'+30% XP esta ronda', mult:1.3 };
      if (r < 0.65) return { tipo:'positivo', desc:'+50% XP esta ronda', mult:1.5 };
      if (r < 0.80) return { tipo:'positivo', desc:'Doble recompensa XP', mult:2.0 };
      return { tipo:'positivo', desc:'Elimina 1 opción incorrecta', mult:1.0, elimina:true };
    },
  },
};
 
// ── FACTOR BRUJA: efectos aleatorios ──
const BRUJA_EFECTOS_POS = [
  { desc:'+30% XP esta ronda',       mult:1.3 },
  { desc:'+50% XP esta ronda',       mult:1.5 },
  { desc:'Doble XP esta ronda',      mult:2.0 },
  { desc:'Elimina 1 opción falsa',   mult:1.0, elimina:true },
  { desc:'+10 seg de tiempo',        mult:1.0, tiempo:10 },
];
const BRUJA_EFECTOS_NEG = [
  { desc:'−30% XP esta ronda',       mult:0.7 },
  { desc:'−20% XP esta ronda',       mult:0.8 },
];
 
// Contrato Vinculante estado
const Contrato = {
  activo: false,
  sacrificioId: null,
  recompensaId: null,
  aciertosNecesarios: 3,
  aciertosActuales: 0,
  cumplido: false,
  fallado: false,
  init(sacId, recId, aciertos=3) {
    this.activo=true; this.sacrificioId=sacId; this.recompensaId=recId;
    this.aciertosNecesarios=aciertos; this.aciertosActuales=0;
    this.cumplido=false; this.fallado=false;
  },
  onAcierta() {
    if (!this.activo||this.cumplido||this.fallado) return;
    this.aciertosActuales++;
    if (this.aciertosActuales>=this.aciertosNecesarios) this.cumplido=true;
  },
  onFalla(u) {
    if (!this.activo||this.cumplido||this.fallado) return;
    this.fallado=true;
    // Aplicar castigo
    const sac = CONTRATO_OPCIONES.sacrificios.find(s=>s.id===this.sacrificioId);
    if (!sac) return;
    if (sac.id==='s1') {
      // −50% XP de la ronda: se maneja externamente
    } else if (sac.id==='s2') {
      u.level = Math.max(1, u.level-2);
      u.xp = 0;
      Auth.updateUser(u);
      Leaderboard.push(Auth.me());
    } else if (sac.id==='s3') {
      u.level = Math.max(1, u.level-5);
      u.xp = 0;
      Auth.updateUser(u);
      Leaderboard.push(Auth.me());
    }
  },
  getMultiplicador() {
    if (!this.cumplido) return 1;
    const rec = CONTRATO_OPCIONES.recompensas.find(r=>r.id===this.recompensaId);
    return rec ? rec.mult : 1;
  },
  getBonusCoins() {
    if (!this.cumplido) return 0;
    const rec = CONTRATO_OPCIONES.recompensas.find(r=>r.id===this.recompensaId);
    return rec?.bonusCoins||0;
  },
  reset() { this.activo=false; this.cumplido=false; this.fallado=false; this.aciertosActuales=0; },
};
 
// Combinar preguntas base + extra (si preguntas.js está cargado)
(function() {
  if (typeof QUESTIONS_EXTRA !== 'undefined') {
    QUESTIONS.push(...QUESTIONS_EXTRA);
  }
})();
 
const Sound = {
  _ctx: null,
  ctx() { if(!this._ctx) try{this._ctx=new(window.AudioContext||window.webkitAudioContext)()}catch{}; return this._ctx; },
  beep(freq,dur,type='sine',vol=0.15) {
    const c=this.ctx(); if(!c) return;
    const o=c.createOscillator(), g=c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+dur);
    o.start(c.currentTime); o.stop(c.currentTime+dur);
  },
  correct()   { this.beep(523,.08); setTimeout(()=>this.beep(659,.08),80); setTimeout(()=>this.beep(784,.15),160); },
  incorrect() { this.beep(200,.25,'sawtooth',.12); },
  levelUp()   { [523,587,659,784,880,1047].forEach((f,i)=>setTimeout(()=>this.beep(f,.12,'triangle',.15),i*70)); },
  click()     { this.beep(800,.04,'square',.08); },
};
 
/* ══════════════════════════════════════════════════
   NOTIFY
══════════════════════════════════════════════════ */
const Notify = {
  show(msg, type='', dur=3000) {
    const c = document.getElementById('notification-container');
    if (!c) return;
    const el = document.createElement('div');
    el.className = 'notification ' + type;
    el.textContent = msg;
    c.appendChild(el);
    setTimeout(() => { el.classList.add('notif-out'); setTimeout(()=>el.remove(),300); }, dur);
  },
  success(m)  { this.show(m,'success'); },
  error(m)    { this.show(m,'error',4000); },
  warning(m)  { this.show(m,'warning'); },
  levelUp(lv,rank) { this.show(`↑ ¡Nivel ${lv}! — ${rank}`,'levelup',5000); },
  achievement(a)   { this.show(`${a.icon} Logro: ${a.name}`,'',4500); },
};
 
/* ══════════════════════════════════════════════════
   GUARDS + SEASON CHECK
══════════════════════════════════════════════════ */
async function checkBan(username) {
  const u = Auth.me();
  const uid = u?.uid || username;
  try {
    const r = await fetch(`${FB}/bans/${uid}.json`);
    const d = await r.json();
    if (d?.banned) { Auth.logout(); window.location.href='index.html?banned=1'; return true; }
  } catch {}
  return false;
}
 
async function checkSeasonReset(username) {
  try {
    const r  = await fetch(`${FB}/season_reset.json`);
    const d  = await r.json();
    if (!d?.at) return;
    const last = Store.get('ei_last_reset') || 0;
    if (d.at > last) {
      const users = Auth.users();
      if (users[username]) {
        const u = users[username];
        u.level=1;u.xp=0;u.totalXP=0;u.totalAnswered=0;u.totalCorrect=0;u.streak=0;u.maxStreak=0;u.subjectStats={};
        Auth.saveUsers(users);
      }
      Store.set('ei_last_reset', d.at);
    }
  } catch {}
}
 
async function checkAdminEdit(u) {
  if (!u?.uid) return;
  try {
    const r = await fetch(`${FB}/admin_edits/${u.uid}.json`);
    const edit = await r.json();
    if (!edit || !edit.ts) return;
    // Solo aplicar si es más reciente que el último check
    const lastCheck = parseInt(Store.get('ei_last_admin_edit_'+u.uid)||'0');
    if (edit.ts <= lastCheck) return;
    Store.set('ei_last_admin_edit_'+u.uid, String(edit.ts));
    // Aplicar cambios al usuario local
    const users = Auth.users();
    const key   = u.email || u.username;
    if (!users[key]) return;
    if (edit.level   !== undefined) users[key].level   = edit.level;
    if (edit.totalXP !== undefined) users[key].totalXP = edit.totalXP;
    if (edit.xp      !== undefined) users[key].xp      = edit.xp;
    if (edit.monedas !== undefined) users[key].monedas = edit.monedas;
    if (edit.streak  !== undefined) users[key].streak  = edit.streak;
    Auth.saveUsers(users);
    // Notificar al jugador
    console.log('[EDU-ICFES] Admin actualizó tu perfil → Nv.'+edit.level);
    // Si hay Notify disponible, mostrar mensaje
    if (typeof Notify !== 'undefined') {
      setTimeout(()=>Notify.show('⚡ Tu perfil fue actualizado por el admin','levelup',4000), 1500);
    }
    // Recargar HUD si estamos en main
    if (typeof updateHUD === 'function') setTimeout(updateHUD, 200);
  } catch {}
}
 
function requireAuth() {
  const u = Auth.me();
  if (!u) { window.location.href = 'index.html'; return null; }
  checkBan(u.username);
  checkSeasonReset(u.username);
  checkAdminEdit(u); // verificar si admin editó este usuario
  return u;
}
 
function redirectIfLogged() {
  if (Auth.me()) window.location.href = 'main.html';
}
 
// Mostrar mensaje de ban en login
(function() {
  if (window.location.search.includes('banned=1')) {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => Notify.error('Tu cuenta ha sido suspendida por el administrador.'), 500);
    });
  }
})();
 
/* ══════════════════════════════════════════════════
   HELPERS DOM
══════════════════════════════════════════════════ */
const $ = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => [...c.querySelectorAll(s)];
 
/* ══════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════ */
// Sincronizar todos los usuarios locales al leaderboard de Firebase
async function syncAllLocalToLeaderboard() {
  const users = Auth.users();
  const all   = Object.values(users);
  for (const u of all) {
    await Leaderboard.push(u);
  }
  return all.length;
}
 
Object.assign(window, {
  Auth, Progress, QEngine, Leaderboard, Announcements, Sound, Notify, Store,
  syncAllLocalToLeaderboard,
  Economy, SHOP_ITEMS, CONTRATO_OPCIONES, SHOP_EFFECTS, Contrato,
  SUBJECTS, ACHIEVEMENTS, RANKS, QUESTIONS, ADMIN, FB,
  xpNecesaria, recompensaXP, XP_STREAK_BONUS,
  $, $$, requireAuth, redirectIfLogged, checkBan, checkSeasonReset, checkAdminEdit,
});
 
// Verificación de carga correcta
console.log('[EDU-ICFES] Preguntas cargadas:', QUESTIONS.length, '| Firebase:', FB);
