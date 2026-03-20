/* ============================================
   EDU-ICFES — app.js  v2.1
   Core logic: auth, progress, questions, achievements
   Admin: nico57 | Recomendaciones: 3204005807
   ============================================ */

'use strict';

/* ─── CONSTANTS ──────────────────────────────── */
const XP_BONUS_STREAK = 10;

function xpNecesaria(nivel) {
  if (nivel < 5) return 100 + nivel * 20;
  return Math.floor(200 * Math.pow(1.15, nivel - 5));
}

function recompensaXP(nivel) {
  return 20 + (nivel * 5);
}

const ADMIN_USERNAME = 'nico57';

const RANKS = [
  { min: 1,  max: 4,  rank: 'E', label: 'Aprendiz',     color: '#888' },
  { min: 5,  max: 9,  rank: 'D', label: 'Explorador',   color: '#00aaff' },
  { min: 10, max: 14, rank: 'C', label: 'Combatiente',  color: '#00ff88' },
  { min: 15, max: 19, rank: 'B', label: 'Guerrero',     color: '#9d4edd' },
  { min: 20, max: 24, rank: 'A', label: 'Élite',        color: '#ff6b35' },
  { min: 25, max: 99, rank: 'S', label: 'Leyenda',      color: '#ffd700' },
];

const SUBJECTS = {
  math:     { label: 'Matemáticas',    icon: '∑', tag: 'tag-math',     color: '#4dcfff' },
  reading:  { label: 'Lectura Crítica', icon: '📖', tag: 'tag-reading',  color: '#c77dff' },
  english:  { label: 'Inglés',          icon: '🌐', tag: 'tag-english',  color: '#00ff88' },
  science:  { label: 'Ciencias',        icon: '⚗', tag: 'tag-science',  color: '#ff8c5a' },
  sociales: { label: 'Sociales',        icon: '🌎', tag: 'tag-sociales', color: '#ffd700' },
};

/* ─── QUESTION BANK (50 por tema = 250 total) ─── */
const QUESTIONS = [

  /* ══════════════════════════════════════
     MATEMÁTICAS  (IDs 1–50)
  ══════════════════════════════════════ */
  { id:1, subject:'math', question:'Si f(x) = 3x² − 2x + 1, ¿cuál es f(2)?', options:['9','11','13','7'], answer:0, explanation:'f(2) = 3(4) − 4 + 1 = 12 − 4 + 1 = 9' },
  { id:2, subject:'math', question:'¿Cuánto es el 15% de 240?', options:['32','36','40','24'], answer:1, explanation:'15/100 × 240 = 36' },
  { id:3, subject:'math', question:'Un triángulo tiene lados 5, 12 y 13 cm. ¿Qué tipo es?', options:['Acutángulo','Obtusángulo','Rectángulo','Equilátero'], answer:2, explanation:'5² + 12² = 169 = 13². Cumple Pitágoras → rectángulo.' },
  { id:4, subject:'math', question:'Resuelve: log₂(32) = ?', options:['4','5','6','3'], answer:1, explanation:'2⁵ = 32 → log₂(32) = 5' },
  { id:5, subject:'math', question:'(x + 3)(x − 3) = ?', options:['x² + 6x + 9','x² − 6','x² − 9','x² + 9'], answer:2, explanation:'Diferencia de cuadrados: a² − b²' },
  { id:6, subject:'math', question:'Si 2x + 5 = 17, entonces x = ?', options:['5','6','7','4'], answer:1, explanation:'2x = 12 → x = 6' },
  { id:7, subject:'math', question:'√144 = ?', options:['11','12','13','14'], answer:1, explanation:'12 × 12 = 144' },
  { id:8, subject:'math', question:'El 30% de un número es 90. ¿Cuál es el número?', options:['250','270','300','330'], answer:2, explanation:'0.30 × n = 90 → n = 300' },
  { id:9, subject:'math', question:'¿Cuánto es 2³ × 2⁴?', options:['2⁷','2¹²','4⁷','2⁶'], answer:0, explanation:'Al multiplicar potencias de igual base se suman los exponentes: 3+4=7' },
  { id:10, subject:'math', question:'La pendiente de la recta y = 3x − 5 es:', options:['−5','3','5','−3'], answer:1, explanation:'En y = mx + b, m es la pendiente → m = 3' },
  { id:11, subject:'math', question:'¿Cuál es el valor de π (pi) aproximado?', options:['3.14159','3.12345','3.16227','3.14142'], answer:0, explanation:'π ≈ 3.14159... es una constante irracional' },
  { id:12, subject:'math', question:'La media aritmética de 4, 7, 10, 13 es:', options:['7','8','8.5','9'], answer:2, explanation:'(4+7+10+13)/4 = 34/4 = 8.5' },
  { id:13, subject:'math', question:'¿Cuánto es 7! (factorial)?', options:['2520','5040','720','40320'], answer:1, explanation:'7! = 7×6×5×4×3×2×1 = 5040' },
  { id:14, subject:'math', question:'Si un rectángulo mide 8 × 5, su área es:', options:['26','40','13','32'], answer:1, explanation:'Área = base × altura = 8 × 5 = 40' },
  { id:15, subject:'math', question:'¿Cuánto es sen(90°)?', options:['0','0.5','1','−1'], answer:2, explanation:'sen(90°) = 1 es un valor fundamental de trigonometría' },
  { id:16, subject:'math', question:'¿Cuánto es cos(0°)?', options:['0','1','−1','0.5'], answer:1, explanation:'cos(0°) = 1' },
  { id:17, subject:'math', question:'El volumen de un cubo de lado 3 es:', options:['9','18','27','12'], answer:2, explanation:'V = l³ = 3³ = 27' },
  { id:18, subject:'math', question:'Simplifica: (x² × x³) / x⁴', options:['x','x²','x³','x⁵'], answer:0, explanation:'x²⁺³ / x⁴ = x⁵/x⁴ = x¹ = x' },
  { id:19, subject:'math', question:'¿Cuántos primos hay entre 1 y 20?', options:['6','7','8','9'], answer:2, explanation:'2,3,5,7,11,13,17,19 → 8 primos' },
  { id:20, subject:'math', question:'Si un tren viaja a 80 km/h, ¿cuánto tarda en recorrer 200 km?', options:['2 h','2.5 h','3 h','1.5 h'], answer:1, explanation:'t = d/v = 200/80 = 2.5 horas' },
  { id:21, subject:'math', question:'¿Cuánto es 0.25 como fracción?', options:['1/2','1/3','1/4','1/5'], answer:2, explanation:'0.25 = 25/100 = 1/4' },
  { id:22, subject:'math', question:'El perímetro de un círculo de radio 5 es:', options:['10π','5π','25π','2π'], answer:0, explanation:'P = 2πr = 2π(5) = 10π' },
  { id:23, subject:'math', question:'¿Cuánto es (−3)²?', options:['−9','6','9','−6'], answer:2, explanation:'(−3)² = (−3)×(−3) = +9' },
  { id:24, subject:'math', question:'La mediana de {2, 4, 6, 8, 10} es:', options:['4','5','6','7'], answer:2, explanation:'El valor central de 5 elementos ordenados es el tercero: 6' },
  { id:25, subject:'math', question:'¿Cuál es la solución de x² − 5x + 6 = 0?', options:['x=1 y x=6','x=2 y x=3','x=−2 y x=−3','x=3 y x=4'], answer:1, explanation:'Factorizando: (x−2)(x−3) = 0 → x=2 o x=3' },
  { id:26, subject:'math', question:'Si 3/4 de un número es 18, el número es:', options:['13.5','20','24','27'], answer:2, explanation:'n × 3/4 = 18 → n = 18 × 4/3 = 24' },
  { id:27, subject:'math', question:'¿Cuánto es 10² + 10¹ + 10⁰?', options:['111','110','1110','100'], answer:0, explanation:'100 + 10 + 1 = 111' },
  { id:28, subject:'math', question:'La suma de ángulos internos de un triángulo es:', options:['90°','180°','270°','360°'], answer:1, explanation:'La suma de los ángulos internos de cualquier triángulo es 180°' },
  { id:29, subject:'math', question:'¿Cuánto es el MCD de 12 y 18?', options:['2','3','6','9'], answer:2, explanation:'Divisores comunes: 1,2,3,6. El mayor es 6.' },
  { id:30, subject:'math', question:'¿Cuánto es el MCM de 4 y 6?', options:['8','10','12','24'], answer:2, explanation:'El menor múltiplo común de 4 y 6 es 12' },
  { id:31, subject:'math', question:'En la ecuación y = ax² + bx + c, el vértice está en x = ?', options:['−b/2a','b/2a','−c/a','b/a'], answer:0, explanation:'La fórmula del vértice de una parábola es x = −b/(2a)' },
  { id:32, subject:'math', question:'¿Cuántos centímetros tiene un metro?', options:['10','100','1000','0.1'], answer:1, explanation:'1 m = 100 cm (centi = centésima parte)' },
  { id:33, subject:'math', question:'Si lanzas un dado, ¿cuál es la probabilidad de sacar un 4?', options:['1/4','1/6','1/3','1/2'], answer:1, explanation:'Un dado tiene 6 caras, la probabilidad de cualquier cara es 1/6' },
  { id:34, subject:'math', question:'¿Cuánto es 5/8 + 3/8?', options:['8/16','1/8','1','2/8'], answer:2, explanation:'5/8 + 3/8 = 8/8 = 1' },
  { id:35, subject:'math', question:'El área de un triángulo de base 10 y altura 6 es:', options:['30','60','16','26'], answer:0, explanation:'A = (base × altura)/2 = (10×6)/2 = 30' },
  { id:36, subject:'math', question:'¿Cuánto es 2/3 de 90?', options:['45','60','30','75'], answer:1, explanation:'90 × 2/3 = 60' },
  { id:37, subject:'math', question:'La notación científica de 0.00045 es:', options:['4.5 × 10⁻³','4.5 × 10⁻⁴','45 × 10⁻⁵','4.5 × 10⁴'], answer:1, explanation:'0.00045 = 4.5 × 10⁻⁴' },
  { id:38, subject:'math', question:'Si una recta tiene pendiente 0, es:', options:['Vertical','Diagonal','Horizontal','Curva'], answer:2, explanation:'Pendiente = 0 indica una recta horizontal' },
  { id:39, subject:'math', question:'¿Cuántos lados tiene un dodecágono?', options:['10','11','12','13'], answer:2, explanation:'Dodeca = doce. Un dodecágono tiene 12 lados.' },
  { id:40, subject:'math', question:'Resuelve: √(25 + 144)', options:['13','14','15','12'], answer:0, explanation:'25 + 144 = 169. √169 = 13' },
  { id:41, subject:'math', question:'¿Cuánto es 4 × (3 + 2) − 6?', options:['14','10','26','8'], answer:0, explanation:'4 × 5 − 6 = 20 − 6 = 14 (respetar jerarquía)' },
  { id:42, subject:'math', question:'La suma de los primeros 10 números naturales es:', options:['45','50','55','60'], answer:2, explanation:'Fórmula: n(n+1)/2 = 10×11/2 = 55' },
  { id:43, subject:'math', question:'¿Cuánto es tan(45°)?', options:['0','0.5','1','√2'], answer:2, explanation:'tan(45°) = sen(45°)/cos(45°) = 1' },
  { id:44, subject:'math', question:'¿Qué es un número racional?', options:['Solo enteros','Solo decimales','Cociente de dos enteros','Raíces irracionales'], answer:2, explanation:'Un número racional se puede expresar como p/q con q≠0' },
  { id:45, subject:'math', question:'La derivada de f(x) = x³ es:', options:['x²','3x','3x²','x⁴/4'], answer:2, explanation:'d/dx(xⁿ) = n·xⁿ⁻¹ → d/dx(x³) = 3x²' },
  { id:46, subject:'math', question:'¿Cuánto es 1000 dividido entre 0.1?', options:['100','1000','10000','10'], answer:2, explanation:'1000 ÷ 0.1 = 1000 × 10 = 10000' },
  { id:47, subject:'math', question:'Un ángulo de 270° en radianes equivale a:', options:['π','3π/2','2π','π/2'], answer:1, explanation:'270° × π/180° = 3π/2 radianes' },
  { id:48, subject:'math', question:'La sucesión de Fibonacci comienza: 1, 1, 2, 3, 5, ¿cuál sigue?', options:['6','7','8','9'], answer:2, explanation:'Cada término es la suma de los dos anteriores: 3+5=8' },
  { id:49, subject:'math', question:'Si P(A) = 0.3 y P(B) = 0.4 y son independientes, P(A∩B) = ?', options:['0.7','0.12','0.1','0.04'], answer:1, explanation:'P(A∩B) = P(A) × P(B) = 0.3 × 0.4 = 0.12' },
  { id:50, subject:'math', question:'¿Cuánto es −5 − (−3)?', options:['−8','−2','2','8'], answer:1, explanation:'−5 − (−3) = −5 + 3 = −2' },

  /* ══════════════════════════════════════
     LECTURA CRÍTICA  (IDs 51–100)
  ══════════════════════════════════════ */
  { id:51, subject:'reading', question:'"Todos los cisnes son blancos" es razonamiento:', options:['Deductivo','Inductivo','Analógico','Hipotético'], answer:1, explanation:'De observaciones particulares a conclusión general → inductivo' },
  { id:52, subject:'reading', question:'"El viento suspira en la tarde". ¿Qué figura retórica es?', options:['Metáfora','Hipérbole','Personificación','Símil'], answer:2, explanation:'Atribuir una acción humana a algo inanimado es personificación' },
  { id:53, subject:'reading', question:'En un texto argumentativo, la tesis es:', options:['La conclusión','La posición que se defiende','Un ejemplo','La introducción'], answer:1, explanation:'La tesis es el punto de vista central que se argumenta' },
  { id:54, subject:'reading', question:'La ironía consiste en decir lo contrario de lo que se piensa para:', options:['Insultar','Criticar o bromear','Definir','Narrar'], answer:1, explanation:'La ironía expresa lo opuesto con intención crítica o humorística' },
  { id:55, subject:'reading', question:'"Más rápido que un rayo" es:', options:['Metáfora','Hipérbole','Símil','Anáfora'], answer:2, explanation:'Comparación usando "más... que" = símil' },
  { id:56, subject:'reading', question:'Un texto expositivo tiene como función principal:', options:['Narrar hechos ficticios','Persuadir al lector','Informar y explicar','Entretener con humor'], answer:2, explanation:'El texto expositivo busca informar y explicar con objetividad' },
  { id:57, subject:'reading', question:'La metáfora se diferencia del símil porque:', options:['Usa "como"','Compara sin nexo comparativo','Solo habla de animales','Es más exagerada'], answer:1, explanation:'La metáfora identifica directamente dos elementos sin "como"' },
  { id:58, subject:'reading', question:'El narrador omnisciente:', options:['Solo narra lo que ve','Conoce pensamientos de todos','Es un personaje','Narra en segunda persona'], answer:1, explanation:'El narrador omnisciente conoce todo, incluyendo pensamientos' },
  { id:59, subject:'reading', question:'"Mil veces te lo he dicho" es un ejemplo de:', options:['Metáfora','Símil','Hipérbole','Eufemismo'], answer:2, explanation:'Una exageración con fines expresivos es una hipérbole' },
  { id:60, subject:'reading', question:'¿Qué es la coherencia textual?', options:['Buena ortografía','Unidad temática lógica','Vocabulario amplio','Oraciones cortas'], answer:1, explanation:'La coherencia es la unidad de sentido y lógica del texto' },
  { id:61, subject:'reading', question:'Un argumento de autoridad usa:', options:['Datos estadísticos','Opiniones de expertos','Ejemplos de la vida','Comparaciones históricas'], answer:1, explanation:'El argumento de autoridad cita a expertos para dar credibilidad' },
  { id:62, subject:'reading', question:'La función poética del lenguaje se enfoca en:', options:['Informar','La forma del mensaje en sí','Dar órdenes','Expresar emociones'], answer:1, explanation:'La función poética se centra en la forma, en el mensaje mismo' },
  { id:63, subject:'reading', question:'¿Qué tipo de texto es una receta de cocina?', options:['Narrativo','Argumentativo','Instructivo','Expositivo'], answer:2, explanation:'Los textos instructivos dan pasos a seguir, como recetas' },
  { id:64, subject:'reading', question:'La idea principal de un párrafo generalmente está en:', options:['La última oración','La oración temática (topic sentence)','Los ejemplos','Los conectores'], answer:1, explanation:'La idea principal suele presentarse en la oración temática' },
  { id:65, subject:'reading', question:'¿Cuál es el antónimo de "efímero"?', options:['Breve','Fugaz','Eterno','Rápido'], answer:2, explanation:'Efímero = pasajero, breve. Su antónimo es eterno o duradero.' },
  { id:66, subject:'reading', question:'La aliteración es la repetición de:', options:['Palabras al inicio','Sonidos consonánticos','Versos completos','Ideas'], answer:1, explanation:'Aliteración: repetición de sonidos similares en palabras cercanas' },
  { id:67, subject:'reading', question:'Un texto con estructura "problema–solución" es típico de textos:', options:['Literarios','Periodísticos o académicos','Publicitarios','Epistolares'], answer:1, explanation:'Los textos académicos y periodísticos usan esa estructura frecuentemente' },
  { id:68, subject:'reading', question:'El eufemismo reemplaza una expresión:', options:['Técnica','Desagradable o tabú','Extranjera','Poética'], answer:1, explanation:'El eufemismo suaviza expresiones incómodas o tabú' },
  { id:69, subject:'reading', question:'"Llegué, vi, vencí" es un ejemplo de:', options:['Anáfora','Asíndeton','Polisíndeton','Quiasmo'], answer:1, explanation:'Omisión de conjunciones entre elementos = asíndeton' },
  { id:70, subject:'reading', question:'El propósito de un texto publicitario es:', options:['Informar','Narrar','Persuadir para vender','Exponer teorías'], answer:2, explanation:'El texto publicitario busca convencer al consumidor de comprar o actuar' },
  { id:71, subject:'reading', question:'¿Cuál conecta ideas de contraste?', options:['Además','Sin embargo','Por lo tanto','Es decir'], answer:1, explanation:'"Sin embargo" introduce una idea contraria a la anterior' },
  { id:72, subject:'reading', question:'La voz pasiva en "El libro fue escrito por el autor" indica:', options:['El sujeto actúa','El sujeto recibe la acción','Tiempo futuro','Modo subjuntivo'], answer:1, explanation:'En voz pasiva el sujeto gramatical recibe la acción' },
  { id:73, subject:'reading', question:'¿Qué es la intertextualidad?', options:['Texto entre párrafos','Relación de un texto con otros previos','Traducción literal','Cita directa'], answer:1, explanation:'Intertextualidad: cuando un texto alude o dialoga con otros textos' },
  { id:74, subject:'reading', question:'El clímax en una narración es:', options:['El inicio','El momento de mayor tensión','La resolución','La presentación de personajes'], answer:1, explanation:'El clímax es el punto de máxima tensión dramática' },
  { id:75, subject:'reading', question:'Una falacia ad hominem ataca:', options:['El argumento','La evidencia','La persona que argumenta','Las estadísticas'], answer:2, explanation:'Ad hominem: atacar a la persona en lugar de refutar el argumento' },
  { id:76, subject:'reading', question:'"No podía creer lo que veían mis ojos" usa la figura:', options:['Pleonasmo','Antítesis','Metonimia','Sinestesia'], answer:0, explanation:'Pleonasmo: redundancia que añade énfasis ("mis ojos" ya implica ver)' },
  { id:77, subject:'reading', question:'El tono de un texto se refiere a:', options:['El volumen de la lectura','La actitud del autor frente al tema','La extensión','El vocabulario técnico'], answer:1, explanation:'El tono refleja la actitud emocional del autor: serio, irónico, etc.' },
  { id:78, subject:'reading', question:'Un texto descriptivo busca principalmente:', options:['Argumentar una posición','Contar una historia','Representar detalladamente algo','Dar instrucciones'], answer:2, explanation:'El texto descriptivo pinta con palabras características de personas, lugares o cosas' },
  { id:79, subject:'reading', question:'La anáfora consiste en:', options:['Repetición de palabras al final','Repetición de palabras al inicio de versos','Comparación directa','Exageración'], answer:1, explanation:'Anáfora: repetición de una o varias palabras al comienzo de versos o frases' },
  { id:80, subject:'reading', question:'¿Cuál de estos es un conector de conclusión?', options:['Sin embargo','Además','Por consiguiente','Aunque'], answer:2, explanation:'"Por consiguiente" introduce una conclusión o consecuencia' },
  { id:81, subject:'reading', question:'La denotación de una palabra es:', options:['Su significado emocional','Su significado literal','Su origen etimológico','Su sinónimo'], answer:1, explanation:'Denotación = significado objetivo y literal del diccionario' },
  { id:82, subject:'reading', question:'La connotación es:', options:['El significado literal','El significado emocional/cultural','La etimología','La gramática'], answer:1, explanation:'Connotación = significados asociados, subjetivos o culturales' },
  { id:83, subject:'reading', question:'¿Qué tipo de argumento usa datos numéricos?', options:['De autoridad','De experiencia','Estadístico','Analógico'], answer:2, explanation:'El argumento estadístico usa cifras y porcentajes como evidencia' },
  { id:84, subject:'reading', question:'Un oxímoron une:', options:['Ideas similares','Ideas contradictorias en una expresión','Sonidos similares','Versos con rima'], answer:1, explanation:'Oxímoron: "silencio ensordecedor", "luz oscura" — contradicción interna' },
  { id:85, subject:'reading', question:'El subgénero épico incluye:', options:['Sonetos','Tragedias','Epopeyas','Comedias'], answer:2, explanation:'La epopeya es el subgénero épico por excelencia' },
  { id:86, subject:'reading', question:'En semiótica, el "signo" está compuesto por:', options:['Palabra y oración','Significante y significado','Texto y contexto','Autor y lector'], answer:1, explanation:'Saussure: signo = significante (imagen acústica) + significado (concepto)' },
  { id:87, subject:'reading', question:'La función apelativa del lenguaje busca:', options:['Informar','Expresar emociones','Influir en el receptor','Hablar del código'], answer:2, explanation:'Función apelativa o conativa: influir, convencer o llamar al receptor' },
  { id:88, subject:'reading', question:'¿Cuál es la estructura básica de un texto argumentativo?', options:['Inicio–nudo–desenlace','Tesis–argumentos–conclusión','Problema–causas–efectos','Tema–desarrollo–resumen'], answer:1, explanation:'Tesis → argumentos que la apoyan → conclusión que la refuerza' },
  { id:89, subject:'reading', question:'La sinécdoque consiste en:', options:['Comparar dos cosas','Nombrar el todo por la parte o viceversa','Exagerar una cualidad','Personificar objetos'], answer:1, explanation:'Sinécdoque: "30 velas" por "30 barcos" — parte por el todo' },
  { id:90, subject:'reading', question:'Un párrafo de cierre efectivo debe:', options:['Introducir ideas nuevas','Resumir y reforzar la idea principal','Solo repetir la introducción','Usar muchas preguntas'], answer:1, explanation:'El párrafo de cierre sintetiza y refuerza la idea central del texto' },
  { id:91, subject:'reading', question:'¿Cuál es la diferencia entre resumen y síntesis?', options:['Son lo mismo','El resumen conserva el orden; la síntesis reorganiza ideas','La síntesis es más larga','El resumen usa citas'], answer:1, explanation:'Resumen: reduce manteniendo el orden. Síntesis: reorganiza y combina ideas propias.' },
  { id:92, subject:'reading', question:'La función fática del lenguaje sirve para:', options:['Informar','Expresar emociones','Verificar que el canal funciona','Hablar del lenguaje mismo'], answer:2, explanation:'Función fática: verificar o mantener el canal de comunicación ("¿Aló? ¿Me escuchas?")' },
  { id:93, subject:'reading', question:'¿Qué es un párrafo de desarrollo?', options:['El primer párrafo','Párrafos que argumentan la idea principal','El párrafo final','Un párrafo con solo ejemplos'], answer:1, explanation:'Los párrafos de desarrollo exponen, argumentan o ejemplifican la idea central' },
  { id:94, subject:'reading', question:'El estilo directo en narrativa:', options:['Parafrasea lo dicho','Cita textualmente lo dicho','Omite los diálogos','Usa verbos en pasado'], answer:1, explanation:'Estilo directo: reproduce las palabras exactas con comillas o guiones' },
  { id:95, subject:'reading', question:'¿Cuál es un texto multimodal?', options:['Solo texto escrito','Texto que combina imagen, video, sonido','Texto en varios idiomas','Texto muy largo'], answer:1, explanation:'Texto multimodal: combina diferentes modos semióticos (imagen, texto, audio)' },
  { id:96, subject:'reading', question:'La paradoja expresa:', options:['Una exageración','Una idea aparentemente contradictoria pero verdadera','Una comparación','Un insulto indirecto'], answer:1, explanation:'Paradoja: "muero porque no muero" — contradicción aparente con sentido profundo' },
  { id:97, subject:'reading', question:'¿Qué es la cohesión textual?', options:['La unidad temática','Los mecanismos gramaticales que ligan oraciones','El tono del texto','La veracidad del texto'], answer:1, explanation:'Cohesión: uso de conectores, pronombres, sinónimos para enlazar oraciones' },
  { id:98, subject:'reading', question:'Un artículo de opinión pertenece al género:', options:['Narrativo literario','Periodístico de opinión','Científico','Instructivo'], answer:1, explanation:'El artículo de opinión es un género periodístico donde el autor da su punto de vista' },
  { id:99, subject:'reading', question:'¿Qué es el contexto en la interpretación de un texto?', options:['El título','El espacio físico y social de producción/recepción','La longitud','El vocabulario usado'], answer:1, explanation:'Contexto: circunstancias históricas, culturales y sociales que rodean al texto' },
  { id:100, subject:'reading', question:'En lógica, un silogismo válido requiere:', options:['Solo premisas verdaderas','Conclusión que se derive necesariamente de las premisas','Muchos argumentos','Una fuente confiable'], answer:1, explanation:'Un silogismo es válido si la conclusión se infiere necesariamente de las premisas' },

  /* ══════════════════════════════════════
     INGLÉS  (IDs 101–150)
  ══════════════════════════════════════ */
  { id:101, subject:'english', question:'Choose the correct sentence:', options:["She don't like coffee.","She doesn't likes coffee.","She doesn't like coffee.","She not like coffee."], answer:2, explanation:"With she/he/it use doesn't + base verb." },
  { id:102, subject:'english', question:'The past tense of "go" is:', options:['goed','gone','went','goes'], answer:2, explanation:'"Go" is irregular. Simple past = went.' },
  { id:103, subject:'english', question:'"The book _____ written by García Márquez."', options:['is','was','were','be'], answer:1, explanation:'Passive voice simple past singular = was.' },
  { id:104, subject:'english', question:'What does "although" mean?', options:['por lo tanto','además','aunque','sin embargo'], answer:2, explanation:'"Although" = aunque (concessive conjunction).' },
  { id:105, subject:'english', question:'Which sentence is in Present Perfect?', options:['I went to Paris.','I have been to Paris.','I go to Paris.','I was going to Paris.'], answer:1, explanation:'Present Perfect = have/has + past participle.' },
  { id:106, subject:'english', question:'"Courage" in Spanish means:', options:['crueldad','coraje/valentía','curiosidad','cortesía'], answer:1, explanation:'"Courage" = valentía, coraje.' },
  { id:107, subject:'english', question:'The plural of "child" is:', options:['childs','childes','children','childer'], answer:2, explanation:'"Child" has an irregular plural: children.' },
  { id:108, subject:'english', question:'Choose the correct question tag: "You are a student, _____?"', options:["aren't you",'is not you','are you','don\'t you'], answer:0, explanation:'Positive statement → negative tag: aren\'t you.' },
  { id:109, subject:'english', question:'"I will call you tomorrow" is in:', options:['Simple past','Present continuous','Simple future','Past perfect'], answer:2, explanation:'"Will + verb" forms the simple future.' },
  { id:110, subject:'english', question:'What is the superlative of "good"?', options:['gooder','more good','better','the best'], answer:3, explanation:'"Good" is irregular: good → better → the best.' },
  { id:111, subject:'english', question:'Fill in: "She _____ studying when I arrived."', options:['was','is','were','has been'], answer:0, explanation:'Past continuous for ongoing action in the past: was + -ing.' },
  { id:112, subject:'english', question:'"Neither… nor" is used to express:', options:['Addition','Choice','Negative alternatives','Contrast'], answer:2, explanation:'"Neither… nor" links two negative alternatives.' },
  { id:113, subject:'english', question:'The passive of "They built the bridge" is:', options:['The bridge builds.','The bridge was built.','The bridge is building.','The bridge built.'], answer:1, explanation:'Passive simple past: subject + was/were + past participle.' },
  { id:114, subject:'english', question:'"I wish I _____ fly." The correct form is:', options:['can','could','will','would'], answer:1, explanation:'"Wish" + past tense (could) expresses an unreal wish.' },
  { id:115, subject:'english', question:'Which word is a conjunction?', options:['quickly','beautiful','although','run'], answer:2, explanation:'"Although" is a subordinating conjunction.' },
  { id:116, subject:'english', question:'The synonym of "enormous" is:', options:['tiny','huge','average','narrow'], answer:1, explanation:'"Enormous" and "huge" both mean very large.' },
  { id:117, subject:'english', question:'"By the time she arrived, I _____ already eaten."', options:['have','had','was','did'], answer:1, explanation:'Past perfect (had + p.p.) for action completed before another past event.' },
  { id:118, subject:'english', question:'What does the prefix "un-" mean?', options:['again','before','not','under'], answer:2, explanation:'"Un-" means not: unhappy = not happy.' },
  { id:119, subject:'english', question:'Identify the adverb: "She sings beautifully."', options:['She','sings','beautifully','[none]'], answer:2, explanation:'"Beautifully" modifies the verb → it\'s an adverb.' },
  { id:120, subject:'english', question:'"If I were rich, I _____ travel the world."', options:['will','would','can','should'], answer:1, explanation:'Second conditional (unreal): if + past, would + base verb.' },
  { id:121, subject:'english', question:'The antonym of "ancient" is:', options:['old','modern','historical','classic'], answer:1, explanation:'"Ancient" = very old. Its antonym is "modern".' },
  { id:122, subject:'english', question:'Choose the correct preposition: "She is good _____ math."', options:['in','on','at','with'], answer:2, explanation:'"Good at" is the correct collocation.' },
  { id:123, subject:'english', question:'"They have lived here _____ 2010."', options:['for','since','during','ago'], answer:1, explanation:'"Since" is used with a specific point in time.' },
  { id:124, subject:'english', question:'The gerund form of "swim" is:', options:['swam','swum','swimming','to swim'], answer:2, explanation:'Gerund = verb + -ing: swimming.' },
  { id:125, subject:'english', question:'"Despite the rain, they went out." "Despite" is:', options:['Conjunction','Preposition','Adverb','Verb'], answer:1, explanation:'"Despite" is a preposition followed by a noun or gerund.' },
  { id:126, subject:'english', question:'What does "however" mean?', options:['además','por lo tanto','sin embargo','aunque'], answer:2, explanation:'"However" = sin embargo (contrast connector).' },
  { id:127, subject:'english', question:'The comparative of "far" is:', options:['more far','farer','further/farther','far more'], answer:2, explanation:'"Far" is irregular: far → further/farther → furthest/farthest.' },
  { id:128, subject:'english', question:'Identify the modal verb: "You must wear a seatbelt."', options:['You','must','wear','seatbelt'], answer:1, explanation:'"Must" is a modal verb expressing obligation.' },
  { id:129, subject:'english', question:'"The keys, _____ I lost yesterday, were found." The relative pronoun is:', options:['who','whose','which','whom'], answer:2, explanation:'"Which" refers to things; "who/whom" to people.' },
  { id:130, subject:'english', question:'What tense is "She has been running for an hour"?', options:['Present perfect','Present continuous','Present perfect continuous','Past perfect'], answer:2, explanation:'Have/has + been + -ing = present perfect continuous.' },
  { id:131, subject:'english', question:'"Handful" means:', options:['A fist of anger','A small number/amount','A hand injury','A glove'], answer:1, explanation:'"A handful of" = a small quantity of something.' },
  { id:132, subject:'english', question:'Choose the sentence with correct subject-verb agreement:', options:['The team are playing well.','The team is playing well.','The team were playing well.','The team play well always.'], answer:1, explanation:'Collective nouns like "team" take singular verbs in American English.' },
  { id:133, subject:'english', question:'The word "affect" is usually a:', options:['Noun','Adjective','Verb','Adverb'], answer:2, explanation:'"Affect" = to have an impact on (verb). "Effect" is usually the noun.' },
  { id:134, subject:'english', question:'"It\'s raining cats and dogs" means:', options:['Animals are falling','It is raining heavily','It is a light drizzle','Animals are making noise'], answer:1, explanation:'This idiom means it is raining very heavily.' },
  { id:135, subject:'english', question:'Fill in: "I _____ to the gym every morning."', options:['goes','going','go','gone'], answer:2, explanation:'Simple present with "I" uses the base form: go.' },
  { id:136, subject:'english', question:'The suffix "-tion" creates:', options:['Adjectives','Adverbs','Nouns','Verbs'], answer:2, explanation:'"-tion" turns verbs into nouns: educate → education.' },
  { id:137, subject:'english', question:'What does "throughout" mean?', options:['al final','a través de / durante todo','antes de','después de'], answer:1, explanation:'"Throughout" = during the whole of / all through.' },
  { id:138, subject:'english', question:'"She told me _____ not to be late." (Reported speech)', options:['that','to','which','for'], answer:1, explanation:'In reported speech with imperatives: tell + object + to + verb.' },
  { id:139, subject:'english', question:'The word "nevertheless" is a:', options:['Preposition','Conjunction','Adverb/connector','Pronoun'], answer:2, explanation:'"Nevertheless" is a conjunctive adverb meaning "however".' },
  { id:140, subject:'english', question:'"To procrastinate" means:', options:['To plan ahead','To delay tasks','To work quickly','To organize'], answer:1, explanation:'Procrastinate = to delay or postpone tasks.' },
  { id:141, subject:'english', question:'Fill in: "If you _____ harder, you will pass."', options:['study','studied','will study','had studied'], answer:0, explanation:'First conditional (real): if + present simple, will + base verb.' },
  { id:142, subject:'english', question:'The past participle of "break" is:', options:['broke','breaked','broken','breaking'], answer:2, explanation:'"Break" is irregular: break → broke → broken.' },
  { id:143, subject:'english', question:'Which sentence uses the Oxford comma correctly?', options:['I bought apples, oranges and bananas.','I bought apples, oranges, and bananas.','I bought apples oranges and bananas.','I bought, apples, oranges, bananas.'], answer:1, explanation:'Oxford comma: placed before the final "and" in a list.' },
  { id:144, subject:'english', question:'"Ubiquitous" means:', options:['Unique','Present everywhere','Underground','Unclear'], answer:1, explanation:'"Ubiquitous" = seeming to appear everywhere at the same time.' },
  { id:145, subject:'english', question:'Choose the correct possessive: "That is _____ book." (belonging to them)', options:['their','there','they\'re','theirs'], answer:0, explanation:'"Their" is the possessive adjective before a noun.' },
  { id:146, subject:'english', question:'"Albeit" means:', options:['also','even though','therefore','moreover'], answer:1, explanation:'"Albeit" = although / even though (formal).' },
  { id:147, subject:'english', question:'What is a "thesis statement" in academic writing?', options:['The conclusion','The main argument of the essay','A statistic','A quotation'], answer:1, explanation:'A thesis statement presents the main argument to be developed.' },
  { id:148, subject:'english', question:'The phrasal verb "give up" means:', options:['to donate','to surrender/quit','to increase','to rise'], answer:1, explanation:'"Give up" = to stop trying / to quit.' },
  { id:149, subject:'english', question:'"The more you practice, _____ you improve."', options:['more','the more','much more','very more'], answer:1, explanation:'"The more… the more…" is a parallel comparative structure.' },
  { id:150, subject:'english', question:'Which is a compound sentence?', options:['She runs.','She runs fast.','She runs fast and he walks slowly.','Because she runs fast, she won.'], answer:2, explanation:'Compound = two independent clauses joined by a coordinating conjunction.' },

  /* ══════════════════════════════════════
     CIENCIAS NATURALES  (IDs 151–200)
  ══════════════════════════════════════ */
  { id:151, subject:'science', question:'La fórmula del agua H₂O tiene:', options:['2 O y 1 H','2 H y 1 O','3 H y 1 O','1 H y 2 O'], answer:1, explanation:'H₂O: 2 átomos de Hidrógeno y 1 de Oxígeno' },
  { id:152, subject:'science', question:'La velocidad de la luz en el vacío es aproximadamente:', options:['300 km/s','300.000 km/s','30.000 km/s','3.000 km/s'], answer:1, explanation:'c ≈ 3 × 10⁸ m/s = 300.000 km/s' },
  { id:153, subject:'science', question:'F = m × a corresponde a la:', options:['1ª ley de Newton','2ª ley de Newton','3ª ley de Newton','Ley de Hooke'], answer:1, explanation:'Segunda Ley de Newton: fuerza neta = masa × aceleración' },
  { id:154, subject:'science', question:'El símbolo "Fe" en la tabla periódica es:', options:['Flúor','Fósforo','Hierro','Francio'], answer:2, explanation:'Fe del latín Ferrum = Hierro. Nº atómico 26.' },
  { id:155, subject:'science', question:'La fotosíntesis produce:', options:['CO₂ y H₂O','O₂ y glucosa','N₂ y glucosa','O₂ y CO₂'], answer:1, explanation:'6CO₂ + 6H₂O + luz → glucosa + 6O₂' },
  { id:156, subject:'science', question:'El pH del agua pura es:', options:['6','7','8','9'], answer:1, explanation:'pH = 7 es neutro (ni ácido ni básico)' },
  { id:157, subject:'science', question:'La unidad de fuerza en el SI es:', options:['Joule','Pascal','Newton','Watt'], answer:2, explanation:'Newton (N) es la unidad de fuerza en el Sistema Internacional' },
  { id:158, subject:'science', question:'¿Cuántos cromosomas tiene una célula humana normal?', options:['23','44','46','48'], answer:2, explanation:'Las células somáticas humanas tienen 46 cromosomas (23 pares)' },
  { id:159, subject:'science', question:'El ADN tiene forma de:', options:['Cadena simple','Doble hélice','Esfera','Cilindro'], answer:1, explanation:'El ADN tiene estructura de doble hélice (Watson y Crick, 1953)' },
  { id:160, subject:'science', question:'¿Qué organelo produce energía en la célula?', options:['Núcleo','Ribosoma','Mitocondria','Vacuola'], answer:2, explanation:'La mitocondria es la "central energética" de la célula (produce ATP)' },
  { id:161, subject:'science', question:'La tabla periódica organiza los elementos por:', options:['Masa','Número atómico','Color','Temperatura de fusión'], answer:1, explanation:'La tabla periódica ordena los elementos por número atómico creciente' },
  { id:162, subject:'science', question:'¿Qué gas es más abundante en la atmósfera terrestre?', options:['Oxígeno','Dióxido de carbono','Nitrógeno','Argón'], answer:2, explanation:'El Nitrógeno (N₂) representa aproximadamente el 78% de la atmósfera' },
  { id:163, subject:'science', question:'La gravedad en la Tierra es aproximadamente:', options:['9.8 m/s²','8.9 m/s²','10.8 m/s²','9.0 m/s²'], answer:0, explanation:'g ≈ 9.8 m/s² es la aceleración gravitacional terrestre' },
  { id:164, subject:'science', question:'¿Qué tipo de enlace forma la sal común (NaCl)?', options:['Covalente','Metálico','Iónico','Hidrógeno'], answer:2, explanation:'NaCl se forma por enlace iónico entre Na⁺ y Cl⁻' },
  { id:165, subject:'science', question:'La respiración celular ocurre principalmente en:', options:['Cloroplasto','Núcleo','Mitocondria','Membrana celular'], answer:2, explanation:'La mitocondria realiza la respiración aerobia para producir ATP' },
  { id:166, subject:'science', question:'¿Cuál es la unidad básica de la materia?', options:['Molécula','Átomo','Célula','Núcleo'], answer:1, explanation:'El átomo es la unidad básica de la materia química' },
  { id:167, subject:'science', question:'La ley de la conservación de la energía establece que:', options:['La energía se crea','La energía se destruye','La energía se transforma','La energía desaparece'], answer:2, explanation:'La energía no se crea ni se destruye, solo se transforma (1ª Ley de la Termodinámica)' },
  { id:168, subject:'science', question:'¿Qué tipo de onda es el sonido?', options:['Electromagnética','Transversal','Longitudinal','Gravitacional'], answer:2, explanation:'El sonido es una onda mecánica longitudinal que necesita medio material' },
  { id:169, subject:'science', question:'El proceso de división celular para reproducción es:', options:['Mitosis','Meiosis','Fisión','Gemación'], answer:1, explanation:'La meiosis produce gametos con la mitad de cromosomas para reproducción sexual' },
  { id:170, subject:'science', question:'¿Cuál es la carga del protón?', options:['Negativa','Positiva','Neutra','Variable'], answer:1, explanation:'El protón tiene carga positiva (+1). El electrón tiene carga negativa.' },
  { id:171, subject:'science', question:'El efecto invernadero es causado principalmente por:', options:['O₂','N₂','CO₂ y CH₄','H₂'], answer:2, explanation:'El CO₂ y el metano son los principales gases de efecto invernadero' },
  { id:172, subject:'science', question:'¿Qué vitamina produce la piel al exponerse al sol?', options:['Vitamina A','Vitamina B12','Vitamina C','Vitamina D'], answer:3, explanation:'La piel sintetiza vitamina D mediante la radiación ultravioleta solar' },
  { id:173, subject:'science', question:'La densidad se calcula como:', options:['masa × volumen','masa / volumen','volumen / masa','fuerza / área'], answer:1, explanation:'Densidad = masa / volumen. Unidades: kg/m³ o g/cm³' },
  { id:174, subject:'science', question:'¿Qué parte del cerebro controla el equilibrio?', options:['Cerebro','Cerebelo','Bulbo raquídeo','Hipotálamo'], answer:1, explanation:'El cerebelo coordina el movimiento y mantiene el equilibrio' },
  { id:175, subject:'science', question:'Los ácidos tienen pH:', options:['Mayor que 7','Igual a 7','Menor que 7','Variable'], answer:2, explanation:'Ácidos: pH < 7. Neutro: pH = 7. Bases: pH > 7.' },
  { id:176, subject:'science', question:'La mutación genética es:', options:['Reproducción normal','Cambio en la secuencia del ADN','División celular','Síntesis de proteínas'], answer:1, explanation:'Mutación: cambio permanente en la secuencia de nucleótidos del ADN' },
  { id:177, subject:'science', question:'¿Cuál es la unidad de medida de la corriente eléctrica?', options:['Voltio','Ohm','Amperio','Watt'], answer:2, explanation:'El amperio (A) es la unidad del SI para la intensidad de corriente eléctrica' },
  { id:178, subject:'science', question:'La ley de Ohm relaciona:', options:['Masa y aceleración','Voltaje, corriente y resistencia','Presión y volumen','Fuerza y distancia'], answer:1, explanation:'V = I × R (voltaje = corriente × resistencia)' },
  { id:179, subject:'science', question:'¿Qué proceso convierte el CO₂ en O₂ en las plantas?', options:['Respiración','Transpiración','Fotosíntesis','Fermentación'], answer:2, explanation:'Fotosíntesis: las plantas usan CO₂, agua y luz solar para producir glucosa y O₂' },
  { id:180, subject:'science', question:'Los glóbulos rojos transportan:', options:['Anticuerpos','Oxígeno','Glucosa','Hormonas'], answer:1, explanation:'Los eritrocitos (glóbulos rojos) transportan oxígeno mediante la hemoglobina' },
  { id:181, subject:'science', question:'La fuerza de gravedad entre dos masas:', options:['Aumenta con la distancia','Disminuye con la distancia','No depende de la distancia','Solo depende de la masa'], answer:1, explanation:'Ley de Newton: F = G(m₁m₂)/r². A mayor distancia, menor fuerza.' },
  { id:182, subject:'science', question:'¿Cuál es el número atómico del carbono?', options:['4','6','8','12'], answer:1, explanation:'El carbono (C) tiene 6 protones → número atómico = 6' },
  { id:183, subject:'science', question:'La teoría celular establece que:', options:['Las células son átomos','Todo ser vivo está formado por células','Las células no se dividen','Las células son iguales en todos los seres'], answer:1, explanation:'La teoría celular: la célula es la unidad estructural y funcional de todos los seres vivos' },
  { id:184, subject:'science', question:'¿Qué tipo de radiación tiene mayor energía?', options:['Radiación infrarroja','Luz visible','Rayos X','Microondas'], answer:2, explanation:'Los rayos X (y los rayos gamma) tienen la mayor energía del espectro electromagnético' },
  { id:185, subject:'science', question:'La fermentación es un proceso:', options:['Aerobio','Anaerobio','Fotosintético','Osmótico'], answer:1, explanation:'La fermentación ocurre sin oxígeno (anaerobio) — ej.: levaduras que producen alcohol' },
  { id:186, subject:'science', question:'¿Cuántas capas tiene la Tierra?', options:['2','3','4','5'], answer:1, explanation:'Corteza, manto y núcleo (dividido en externo e interno) → 3 capas principales' },
  { id:187, subject:'science', question:'El ADN se transcribe en:', options:['Proteína','ARNm','Lípidos','ATP'], answer:1, explanation:'Transcripción: ADN → ARN mensajero → luego se traduce a proteína' },
  { id:188, subject:'science', question:'¿Qué es la osmosis?', options:['Digestión química','Paso de agua por membrana semipermeable','Transporte activo de iones','Síntesis de ATP'], answer:1, explanation:'Osmosis: movimiento de agua desde zona de baja concentración a alta a través de membrana' },
  { id:189, subject:'science', question:'La luz viaja en el vacío a c ≈ 3×10⁸ m/s. ¿Cuánto tarda en llegar del Sol a la Tierra (≈150×10⁹ m)?', options:['5 min','8 min','12 min','15 min'], answer:1, explanation:'t = d/v = 150×10⁹ / 3×10⁸ = 500 s ≈ 8.3 min' },
  { id:190, subject:'science', question:'Los metales alcalinos están en el grupo:', options:['IA (1)','IIA (2)','VIIA (17)','0 (18)'], answer:0, explanation:'Grupo IA (o 1): Li, Na, K, Rb, Cs, Fr — metales alcalinos' },
  { id:191, subject:'science', question:'¿Qué estructura celular solo tienen las células vegetales?', options:['Mitocondria','Membrana celular','Pared celular','Ribosoma'], answer:2, explanation:'La pared celular (de celulosa) es característica de células vegetales, no animales' },
  { id:192, subject:'science', question:'La presión atmosférica estándar equivale a:', options:['1 atm = 101.325 Pa','1 atm = 1000 Pa','1 atm = 760 Pa','1 atm = 10.000 Pa'], answer:0, explanation:'1 atm = 101.325 Pa = 760 mmHg (torr) — presión atmosférica estándar' },
  { id:193, subject:'science', question:'¿Qué es la biodiversidad?', options:['Solo variedad de plantas','Variedad de ecosistemas, especies y genes','Solo animales marinos','Variedad de climas'], answer:1, explanation:'Biodiversidad incluye diversidad genética, de especies y de ecosistemas' },
  { id:194, subject:'science', question:'El calor específico indica:', options:['Temperatura máxima de una sustancia','Energía para elevar 1°C a 1 kg de sustancia','Punto de fusión','Conductividad térmica'], answer:1, explanation:'Calor específico c: cantidad de energía para subir 1°C la temperatura de 1 kg' },
  { id:195, subject:'science', question:'¿Cuál es el órgano más grande del cuerpo humano?', options:['Hígado','Pulmón','Piel','Intestino delgado'], answer:2, explanation:'La piel es el órgano más grande con aprox. 1.5–2 m² de superficie' },
  { id:196, subject:'science', question:'La teoría de la evolución fue propuesta por:', options:['Pasteur','Mendel','Darwin','Lamarck'], answer:2, explanation:'Charles Darwin propuso la selección natural en "El Origen de las Especies" (1859)' },
  { id:197, subject:'science', question:'¿Qué es el pH negativo?', options:['Imposible','Muy ácido (ácidos concentrados)','Neutro especial','Básico extremo'], answer:1, explanation:'El pH puede ser negativo en ácidos extremadamente concentrados' },
  { id:198, subject:'science', question:'La ley de Boyle establece que a temperatura constante, P y V son:', options:['Directamente proporcionales','Inversamente proporcionales','Iguales','Independientes'], answer:1, explanation:'Ley de Boyle: P × V = constante (a T constante)' },
  { id:199, subject:'science', question:'Los anticuerpos son producidos por:', options:['Glóbulos rojos','Plaquetas','Linfocitos B','Neutrófilos'], answer:2, explanation:'Los linfocitos B producen anticuerpos como parte de la respuesta inmune' },
  { id:200, subject:'science', question:'¿Cuál es la función del ARN ribosómico (ARNr)?', options:['Transportar aminoácidos','Copiar el ADN','Formar parte del ribosoma','Regular genes'], answer:2, explanation:'El ARNr es componente estructural y catalítico del ribosoma' },

  /* ══════════════════════════════════════
     CIENCIAS SOCIALES  (IDs 201–250)
  ══════════════════════════════════════ */
  { id:201, subject:'sociales', question:'¿En qué año se firmó la Constitución de Colombia vigente?', options:['1886','1991','1978','2002'], answer:1, explanation:'La Constitución Política de Colombia fue promulgada el 4 de julio de 1991' },
  { id:202, subject:'sociales', question:'¿Quiénes lideraron la Independencia de Colombia?', options:['Bolívar y Santander','Antonio Nariño','Camilo Torres','Policarpa Salavarrieta'], answer:0, explanation:'Simón Bolívar y Francisco de Paula Santander lideraron el proceso independentista' },
  { id:203, subject:'sociales', question:'¿En qué año se declaró la Independencia de Colombia?', options:['1810','1819','1821','1830'], answer:0, explanation:'El 20 de julio de 1810 fue el Grito de Independencia en Bogotá' },
  { id:204, subject:'sociales', question:'La Batalla de Boyacá ocurrió el:', options:['7 de agosto de 1819','20 de julio de 1810','17 de diciembre de 1819','25 de septiembre de 1828'], answer:0, explanation:'El 7 de agosto de 1819 se selló la independencia de Colombia' },
  { id:205, subject:'sociales', question:'¿Cuántos departamentos tiene Colombia?', options:['28','30','32','34'], answer:2, explanation:'Colombia tiene 32 departamentos más el Distrito Capital' },
  { id:206, subject:'sociales', question:'¿Qué documento expone la visión de Bolívar sobre la independencia latinoamericana?', options:['Constitución de Angostura','Carta de Jamaica','Decreto de Trujillo','Acta de Independencia'], answer:1, explanation:'En la Carta de Jamaica (1815), Bolívar expuso su proyecto continental' },
  { id:207, subject:'sociales', question:'¿En qué continente se encuentra Colombia?', options:['Asia','África','Europa','América del Sur'], answer:3, explanation:'Colombia está en el noroccidente de América del Sur' },
  { id:208, subject:'sociales', question:'La Revolución Francesa comenzó en:', options:['1776','1789','1799','1815'], answer:1, explanation:'La Revolución Francesa comenzó en 1789 con la toma de la Bastilla' },
  { id:209, subject:'sociales', question:'¿Qué fue la Revolución Industrial?', options:['Revolución política francesa','Transformación económica del siglo XVIII-XIX','Guerra mundial','Movimiento artístico'], answer:1, explanation:'Transformación de la producción artesanal a la industrial, iniciada en Inglaterra s. XVIII' },
  { id:210, subject:'sociales', question:'La Primera Guerra Mundial comenzó en:', options:['1910','1914','1918','1939'], answer:1, explanation:'La Primera Guerra Mundial comenzó en julio de 1914 tras el asesinato de Francisco Fernando' },
  { id:211, subject:'sociales', question:'El sistema económico basado en propiedad privada y mercado libre se llama:', options:['Socialismo','Comunismo','Capitalismo','Feudalismo'], answer:2, explanation:'El capitalismo se basa en propiedad privada, libre mercado y búsqueda de ganancia' },
  { id:212, subject:'sociales', question:'¿Qué es la democracia?', options:['Gobierno de un rey','Gobierno del pueblo','Gobierno militar','Gobierno de expertos'], answer:1, explanation:'Democracia = gobierno del pueblo (del griego: demos = pueblo, kratos = gobierno)' },
  { id:213, subject:'sociales', question:'¿Cuál es la capital de Colombia?', options:['Medellín','Cali','Bogotá','Barranquilla'], answer:2, explanation:'Bogotá D.C. es la capital de Colombia' },
  { id:214, subject:'sociales', question:'El Río Magdalena es importante porque:', options:['Limita con Venezuela','Es el principal río de Colombia','Es el más largo de América','Nace en el Amazonas'], answer:1, explanation:'El Magdalena es el principal río de Colombia, arteria fluvial histórica del país' },
  { id:215, subject:'sociales', question:'¿Qué es el PIB?', options:['Programa de inversión bancaria','Valor total de bienes y servicios producidos en un país','Partido político','Sistema de impuestos'], answer:1, explanation:'PIB: Producto Interno Bruto — valor total de bienes y servicios en un período dado' },
  { id:216, subject:'sociales', question:'¿Qué organizaciones firmaron el Acuerdo de Paz de Colombia (2016)?', options:['ONU y Gobierno','FARC y Gobierno colombiano','Unión Europea y Colombia','OEA y FARC'], answer:1, explanation:'El Acuerdo de Paz de 2016 fue firmado entre el Gobierno de Colombia y las FARC-EP' },
  { id:217, subject:'sociales', question:'La Organización de las Naciones Unidas (ONU) fue fundada en:', options:['1919','1939','1945','1950'], answer:2, explanation:'La ONU fue fundada el 24 de octubre de 1945 tras la Segunda Guerra Mundial' },
  { id:218, subject:'sociales', question:'¿Qué es la inflación?', options:['Caída de precios','Aumento sostenido del nivel de precios','Crecimiento económico','Desempleo masivo'], answer:1, explanation:'Inflación: aumento generalizado y sostenido de precios en una economía' },
  { id:219, subject:'sociales', question:'¿Cuál fue el primer país en otorgar el voto a la mujer?', options:['Francia','Reino Unido','Nueva Zelanda','Estados Unidos'], answer:2, explanation:'Nueva Zelanda fue el primer país en otorgar el voto femenino, en 1893' },
  { id:220, subject:'sociales', question:'El Imperio Romano cayó en:', options:['476 d.C.','1453','1492','410 d.C.'], answer:0, explanation:'El Imperio Romano de Occidente cayó en 476 d.C. con la deposición de Rómulo Augústulo' },
  { id:221, subject:'sociales', question:'La Edad Media comprende aproximadamente:', options:['Siglos V–XV','Siglos I–IV','Siglos XV–XVIII','Siglos XVIII–XIX'], answer:0, explanation:'Edad Media: caída de Roma (476) hasta la caída de Constantinopla (1453)' },
  { id:222, subject:'sociales', question:'¿Qué es la globalización?', options:['Solo comercio exterior','Integración mundial de economías, culturas y políticas','Colonización moderna','Migración masiva'], answer:1, explanation:'Globalización: proceso de interdependencia e integración entre países del mundo' },
  { id:223, subject:'sociales', question:'¿Cuál de estos es un derecho fundamental en Colombia?', options:['Tener automóvil','Derecho a la vida','Derecho a voto','Tener empleo'], answer:1, explanation:'El derecho a la vida (Art. 11 de la Constitución) es el principal derecho fundamental en Colombia' },
  { id:224, subject:'sociales', question:'La región Caribe colombiana limita al norte con:', options:['Venezuela','Panamá','El Mar Caribe','Ecuador'], answer:2, explanation:'La región Caribe tiene costa sobre el Mar Caribe al norte' },
  { id:225, subject:'sociales', question:'¿Qué es el Congreso de la República de Colombia?', options:['Poder judicial','Poder ejecutivo','Poder legislativo','Poder electoral'], answer:2, explanation:'El Congreso es el órgano legislativo: Senado + Cámara de Representantes' },
  { id:226, subject:'sociales', question:'La Segunda Guerra Mundial terminó en:', options:['1943','1944','1945','1946'], answer:2, explanation:'La Segunda Guerra Mundial terminó en 1945 (mayo en Europa, septiembre en el Pacífico)' },
  { id:227, subject:'sociales', question:'¿Qué es la tutela en Colombia?', options:['Un impuesto','Un mecanismo para proteger derechos fundamentales','Un tipo de contrato','Una institución educativa'], answer:1, explanation:'La acción de tutela (Art. 86) protege derechos fundamentales de forma inmediata' },
  { id:228, subject:'sociales', question:'Colón llegó a América en:', options:['1492','1498','1494','1500'], answer:0, explanation:'Cristóbal Colón llegó a América el 12 de octubre de 1492' },
  { id:229, subject:'sociales', question:'¿Cuántos poderes públicos tiene Colombia?', options:['2','3','4','5'], answer:1, explanation:'Colombia tiene 3 poderes: Ejecutivo, Legislativo y Judicial' },
  { id:230, subject:'sociales', question:'¿Qué es la deuda externa?', options:['Deuda entre ciudadanos','Dinero que un país debe a otros países o instituciones','Déficit comercial','Impuestos no pagados'], answer:1, explanation:'Deuda externa: obligaciones financieras de un país con acreedores extranjeros' },
  { id:231, subject:'sociales', question:'La ciudad de Cartagena fue fundada en:', options:['1533','1538','1550','1510'], answer:0, explanation:'Cartagena de Indias fue fundada por Pedro de Heredia el 1 de junio de 1533' },
  { id:232, subject:'sociales', question:'¿Qué es la soberanía nacional?', options:['El poder del ejército','Poder supremo del Estado sobre su territorio','Influencia extranjera','Control económico'], answer:1, explanation:'Soberanía: poder supremo del Estado para gobernarse sin interferencia externa' },
  { id:233, subject:'sociales', question:'¿Cuál es el bioma más grande de Colombia?', options:['Páramo','Selva amazónica','Sabana','Bosque andino'], answer:1, explanation:'La selva amazónica ocupa gran parte del sur de Colombia' },
  { id:234, subject:'sociales', question:'La OEA fue fundada en:', options:['1945','1948','1960','1969'], answer:1, explanation:'La Organización de Estados Americanos (OEA) fue fundada en Bogotá en 1948' },
  { id:235, subject:'sociales', question:'¿Qué es el federalismo?', options:['Gobierno de un solo estado centralizado','Sistema donde estados federados comparten poder con el gobierno central','Gobierno monárquico','Dictadura militar'], answer:1, explanation:'Federalismo: sistema donde estados/provincias comparten soberanía con el gobierno central' },
  { id:236, subject:'sociales', question:'¿Cuál fue la causa principal de la Primera Guerra Mundial?', options:['La crisis económica','El asesinato del Archiduque Francisco Fernando','La Revolución Rusa','El imperialismo alemán aislado'], answer:1, explanation:'El asesinato del Archiduque Austro-húngaro en Sarajevo (1914) detonó la guerra' },
  { id:237, subject:'sociales', question:'El Neolítico se caracteriza por:', options:['Solo caza y recolección','Inicio de la agricultura y sedentarismo','Uso del hierro','Primeras ciudades grandes'], answer:1, explanation:'El Neolítico (10.000–3.000 a.C.) introdujo agricultura, ganadería y vida sedentaria' },
  { id:238, subject:'sociales', question:'¿Qué es el desempleo estructural?', options:['Falta de trabajo por ciclo económico','Desempleo por cambios en la estructura productiva','Trabajadores voluntariamente desempleados','Exceso de trabajadores jóvenes'], answer:1, explanation:'Desempleo estructural: por cambios tecnológicos o sectoriales que hacen obsoletas ciertas habilidades' },
  { id:239, subject:'sociales', question:'La región de los Llanos Orientales colombianos también se llama:', options:['Orinoquía','Amazonía','Pacífico','Insular'], answer:0, explanation:'Los Llanos Orientales forman la región de la Orinoquía, drenada por el Orinoco y sus afluentes' },
  { id:240, subject:'sociales', question:'¿Cuál fue el impacto principal de la Revolución Industrial en la sociedad?', options:['Regreso al feudalismo','Surgimiento del proletariado urbano','Desaparición del comercio','Fortalecimiento de la aristocracia'], answer:1, explanation:'La industrialización creó la clase obrera urbana (proletariado) y transformó las relaciones laborales' },
  { id:241, subject:'sociales', question:'¿Qué es el Tratado de Libre Comercio (TLC)?', options:['Acuerdo militar','Acuerdo para eliminar barreras comerciales entre países','Tratado de paz','Unión monetaria'], answer:1, explanation:'Un TLC es un acuerdo entre países para reducir o eliminar aranceles y facilitar el comercio' },
  { id:242, subject:'sociales', question:'¿Cuál es la función del Banco de la República de Colombia?', options:['Prestar dinero a ciudadanos','Emitir moneda y controlar la política monetaria','Cobrar impuestos','Administrar la deuda externa'], answer:1, explanation:'El Banco de la República emite la moneda y aplica la política monetaria del país' },
  { id:243, subject:'sociales', question:'La civilización Maya se desarrolló en:', options:['América del Sur','América Central y México','El Caribe','Los Andes'], answer:1, explanation:'La civilización Maya floreció en México y Centroamérica (Guatemala, Belice, Honduras)' },
  { id:244, subject:'sociales', question:'¿Qué es la migración?', options:['Nacimiento en otro país','Desplazamiento de personas de un lugar a otro','Solo movimiento internacional','Solo movimiento involuntario'], answer:1, explanation:'Migración: desplazamiento de personas, interna o externa, temporal o permanente' },
  { id:245, subject:'sociales', question:'El periodo conocido como "La Violencia" en Colombia ocurrió principalmente en:', options:['1920–1930','1948–1958','1970–1980','1990–2000'], answer:1, explanation:'"La Violencia": conflicto bipartidista entre liberales y conservadores, especialmente 1948–1958' },
  { id:246, subject:'sociales', question:'¿Cuál es el principal instrumento de derechos humanos a nivel mundial?', options:['Carta de la OEA','Declaración Universal de Derechos Humanos','Tratado de Versalles','Carta Magna'], answer:1, explanation:'La Declaración Universal de los Derechos Humanos (ONU, 1948) es el principal instrumento global' },
  { id:247, subject:'sociales', question:'¿Qué es el Estado Social de Derecho en Colombia?', options:['Estado sin reglas','Estado donde la ley garantiza derechos sociales fundamentales','Estado militar','Estado donde el rey gobierna'], answer:1, explanation:'El Art. 1 de la Constitución define Colombia como Estado Social de Derecho — protege derechos sociales' },
  { id:248, subject:'sociales', question:'¿Cuál fue el papel de Simón Bolívar en Latinoamérica?', options:['Solo libertó Colombia','Libertó varios países: Venezuela, Colombia, Ecuador, Perú y Bolivia','Fue presidente de Brasil','Firmó la independencia de México'], answer:1, explanation:'El Libertador Simón Bolívar lideró la independencia de Venezuela, Colombia, Ecuador, Perú y Bolivia' },
  { id:249, subject:'sociales', question:'¿Qué es la Corte Constitucional de Colombia?', options:['Tribunal para juicios penales','Órgano que guarda la integridad de la Constitución','Tribunal para juicios civiles','Institución educativa'], answer:1, explanation:'La Corte Constitucional revisa la constitucionalidad de las leyes y protege la Constitución' },
  { id:250, subject:'sociales', question:'¿Cuándo se creó la República de Colombia (Gran Colombia)?', options:['1810','1819','1821','1830'], answer:1, explanation:'La Gran Colombia fue creada en el Congreso de Angostura en 1819 por Bolívar' },
];

/* ─── ACHIEVEMENTS ───────────────────────────── */
const ACHIEVEMENTS = [
  { id:'first_answer',  icon:'⚡', name:'Primer paso',       desc:'Responde tu primera pregunta',              condition:(u)=>u.totalAnswered>=1 },
  { id:'streak_3',      icon:'🔥', name:'Subiendo de nivel', desc:'Consigue 3 respuestas correctas seguidas',  condition:(u)=>u.maxStreak>=3 },
  { id:'streak_5',      icon:'💥', name:'Imparable',         desc:'Consigue 5 respuestas correctas seguidas',  condition:(u)=>u.maxStreak>=5 },
  { id:'streak_10',     icon:'🌊', name:'Maestro de racha',  desc:'Consigue 10 respuestas correctas seguidas', condition:(u)=>u.maxStreak>=10 },
  { id:'level_5',       icon:'⭐', name:'Rango D',           desc:'Alcanza el nivel 5',                        condition:(u)=>u.level>=5 },
  { id:'level_10',      icon:'🌟', name:'Rango C',           desc:'Alcanza el nivel 10',                       condition:(u)=>u.level>=10 },
  { id:'level_20',      icon:'👑', name:'Rango A',           desc:'Alcanza el nivel 20',                       condition:(u)=>u.level>=20 },
  { id:'level_25',      icon:'💎', name:'Leyenda',           desc:'Alcanza el nivel 25',                       condition:(u)=>u.level>=25 },
  { id:'all_subjects',  icon:'🎓', name:'Polifacético',      desc:'Responde preguntas de todas las materias',  condition:(u)=>Object.keys(u.subjectStats||{}).length>=5 },
  { id:'correct_10',    icon:'🎯', name:'¿Genio?',           desc:'Responde 10 preguntas correctamente',       condition:(u)=>u.totalCorrect>=10 },
  { id:'correct_50',    icon:'🏆', name:'Maestro',           desc:'Responde 50 preguntas correctamente',       condition:(u)=>u.totalCorrect>=50 },
  { id:'correct_100',   icon:'🔱', name:'Centurión',         desc:'Responde 100 preguntas correctamente',      condition:(u)=>u.totalCorrect>=100 },
  { id:'answered_100',  icon:'📚', name:'Erudito',           desc:'Responde 100 preguntas en total',           condition:(u)=>u.totalAnswered>=100 },
  { id:'answered_250',  icon:'🧠', name:'Enciclopedia',      desc:'Responde 250 preguntas en total',           condition:(u)=>u.totalAnswered>=250 },
  { id:'top1_season',   icon:'🥇', name:'Campeón de Temporada', desc:'Termina #1 en el ranking de temporada',  condition:(u)=>!!(u.medals && u.medals.gold>0) },
  { id:'top2_season',   icon:'🥈', name:'Subcampeón',        desc:'Termina Top 2 en el ranking de temporada', condition:(u)=>!!(u.medals && (u.medals.gold>0||u.medals.silver>0)) },
  { id:'top3_season',   icon:'🥉', name:'Podio',             desc:'Termina Top 3 en el ranking de temporada', condition:(u)=>!!(u.medals && (u.medals.gold>0||u.medals.silver>0||u.medals.bronze>0)) },
];

/* ─── STORAGE HELPERS ────────────────────────── */
const Storage = {
  get:(key)=>{ try{return JSON.parse(localStorage.getItem(key));}catch{return null;} },
  set:(key,val)=>{ try{localStorage.setItem(key,JSON.stringify(val));return true;}catch{return false;} },
  remove:(key)=>localStorage.removeItem(key),
};

/* ─── USER DATA STRUCTURE ────────────────────── */
function createUser(username, displayName, password, secQuestion, secAnswer) {
  return {
    username, displayName, password,
    secQuestion: secQuestion || '',
    secAnswer: (secAnswer || '').toLowerCase().trim(),
    banned: false,
    level:1, xp:0, totalXP:0,
    totalAnswered:0, totalCorrect:0,
    streak:0, maxStreak:0,
    achievements:[], subjectStats:{},
    medals:{ gold:0, silver:0, bronze:0 },
    createdAt:Date.now(), lastLogin:Date.now(),
  };
}

/* ─── AUTH MODULE ────────────────────────────── */
const Auth = {
  SESSION_KEY:'eduicfes_session',
  USERS_KEY:'eduicfes_users',

  getUsers(){ return Storage.get(this.USERS_KEY)||{}; },
  saveUsers(u){ Storage.set(this.USERS_KEY,u); },

  getCurrentUser(){
    const s=Storage.get(this.SESSION_KEY);
    if(!s) return null;
    return this.getUsers()[s]||null;
  },

  isAdmin(user){ return user && user.username === ADMIN_USERNAME; },

  register(username,displayName,password,secQuestion,secAnswer){
    const users=this.getUsers();
    if(users[username]) return {ok:false,error:'El usuario ya existe.'};
    if(username.length<3) return {ok:false,error:'Usuario muy corto (mín. 3 caracteres).'};
    if(password.length<4) return {ok:false,error:'Contraseña muy corta (mín. 4 caracteres).'};
    if(!secQuestion||!secAnswer) return {ok:false,error:'Debes configurar una pregunta de seguridad.'};
    users[username]=createUser(username,displayName||username,password,secQuestion,secAnswer);
    this.saveUsers(users);
    Storage.set(this.SESSION_KEY,username);
    return {ok:true};
  },

  // Login async: verifica ban en Firebase antes de permitir entrada
  async loginAsync(username, password) {
    const users = this.getUsers();
    const user  = users[username];
    if (!user)                      return { ok:false, error:'Usuario no encontrado.' };
    if (user.password !== password) return { ok:false, error:'Contraseña incorrecta.' };

    // Verificar ban en Firebase (fuente de verdad global)
    try {
      const res  = await fetch(`${FIREBASE_DB_URL}/bans/${username}.json`);
      const data = await res.json();
      if (data && data.banned === true) {
        // Sincronizar ban localmente también
        user.banned = true;
        this.saveUsers(users);
        return { ok:false, error:'⛔ Esta cuenta ha sido suspendida.' };
      }
    } catch(e) {
      // Sin conexión: usar ban local como fallback
      if (user.banned) return { ok:false, error:'⛔ Esta cuenta ha sido suspendida.' };
    }

    user.lastLogin = Date.now();
    user.banned    = false; // limpiar ban local si Firebase dice que no está baneado
    if (!user.medals) user.medals = { gold:0, silver:0, bronze:0 };
    this.saveUsers(users);
    Storage.set(this.SESSION_KEY, username);
    Leaderboard.pushScore(user);
    return { ok:true };
  },

  // login síncrono solo para compatibilidad interna (sin check Firebase)
  login(username,password){
    const users=this.getUsers();
    const user=users[username];
    if(!user) return {ok:false,error:'Usuario no encontrado.'};
    if(user.banned) return {ok:false,error:'⛔ Esta cuenta ha sido suspendida.'};
    if(user.password!==password) return {ok:false,error:'Contraseña incorrecta.'};
    user.lastLogin=Date.now();
    if(!user.medals) user.medals={gold:0,silver:0,bronze:0};
    this.saveUsers(users);
    Storage.set(this.SESSION_KEY,username);
    Leaderboard.pushScore(user);
    return {ok:true};
  },

  getSecQuestion(username){
    const users=this.getUsers();
    const user=users[username];
    if(!user) return {ok:false,error:'Usuario no encontrado.'};
    return {ok:true,question:user.secQuestion||''};
  },

  resetPassword(username,secAnswer,newPassword){
    const users=this.getUsers();
    const user=users[username];
    if(!user) return {ok:false,error:'Usuario no encontrado.'};
    if(user.banned) return {ok:false,error:'⛔ Cuenta suspendida.'};
    if((secAnswer||'').toLowerCase().trim()!==user.secAnswer) return {ok:false,error:'Respuesta incorrecta.'};
    if(newPassword.length<4) return {ok:false,error:'Contraseña muy corta (mín. 4 caracteres).'};
    user.password=newPassword;
    this.saveUsers(users);
    return {ok:true};
  },

  async banUser(username, adminUser) {
    if (!this.isAdmin(adminUser)) return { ok:false, error:'Sin permisos de administrador.' };
    if (username === ADMIN_USERNAME) return { ok:false, error:'No puedes banearte a ti mismo.' };
    // Escribir en Firebase — afecta TODOS los dispositivos
    try {
      await fetch(`${FIREBASE_DB_URL}/bans/${username}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banned:true, bannedAt:Date.now(), bannedBy:adminUser.username }),
      });
    } catch(e) { console.warn('[Ban] Firebase sin conexión, ban solo local'); }
    // Sincronizar localStorage local
    const users = this.getUsers();
    if (users[username]) { users[username].banned = true; this.saveUsers(users); }
    return { ok:true };
  },

  async unbanUser(username, adminUser) {
    if (!this.isAdmin(adminUser)) return { ok:false, error:'Sin permisos de administrador.' };
    // Borrar de Firebase
    try {
      await fetch(`${FIREBASE_DB_URL}/bans/${username}.json`, { method:'DELETE' });
    } catch(e) { console.warn('[Unban] Firebase sin conexión, desban solo local'); }
    // Sincronizar localStorage local
    const users = this.getUsers();
    if (users[username]) { users[username].banned = false; this.saveUsers(users); }
    return { ok:true };
  },

  async getBannedList() {
    try {
      const res  = await fetch(`${FIREBASE_DB_URL}/bans.json`);
      const data = await res.json();
      return data || {};
    } catch(e) { return {}; }
  },

  logout(){ Storage.remove(this.SESSION_KEY); },

  updateUser(u){
    const users=this.getUsers();
    users[u.username]=u;
    this.saveUsers(users);
  },

  getAllUsers(){ return Object.values(this.getUsers()); },
};

/* ─── PROGRESS MODULE ────────────────────────── */
const Progress = {
  addXP(user,amount){
    user.xp+=amount;
    user.totalXP+=amount;
    const leveled=[];
    while(user.xp >= xpNecesaria(user.level)){
      user.xp -= xpNecesaria(user.level);
      user.level += 1;
      leveled.push(user.level);
    }
    Auth.updateUser(user);
    Leaderboard.pushScore(user);
    return leveled;
  },

  xpPercent(user){
    return Math.round((user.xp / xpNecesaria(user.level)) * 100);
  },

  getRank(level){ return RANKS.find(r=>level>=r.min&&level<=r.max)||RANKS[RANKS.length-1]; },

  recordAnswer(user,isCorrect,subject){
    user.totalAnswered=(user.totalAnswered||0)+1;
    user.subjectStats=user.subjectStats||{};
    if(!user.subjectStats[subject]) user.subjectStats[subject]={answered:0,correct:0};
    user.subjectStats[subject].answered++;
    if(isCorrect){
      user.totalCorrect=(user.totalCorrect||0)+1;
      user.subjectStats[subject].correct++;
      user.streak=(user.streak||0)+1;
      user.maxStreak=Math.max(user.maxStreak||0,user.streak);
    } else {
      user.streak=0;
    }
    Auth.updateUser(user);
  },

  checkAchievements(user){
    const newAchs=[];
    user.achievements=user.achievements||[];
    for(const ach of ACHIEVEMENTS){
      if(!user.achievements.includes(ach.id)&&ach.condition(user)){
        user.achievements.push(ach.id);
        newAchs.push(ach);
      }
    }
    if(newAchs.length) Auth.updateUser(user);
    return newAchs;
  },
};

/* ─── QUESTION ENGINE ────────────────────────── */
const QuestionEngine = {
  _usedIds:[],
  reset(){ this._usedIds=[]; },

  getRandom(subjectFilter=null){
    let pool=QUESTIONS.filter(q=>!this._usedIds.includes(q.id));
    if(subjectFilter) pool=pool.filter(q=>q.subject===subjectFilter);
    if(pool.length===0){
      this._usedIds=[];
      pool=QUESTIONS.filter(q=>subjectFilter?q.subject===subjectFilter:true);
    }
    const q=pool[Math.floor(Math.random()*pool.length)];
    this._usedIds.push(q.id);
    return q;
  },

  getShuffledOptions(question){
    const indexed=question.options.map((opt,i)=>({opt,original:i}));
    for(let i=indexed.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [indexed[i],indexed[j]]=[indexed[j],indexed[i]];
    }
    const correct=indexed.findIndex(x=>x.original===question.answer);
    return {options:indexed.map(x=>x.opt),correctIndex:correct};
  },
};

/* ─── NOTIFICATION SYSTEM ────────────────────── */
const Notify = {
  show(message,type='info',duration=3000){
    const container=document.getElementById('notification-container');
    if(!container) return;
    const el=document.createElement('div');
    el.className=`notification ${type}`;
    el.innerHTML=`<span>${message}</span>`;
    container.appendChild(el);
    setTimeout(()=>{ el.classList.add('notif-fade-out'); setTimeout(()=>el.remove(),400); },duration);
  },
  success(msg){ this.show(msg,'success'); },
  error(msg){ this.show(msg,'error',4000); },
  warning(msg){ this.show(msg,'warning'); },
  levelUp(level,rank){ this.show(`⬆ ¡NIVEL ${level} DESBLOQUEADO! — Rango ${rank}`,'levelup',5000); },
  achievement(ach){ this.show(`🏅 LOGRO: ${ach.icon} ${ach.name}`,'warning',5000); },
  medal(pos){ this.show(`🏆 ¡MEDALLA ${pos} DE TEMPORADA DESBLOQUEADA!`,'levelup',6000); },
};

/* ─── SOUND SYSTEM ───────────────────────────── */
const Sound = {
  ctx:null,
  _getCtx(){
    if(!this.ctx){ try{this.ctx=new(window.AudioContext||window.webkitAudioContext)();}catch{return null;} }
    return this.ctx;
  },
  _beep(freq,duration,type='sine',vol=0.2){
    const ctx=this._getCtx(); if(!ctx) return;
    const osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type=type; osc.frequency.value=freq;
    gain.gain.setValueAtTime(vol,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+duration);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime+duration);
  },
  correct(){ this._beep(523,0.1); setTimeout(()=>this._beep(659,0.1),100); setTimeout(()=>this._beep(784,0.2),200); },
  incorrect(){ this._beep(200,0.3,'sawtooth',0.15); },
  levelUp(){ [523,587,659,698,784,880,988,1047].forEach((f,i)=>setTimeout(()=>this._beep(f,0.15,'triangle',0.2),i*80)); },
  click(){ this._beep(800,0.05,'square',0.1); },
};

/* ─── FIREBASE CONFIG ────────────────────────── */
const FIREBASE_DB_URL = 'https://nexus-academy-b9500-default-rtdb.firebaseio.com';

/* ─── LEADERBOARD ────────────────────────────── */
const Leaderboard = {
  async pushScore(user){
    try{
      const entry={
        displayName:user.displayName,
        username:user.username,
        level:user.level,
        totalXP:user.totalXP||0,
        totalCorrect:user.totalCorrect||0,
        medals:user.medals||{gold:0,silver:0,bronze:0},
        updatedAt:Date.now(),
      };
      const res=await fetch(`${FIREBASE_DB_URL}/leaderboard/${user.username}.json`,{
        method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(entry),
      });
      if(!res.ok) throw new Error('Firebase PUT failed: '+res.status);
    }catch(e){ console.warn('[Leaderboard]',e.message); }
  },

  async getTop10(){
    try{
      const res=await fetch(`${FIREBASE_DB_URL}/leaderboard.json`);
      if(!res.ok) throw new Error('Firebase GET failed: '+res.status);
      const data=await res.json();
      if(!data) return [];
      return Object.values(data).sort((a,b)=>b.totalXP-a.totalXP).slice(0,10);
    }catch(e){
      console.warn('[Leaderboard] Fallback local:',e.message);
      return Auth.getAllUsers()
        .map(u=>({username:u.username,displayName:u.displayName,level:u.level,totalXP:u.totalXP||0,totalCorrect:u.totalCorrect||0,medals:u.medals||{gold:0,silver:0,bronze:0}}))
        .sort((a,b)=>b.totalXP-a.totalXP).slice(0,10);
    }
  },

  async getAllPlayers(){
    try{
      const res=await fetch(`${FIREBASE_DB_URL}/leaderboard.json`);
      if(!res.ok) throw new Error('Firebase GET failed: '+res.status);
      const data=await res.json();
      if(!data) return [];
      return Object.values(data).sort((a,b)=>b.totalXP-a.totalXP);
    }catch(e){
      console.warn('[Leaderboard] Fallback local:',e.message);
      return Auth.getAllUsers()
        .map(u=>({username:u.username,displayName:u.displayName,level:u.level,totalXP:u.totalXP||0,totalCorrect:u.totalCorrect||0,medals:u.medals||{gold:0,silver:0,bronze:0}}))
        .sort((a,b)=>b.totalXP-a.totalXP);
    }
  },


  async resetSeason(){
    try {
      const top = await this.getTop10();
      const medalMap = ['gold','silver','bronze'];

      // Asignar medallas Top 3 en Firebase
      for(let i = 0; i < Math.min(3, top.length); i++){
        const p = top[i];
        const medalType = medalMap[i];
        const r = await fetch(FIREBASE_DB_URL + '/leaderboard/' + p.username + '.json');
        const entry = await r.json() || {};
        entry.medals = entry.medals || {gold:0,silver:0,bronze:0};
        entry.medals[medalType] = (entry.medals[medalType]||0) + 1;
        await fetch(FIREBASE_DB_URL + '/leaderboard/' + p.username + '.json',{
          method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(entry),
        });
        const localUsers = Auth.getUsers();
        if(localUsers[p.username]){
          localUsers[p.username].medals = localUsers[p.username].medals || {gold:0,silver:0,bronze:0};
          localUsers[p.username].medals[medalType]++;
          Auth.saveUsers(localUsers);
        }
      }

      // Resetear TODOS los jugadores en Firebase (nivel, XP, stats)
      const allRes  = await fetch(FIREBASE_DB_URL + '/leaderboard.json');
      const allData = await allRes.json() || {};
      const resetEntries = {};
      for(const uname of Object.keys(allData)){
        const entry = allData[uname];
        resetEntries[uname] = {
          displayName: entry.displayName,
          username:    entry.username,
          medals:      entry.medals || {gold:0,silver:0,bronze:0},
          level:1, xp:0, totalXP:0,
          totalCorrect:0, totalAnswered:0,
          streak:0, maxStreak:0, subjectStats:{},
          updatedAt: Date.now(),
        };
      }
      await fetch(FIREBASE_DB_URL + '/leaderboard.json',{
        method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(resetEntries),
      });

      // Señal global de reset para que TODOS los dispositivos la detecten al cargar
      const resetTimestamp = Date.now();
      await fetch(FIREBASE_DB_URL + '/season_reset.json',{
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ resetAt: resetTimestamp, by: ADMIN_USERNAME }),
      });
      Storage.set('eduicfes_last_reset', resetTimestamp);

      // Resetear localStorage local tambien
      const localUsers = Auth.getUsers();
      for(const uname of Object.keys(localUsers)){
        const u = localUsers[uname];
        u.level=1; u.xp=0; u.totalXP=0;
        u.totalAnswered=0; u.totalCorrect=0;
        u.streak=0; u.maxStreak=0; u.subjectStats={};
      }
      Auth.saveUsers(localUsers);

      return { ok:true, top3: top.slice(0,3) };
    } catch(e){
      console.error('[Season Reset]', e);
      return { ok:false, error: e.message };
    }
  },
};

/* ─── ANNOUNCEMENTS (Firebase) ──────────────────── */
const Announcements = {
  async publish(text, adminUser) {
    if (!Auth.isAdmin(adminUser)) return { ok:false, error:'Sin permisos de administrador.' };
    if (!text || !text.trim()) return { ok:false, error:'El anuncio no puede estar vacio.' };
    const entry = { text: text.trim(), author: adminUser.displayName, createdAt: Date.now(), id: Date.now().toString() };
    try {
      const res = await fetch(FIREBASE_DB_URL + '/announcements/' + entry.id + '.json', {
        method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(entry),
      });
      if(!res.ok) throw new Error('Firebase error');
      return { ok:true };
    } catch(e) {
      const local = Storage.get('eduicfes_announcements') || {};
      local[entry.id] = entry;
      Storage.set('eduicfes_announcements', local);
      return { ok:true };
    }
  },

  // Obtener anuncios nuevos (ultimas 48h, no vistos)
  async getNew(user) {
    const seenKey = 'eduicfes_seen_' + user.username;
    const seen = Storage.get(seenKey) || [];
    const since = Date.now() - 48 * 60 * 60 * 1000; // 48h para mayor alcance
    let all = [];
    try {
      const res = await fetch(FIREBASE_DB_URL + '/announcements.json');
      if (res.ok) { const data = await res.json(); if (data) all = Object.values(data); }
    } catch(e) {
      const local = Storage.get('eduicfes_announcements') || {};
      all = Object.values(local);
    }
    return all.filter(a => a.createdAt > since && !seen.includes(a.id))
              .sort((a,b) => b.createdAt - a.createdAt);
  },

  markSeen(user, ids) {
    const seenKey = 'eduicfes_seen_' + user.username;
    const seen = Storage.get(seenKey) || [];
    Storage.set(seenKey, [...new Set([...seen, ...ids])]);
  },

  async delete(id, adminUser) {
    if (!Auth.isAdmin(adminUser)) return { ok:false, error:'Sin permisos de administrador.' };
    try { await fetch(FIREBASE_DB_URL + '/announcements/' + id + '.json', { method:'DELETE' }); }
    catch(e) {
      const local = Storage.get('eduicfes_announcements') || {};
      delete local[id];
      Storage.set('eduicfes_announcements', local);
    }
    return { ok:true };
  },

  async getAll() {
    try {
      const res = await fetch(FIREBASE_DB_URL + '/announcements.json');
      if (res.ok) {
        const data = await res.json();
        if (!data) return [];
        return Object.values(data).sort((a,b) => b.createdAt - a.createdAt);
      }
    } catch(e) {}
    const local = Storage.get('eduicfes_announcements') || {};
    return Object.values(local).sort((a,b) => b.createdAt - a.createdAt);
  },
};

/* ─── RECOMENDACIONES (WhatsApp) ─────────────────
   Numero admin: 3204005807 (Colombia)
─────────────────────────────────────────────────*/
const ADMIN_WHATSAPP = '573204005807';

const Recomendaciones = {
  enviar(texto) {
    if (!texto || !texto.trim()) return { ok: false, error: 'La recomendacion no puede estar vacia.' };
    const user = Auth.getCurrentUser();
    const nombre = user ? user.displayName : 'Anonimo';
    const mensaje = encodeURIComponent(
      '*Edu-Icfes - Recomendacion*\n\n' +
      'Usuario: ' + nombre + '\n' +
      'Mensaje:\n' + texto.trim()
    );
    window.open('https://wa.me/' + ADMIN_WHATSAPP + '?text=' + mensaje, '_blank');
    return { ok: true };
  }
};

/* ─── DOM HELPERS ────────────────────────────── */
const $=(sel,ctx=document)=>ctx.querySelector(sel);
const $$=(sel,ctx=document)=>[...ctx.querySelectorAll(sel)];
function el(tag,classes,content){
  const e=document.createElement(tag);
  if(classes) e.className=classes;
  if(content) e.innerHTML=content;
  return e;
}

/* ─── REDIRECT HELPERS ───────────────────────── */

// Verifica ban en Firebase al cargar cualquier pagina protegida
async function checkBanOnLoad(username) {
  try {
    const res  = await fetch(FIREBASE_DB_URL + '/bans/' + username + '.json');
    const data = await res.json();
    if (data && data.banned === true) {
      // Aplicar ban en local y forzar logout
      const users = Auth.getUsers();
      if (users[username]) { users[username].banned = true; Auth.saveUsers(users); }
      Auth.logout();
      window.location.href = 'index.html?banned=1';
      return true; // esta baneado
    }
  } catch(e) {
    // Sin conexion: confiar en localStorage
    const users = Auth.getUsers();
    if (users[username] && users[username].banned) {
      Auth.logout();
      window.location.href = 'index.html?banned=1';
      return true;
    }
  }
  return false;
}

// Verifica si hay un reset de temporada nuevo
async function checkSeasonResetOnLoad(username) {
  try {
    const res  = await fetch(FIREBASE_DB_URL + '/season_reset.json');
    const data = await res.json();
    if (!data || !data.resetAt) return;

    const lastReset = Storage.get('eduicfes_last_reset') || 0;
    if (data.resetAt > lastReset) {
      // Hay un reset nuevo que este dispositivo no ha aplicado
      const users = Auth.getUsers();
      if (users[username]) {
        const u = users[username];
        u.level=1; u.xp=0; u.totalXP=0;
        u.totalAnswered=0; u.totalCorrect=0;
        u.streak=0; u.maxStreak=0; u.subjectStats={};
        Auth.saveUsers(users);
      }
      Storage.set('eduicfes_last_reset', data.resetAt);
    }
  } catch(e) {
    // Sin conexion: no hacer nada
  }
}

function requireAuth() {
  const user = Auth.getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return null; }

  // Ejecutar checks asincrónicos en background (ban + season reset)
  checkBanOnLoad(user.username);
  checkSeasonResetOnLoad(user.username);

  return user;
}

function redirectIfLoggedIn() {
  const user = Auth.getCurrentUser();
  if (user) window.location.href = 'main.html';
}

// Mostrar mensaje de ban si viene de un kick
(function checkBannedMessage() {
  if (window.location.search.includes('banned=1')) {
    setTimeout(() => {
      const n = document.getElementById('notification-container');
      if (n) {
        const el2 = document.createElement('div');
        el2.className = 'notification error';
        el2.innerHTML = '<span>Tu cuenta ha sido suspendida por el administrador.</span>';
        n.appendChild(el2);
      }
    }, 400);
  }
})();

/* ─── EXPORT ─────────────────────────────────── */
Object.assign(window, {
  Auth, Progress, QuestionEngine, Notify, Sound, Leaderboard,
  Recomendaciones, Announcements, Storage,
  SUBJECTS, ACHIEVEMENTS, RANKS, QUESTIONS,
  ADMIN_USERNAME, ADMIN_WHATSAPP, FIREBASE_DB_URL,
  xpNecesaria, recompensaXP, XP_BONUS_STREAK,
  $, $$, el, requireAuth, redirectIfLoggedIn,
  checkBanOnLoad, checkSeasonResetOnLoad,
});
