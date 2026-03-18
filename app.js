/* ============================================
   NEXUS ACADEMY — app.js
   Core logic: auth, progress, questions, achievements
   ============================================ */

'use strict';

/* ─── CONSTANTS ──────────────────────────────── */
const XP_PER_LEVEL = 100;
const XP_REWARD = 20;
const XP_BONUS_STREAK = 10;

const RANKS = [
  { min: 1,  max: 4,  rank: 'E', label: 'Aprendiz',     color: '#888' },
  { min: 5,  max: 9,  rank: 'D', label: 'Explorador',   color: '#00aaff' },
  { min: 10, max: 14, rank: 'C', label: 'Combatiente',  color: '#00ff88' },
  { min: 15, max: 19, rank: 'B', label: 'Guerrero',     color: '#9d4edd' },
  { min: 20, max: 24, rank: 'A', label: 'Élite',        color: '#ff6b35' },
  { min: 25, max: 99, rank: 'S', label: 'Leyenda',      color: '#ffd700' },
];

const SUBJECTS = {
  math:     { label: 'Matemáticas',    icon: '', tag: 'tag-math',     color: '#4dcfff' },
  reading:  { label: 'Lectura Crítica', icon: '', tag: 'tag-reading',  color: '#c77dff' },
  english:  { label: 'Inglés',          icon: '', tag: 'tag-english',  color: '#00ff88' },
  science:  { label: 'Ciencias',        icon: '', tag: 'tag-science',  color: '#ff8c5a' },
  sociales: { label: 'Sociales',        icon: '', tag: 'tag-sociales', color: '#ffd700' },
};

/* ─── QUESTION BANK ──────────────────────────── */
const QUESTIONS = [
  // MATEMÁTICAS
  {
    id: 1, subject: 'math',
    question: 'Si f(x) = 3x² − 2x + 1, ¿cuál es f(2)?',
    options: ['9', '11', '13', '7'],
    answer: 0, // index of correct option
    explanation: 'f(2) = 3(4) − 2(2) + 1 = 12 − 4 + 1 = 9'
  },
  {
    id: 2, subject: 'math',
    question: '¿Cuánto es 15% de 240?',
    options: ['32', '36', '40', '24'],
    answer: 1,
    explanation: '15% de 240 = (15/100) × 240 = 36'
  },
  {
    id: 3, subject: 'math',
    question: 'Un triángulo tiene lados de 5, 12 y 13 cm. ¿Qué tipo de triángulo es?',
    options: ['Acutángulo', 'Obtusángulo', 'Rectángulo', 'Equilátero'],
    answer: 2,
    explanation: '5² + 12² = 25 + 144 = 169 = 13². Cumple el teorema de Pitágoras.'
  },
  {
    id: 4, subject: 'math',
    question: 'Resuelve: log₂(32) = ?',
    options: ['4', '5', '6', '3'],
    answer: 1,
    explanation: '2⁵ = 32, por lo tanto log₂(32) = 5'
  },
  {
    id: 5, subject: 'math',
    question: 'El resultado de (x + 3)(x − 3) es:',
    options: ['x² + 6x + 9', 'x² − 6', 'x² − 9', 'x² + 9'],
    answer: 2,
    explanation: 'Diferencia de cuadrados: (a+b)(a−b) = a² − b²'
  },
  {
    id: 6, subject: 'math',
    question: 'Si 2x + 5 = 17, entonces x = ?',
    options: ['5', '6', '7', '4'],
    answer: 1,
    explanation: '2x = 12 → x = 6'
  },
  {
    id: 7, subject: 'math',
    question: '¿Cuál es la raíz cuadrada de 144?',
    options: ['11', '12', '13', '14'],
    answer: 1,
    explanation: '12 × 12 = 144'
  },
  {
    id: 8, subject: 'math',
    question: 'El 30% de un número es 90. ¿Cuál es el número?',
    options: ['250', '270', '300', '330'],
    answer: 2,
    explanation: '0.30 × n = 90 → n = 90/0.30 = 300'
  },

  // LECTURA CRÍTICA
  {
    id: 9, subject: 'reading',
    question: '"Todos los cisnes son blancos" es un ejemplo de razonamiento:',
    options: ['Deductivo', 'Inductivo', 'Analógico', 'Hipotético'],
    answer: 1,
    explanation: 'Se parte de observaciones particulares para llegar a una conclusión general → inductivo.'
  },
  {
    id: 10, subject: 'reading',
    question: '¿Cuál figura retórica usa "el viento suspira en la tarde"?',
    options: ['Metáfora', 'Hipérbole', 'Personificación', 'Símil'],
    answer: 2,
    explanation: 'Atribuir "suspirar" (acción humana) al viento es una personificación o prosopopeya.'
  },
  {
    id: 11, subject: 'reading',
    question: 'En un texto argumentativo, la "tesis" es:',
    options: ['La conclusión del texto', 'La posición que el autor defiende', 'Un ejemplo de apoyo', 'La introducción temática'],
    answer: 1,
    explanation: 'La tesis es el punto de vista central que el autor busca defender con argumentos.'
  },
  {
    id: 12, subject: 'reading',
    question: 'La ironía consiste en decir lo contrario de lo que se piensa para:',
    options: ['Insultar', 'Criticar o bromear', 'Definir algo', 'Narrar un hecho'],
    answer: 1,
    explanation: 'La ironía expresa lo opuesto de lo que se quiere decir, generalmente con intención crítica o humorística.'
  },
  {
    id: 13, subject: 'reading',
    question: '"Más rápido que un rayo" es un ejemplo de:',
    options: ['Metáfora', 'Hipérbole', 'Símil', 'Anáfora'],
    answer: 2,
    explanation: 'El símil compara dos cosas usando "como", "igual que", "más... que", etc.'
  },

  // INGLÉS
  {
    id: 14, subject: 'english',
    question: 'Choose the correct sentence:',
    options: ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She not like coffee.'],
    answer: 2,
    explanation: 'With third person singular (she/he/it), we use "doesn\'t" + base verb.'
  },
  {
    id: 15, subject: 'english',
    question: 'The past tense of "go" is:',
    options: ['goed', 'gone', 'went', 'goes'],
    answer: 2,
    explanation: '"Go" is an irregular verb. Its simple past is "went".'
  },
  {
    id: 16, subject: 'english',
    question: '"The book _____ written by García Márquez."',
    options: ['is', 'was', 'were', 'be'],
    answer: 1,
    explanation: 'We use "was" for passive voice in the simple past with singular subjects.'
  },
  {
    id: 17, subject: 'english',
    question: 'What does "although" mean in Spanish?',
    options: ['por lo tanto', 'además', 'aunque', 'sin embargo'],
    answer: 2,
    explanation: '"Although" = "aunque". It introduces a concessive clause.'
  },
  {
    id: 18, subject: 'english',
    question: 'Which sentence is in Present Perfect?',
    options: ['I went to Paris.', 'I have been to Paris.', 'I go to Paris.', 'I was going to Paris.'],
    answer: 1,
    explanation: 'Present Perfect = have/has + past participle. "I have been" is correct.'
  },
  {
    id: 19, subject: 'english',
    question: '"Courage" in Spanish means:',
    options: ['crueldad', 'coraje/valentía', 'curiosidad', 'cortesía'],
    answer: 1,
    explanation: '"Courage" = valentía, coraje. It shares a root with the Spanish "coraje".'
  },

  // CIENCIAS
  {
    id: 20, subject: 'science',
    question: 'La fórmula del agua es H₂O porque:',
    options: ['Tiene 2 átomos de oxígeno y 1 de hidrógeno', 'Tiene 2 átomos de hidrógeno y 1 de oxígeno', 'Tiene 3 átomos de hidrógeno', 'Tiene 2 moléculas de oxígeno'],
    answer: 1,
    explanation: 'H₂O: 2 átomos de Hidrógeno (H) y 1 átomo de Oxígeno (O) por molécula.'
  },
  {
    id: 21, subject: 'science',
    question: 'La velocidad de la luz en el vacío es aproximadamente:',
    options: ['300 km/s', '300.000 km/s', '30.000 km/s', '3.000 km/s'],
    answer: 1,
    explanation: 'c ≈ 3 × 10⁸ m/s = 300.000 km/s (aproximadamente 300 mil km por segundo).'
  },
  {
    id: 22, subject: 'science',
    question: '¿Qué ley establece que F = m × a?',
    options: ['Primera ley de Newton', 'Segunda ley de Newton', 'Tercera ley de Newton', 'Ley de Hooke'],
    answer: 1,
    explanation: 'La Segunda Ley de Newton: la fuerza neta es igual a la masa por la aceleración.'
  },
  {
    id: 23, subject: 'science',
    question: '¿Qué elemento tiene símbolo "Fe" en la tabla periódica?',
    options: ['Flúor', 'Fósforo', 'Hierro', 'Francio'],
    answer: 2,
    explanation: 'Fe viene del latín "Ferrum" = Hierro. Número atómico 26.'
  },
  {
    id: 24, subject: 'science',
    question: 'La fotosíntesis produce:',
    options: ['CO₂ y H₂O', 'O₂ y glucosa', 'N₂ y glucosa', 'O₂ y CO₂'],
    answer: 1,
    explanation: '6CO₂ + 6H₂O + luz → C₆H₁₂O₆ (glucosa) + 6O₂'
  },
  {
    id: 25, subject: 'science',
    question: '¿Cuál es el pH del agua pura?',
    options: ['6', '7', '8', '9'],
    answer: 1,
    explanation: 'El agua pura tiene pH = 7, considerado neutro (ni ácido ni básico).'
  },
  {
    id: 26, subject: 'science',
    question: 'La unidad de medida de la fuerza en el SI es:',
    options: ['Joule', 'Pascal', 'Newton', 'Watt'],
    answer: 2,
    explanation: 'El Newton (N) es la unidad de fuerza en el Sistema Internacional.'
  },

  // SOCIALES
  {
    id: 27, subject: 'sociales',
    question: '¿En qué año se firmó la Constitución Política de Colombia vigente?',
    options: ['1886', '1991', '1978', '2002'],
    answer: 1,
    explanation: 'La Constitución Política de Colombia fue promulgada el 4 de julio de 1991.'
  },
  {
    id: 28, subject: 'sociales',
    question: '¿Quién fue el principal líder del proceso de Independencia de Colombia?',
    options: ['Bolívar y Santander', 'Antonio Nariño', 'Camilo Torres', 'Policarpa Salavarrieta'],
    answer: 0,
    explanation: 'Simón Bolívar y Francisco de Paula Santander lideraron el proceso independentista.'
  },
  {
    id: 29, subject: 'sociales',
    question: '¿En qué año se declaró la Independencia de Colombia?',
    options: ['1810', '1819', '1821', '1830'],
    answer: 0,
    explanation: 'El 20 de julio de 1810 se dio el Grito de Independencia en Bogotá.'
  },
  {
    id: 30, subject: 'sociales',
    question: 'La Batalla de Boyacá ocurrió el:',
    options: ['7 de agosto de 1819', '20 de julio de 1810', '17 de diciembre de 1819', '25 de septiembre de 1828'],
    answer: 0,
    explanation: 'El 7 de agosto de 1819 se libró la Batalla de Boyacá, que selló la independencia de Colombia.'
  },
  {
    id: 31, subject: 'sociales',
    question: '¿Cuál es la capital de Colombia?',
    options: ['Medellín', 'Cali', 'Bogotá', 'Barranquilla'],
    answer: 2,
    explanation: 'Bogotá D.C. (Distrito Capital) es la capital de la República de Colombia.'
  },
  {
    id: 32, subject: 'sociales',
    question: '¿Qué documento proclamó Simón Bolívar como "Libertador"?',
    options: ['Constitución de Angostura', 'Carta de Jamaica', 'Decreto de Trujillo', 'Acta de Independencia'],
    answer: 1,
    explanation: 'En la Carta de Jamaica (1815), Bolívar expuso su visión de la independencia latinoamericana.'
  },
  {
    id: 33, subject: 'sociales',
    question: '¿En cuántos departamentos está dividida Colombia actualmente?',
    options: ['28', '30', '32', '34'],
    answer: 2,
    explanation: 'Colombia está dividida en 32 departamentos más el Distrito Capital de Bogotá.'
  },
];

/* ─── ACHIEVEMENTS ───────────────────────────── */
const ACHIEVEMENTS = [
  { id: 'first_answer',   icon: '⚡', name: 'Primer paso',    desc: 'Responde tu primera pregunta',              condition: (u) => u.totalAnswered >= 1 },
  { id: 'streak_3',       icon: '🔥', name: 'subiendo De Nivel',         desc: 'Consigue 3 respuestas correctas seguidas',  condition: (u) => u.maxStreak >= 3 },
  { id: 'streak_5',       icon: '💥', name: 'Imparable',         desc: 'Consigue 5 respuestas correctas seguidas',  condition: (u) => u.maxStreak >= 5 },
  { id: 'level_5',        icon: '⭐', name: 'Rango D',           desc: 'Alcanza el nivel 5',                       condition: (u) => u.level >= 5 },
  { id: 'level_10',       icon: '🌟', name: 'Rango C',           desc: 'Alcanza el nivel 10',                      condition: (u) => u.level >= 10 },
  { id: 'level_20',       icon: '👑', name: 'Rango A',           desc: 'Alcanza el nivel 20',                      condition: (u) => u.level >= 20 },
  { id: 'all_subjects',   icon: '🎓', name: 'Polifacético',      desc: 'Responde preguntas de todas las materias',  condition: (u) => Object.keys(u.subjectStats || {}).length >= 5 },
  { id: 'correct_10',     icon: '🎯', name: '¿Genio?',           desc: 'Responde 10 preguntas correctamente',       condition: (u) => u.totalCorrect >= 10 },
  { id: 'correct_50',     icon: '🏆', name: 'Maestro',           desc: 'Responde 50 preguntas correctamente',       condition: (u) => u.totalCorrect >= 50 },
  { id: 'answered_100',   icon: '💎', name: 'Erudito',         desc: 'Responde 100 preguntas en total',           condition: (u) => u.totalAnswered >= 100 },
];

/* ─── STORAGE HELPERS ────────────────────────── */
const Storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch { return false; }
  },
  remove: (key) => localStorage.removeItem(key),
};

/* ─── USER DATA STRUCTURE ────────────────────── */
function createUser(username, displayName, password) {
  return {
    username,
    displayName,
    password, // NOTE: In a real app, this would be hashed. For localStorage demo, stored plaintext.
    level: 1,
    xp: 0,
    totalXP: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    maxStreak: 0,
    achievements: [],
    subjectStats: {},
    createdAt: Date.now(),
    lastLogin: Date.now(),
  };
}

/* ─── AUTH MODULE ────────────────────────────── */
const Auth = {
  SESSION_KEY: 'nexus_session',
  USERS_KEY: 'nexus_users',

  getUsers() {
    return Storage.get(this.USERS_KEY) || {};
  },

  saveUsers(users) {
    Storage.set(this.USERS_KEY, users);
  },

  getCurrentUser() {
    const session = Storage.get(this.SESSION_KEY);
    if (!session) return null;
    const users = this.getUsers();
    return users[session] || null;
  },

  register(username, displayName, password) {
    const users = this.getUsers();
    if (users[username]) return { ok: false, error: 'El usuario ya existe.' };
    if (username.length < 3) return { ok: false, error: 'Usuario muy corto (mín. 3 caracteres).' };
    if (password.length < 4) return { ok: false, error: 'Contraseña muy corta (mín. 4 caracteres).' };
    users[username] = createUser(username, displayName || username, password);
    this.saveUsers(users);
    Storage.set(this.SESSION_KEY, username);
    return { ok: true };
  },

  login(username, password) {
    const users = this.getUsers();
    const user = users[username];
    if (!user) return { ok: false, error: 'Usuario no encontrado.' };
    if (user.password !== password) return { ok: false, error: 'Contraseña incorrecta.' };
    user.lastLogin = Date.now();
    this.saveUsers(users);
    Storage.set(this.SESSION_KEY, username);
    // Sincronizar puntuación existente al iniciar sesión
    Leaderboard.pushScore(user);
    return { ok: true };
  },

  logout() {
    Storage.remove(this.SESSION_KEY);
  },

  updateUser(updatedUser) {
    const users = this.getUsers();
    users[updatedUser.username] = updatedUser;
    this.saveUsers(users);
  },

  getAllUsers() {
    return Object.values(this.getUsers());
  },
};

/* ─── PROGRESS MODULE ────────────────────────── */
const Progress = {
  addXP(user, amount) {
    user.xp += amount;
    user.totalXP += amount;
    const leveledUp = [];

    while (user.xp >= XP_PER_LEVEL) {
      user.xp -= XP_PER_LEVEL;
      user.level += 1;
      leveledUp.push(user.level);
    }

    Auth.updateUser(user);

    // Sincronizar con Firebase en segundo plano
    Leaderboard.pushScore(user);

    return leveledUp;
  },

  xpForNextLevel(user) {
    return XP_PER_LEVEL;
  },

  xpPercent(user) {
    return Math.round((user.xp / XP_PER_LEVEL) * 100);
  },

  getRank(level) {
    return RANKS.find(r => level >= r.min && level <= r.max) || RANKS[RANKS.length - 1];
  },

  recordAnswer(user, isCorrect, subject) {
    user.totalAnswered = (user.totalAnswered || 0) + 1;
    user.subjectStats = user.subjectStats || {};

    if (!user.subjectStats[subject]) {
      user.subjectStats[subject] = { answered: 0, correct: 0 };
    }
    user.subjectStats[subject].answered++;

    if (isCorrect) {
      user.totalCorrect = (user.totalCorrect || 0) + 1;
      user.subjectStats[subject].correct++;
      user.streak = (user.streak || 0) + 1;
      user.maxStreak = Math.max(user.maxStreak || 0, user.streak);
    } else {
      user.streak = 0;
    }

    Auth.updateUser(user);
  },

  checkAchievements(user) {
    const newAchievements = [];
    user.achievements = user.achievements || [];

    for (const ach of ACHIEVEMENTS) {
      if (!user.achievements.includes(ach.id) && ach.condition(user)) {
        user.achievements.push(ach.id);
        newAchievements.push(ach);
      }
    }

    if (newAchievements.length) Auth.updateUser(user);
    return newAchievements;
  },
};

/* ─── QUESTION ENGINE ────────────────────────── */
const QuestionEngine = {
  _usedIds: [],

  reset() {
    this._usedIds = [];
  },

  getRandom(subjectFilter = null) {
    let pool = QUESTIONS.filter(q => !this._usedIds.includes(q.id));
    if (subjectFilter) pool = pool.filter(q => q.subject === subjectFilter);
    if (pool.length === 0) {
      this._usedIds = [];
      pool = QUESTIONS.filter(q => subjectFilter ? q.subject === subjectFilter : true);
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    this._usedIds.push(q.id);
    return q;
  },

  getShuffledOptions(question) {
    // Returns options with original indices shuffled
    const indexed = question.options.map((opt, i) => ({ opt, original: i }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    const correct = indexed.findIndex(x => x.original === question.answer);
    return { options: indexed.map(x => x.opt), correctIndex: correct };
  },
};

/* ─── NOTIFICATION SYSTEM ────────────────────── */
const Notify = {
  show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `notification ${type}`;
    el.innerHTML = `<span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('notif-fade-out');
      setTimeout(() => el.remove(), 400);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error', 4000); },
  warning(msg) { this.show(msg, 'warning'); },
  levelUp(level, rank) {
    this.show(`⬆ ¡NIVEL ${level} DESBLOQUEADO! — Rango ${rank}`, 'levelup', 5000);
  },
  achievement(ach) {
    this.show(`🏅 LOGRO: ${ach.icon} ${ach.name}`, 'warning', 5000);
  },
};

/* ─── SOUND SYSTEM ───────────────────────────── */
const Sound = {
  ctx: null,

  _getCtx() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch { return null; }
    }
    return this.ctx;
  },

  _beep(freq, duration, type = 'sine', vol = 0.2) {
    const ctx = this._getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  },

  correct() {
    this._beep(523, 0.1); // C5
    setTimeout(() => this._beep(659, 0.1), 100); // E5
    setTimeout(() => this._beep(784, 0.2), 200); // G5
  },

  incorrect() {
    this._beep(200, 0.3, 'sawtooth', 0.15);
  },

  levelUp() {
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => {
      setTimeout(() => this._beep(f, 0.15, 'triangle', 0.2), i * 80);
    });
  },

  click() {
    this._beep(800, 0.05, 'square', 0.1);
  },
};

/* ─── FIREBASE CONFIG ────────────────────────── */
const FIREBASE_DB_URL = 'https://nexus-academy-b9500-default-rtdb.firebaseio.com';

/* ─── LEADERBOARD (Firebase Realtime Database) ── */
const Leaderboard = {

  /**
   * Sube/actualiza la puntuación del usuario actual en Firebase.
   * Se llama automáticamente cada vez que el usuario gana XP.
   */
  async pushScore(user) {
    try {
      const entry = {
        displayName: user.displayName,
        username: user.username,
        level: user.level,
        totalXP: user.totalXP || 0,
        totalCorrect: user.totalCorrect || 0,
        updatedAt: Date.now(),
      };
      // PUT sobreescribe la entrada del usuario (clave = username)
      const res = await fetch(
        `${FIREBASE_DB_URL}/leaderboard/${user.username}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        }
      );
      if (!res.ok) throw new Error('Firebase PUT failed: ' + res.status);
    } catch (e) {
      // Si no hay internet, falla silenciosamente — el juego sigue funcionando
      console.warn('[Leaderboard] No se pudo sincronizar con Firebase:', e.message);
    }
  },

  /**
   * Obtiene el Top 10 desde Firebase.
   * Devuelve los datos locales como fallback si no hay conexión.
   */
  async getTop10() {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/leaderboard.json`);
      if (!res.ok) throw new Error('Firebase GET failed: ' + res.status);
      const data = await res.json();
      if (!data) return [];

      // Convertir objeto a array, ordenar por XP y tomar top 10
      return Object.values(data)
        .sort((a, b) => b.totalXP - a.totalXP)
        .slice(0, 10);

    } catch (e) {
      console.warn('[Leaderboard] Usando datos locales:', e.message);
      // Fallback: mostrar solo usuarios locales
      const users = Auth.getAllUsers();
      return users
        .map(u => ({
          username: u.username,
          displayName: u.displayName,
          level: u.level,
          totalXP: u.totalXP || 0,
          totalCorrect: u.totalCorrect || 0,
        }))
        .sort((a, b) => b.totalXP - a.totalXP)
        .slice(0, 10);
    }
  },
};

/* ─── DOM HELPERS ────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function el(tag, classes = '', content = '') {
  const e = document.createElement(tag);
  if (classes) e.className = classes;
  if (content) e.innerHTML = content;
  return e;
}

/* ─── REDIRECT HELPERS ───────────────────────── */
function requireAuth() {
  const user = Auth.getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}

function redirectIfLoggedIn() {
  const user = Auth.getCurrentUser();
  if (user) window.location.href = 'main.html';
}

/* ─── EXPORT TO WINDOW ───────────────────────── */
Object.assign(window, {
  Auth, Progress, QuestionEngine, Notify, Sound, Leaderboard,
  Storage, SUBJECTS, ACHIEVEMENTS, RANKS, QUESTIONS,
  XP_PER_LEVEL, XP_REWARD, XP_BONUS_STREAK,
  $, $$, el, requireAuth, redirectIfLoggedIn,
});
