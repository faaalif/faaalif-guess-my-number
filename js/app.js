const $ = s => document.querySelector(s);
const rint = n => 1 + Math.floor(Math.random() * n);

// ---------- Textos (español / inglés) ----------
const T = {
  es: {
    title: "Adivina mi número",
    h1a: "Adivina mi", h1b: "número",
    lede: "Armé tres bots y los puse a competir por encontrar el mismo número secreto. Uno prueba uno por uno, otro dispara al azar y el último siempre pregunta por la mitad. Mira cuánto tarda cada uno.",
    s1: "números posibles", s2: "intentos como máximo para el bot binario", s3: "intentos si fueran mil millones",
    tab1: "01 / Carrera", tab2: "02 / Adivina tú", tab3: "03 / Adivina el bot",
    upTo: "Hasta", secretNum: "Número secreto", ph1: "al azar", go1: "Correr carrera",
    raceHint: "Presiona “Correr carrera” y los tres bots buscan el mismo número.",
    chartTitle: "Cómo crece el trabajo",
    chartHint: "Promedio de intentos con números secretos al azar. Ambos ejes están en escala logarítmica.",
    calc: "Calcular", tablePress: "Presiona “Calcular”.", calcing: "Calculando…",
    thN: "Tamaño", thLin: "Lineal", thRnd: "Al azar", thBin: "Binaria", thWorst: "Peor caso binaria",
    trioLin: "Lineal", trioLinP: "Prueba 1, 2, 3… hasta dar con el número. En el peor caso revisa los n números.",
    trioRnd: "Al azar", trioRndO: "O(n) esperado", trioRndP: "Dispara números cualquiera y puede repetir los que ya descartó. En promedio necesita cerca de n intentos.",
    trioBin: "Binaria", trioBinP: "Pregunta por la mitad y descarta la otra mitad en cada intento. Necesita como máximo ⌈log₂ n⌉ intentos.",
    newGame: "Nuevo juego", q2: "Pensé un número del 1 al {n}. ¿Cuál es?", guess: "Adivinar", ph2: "tu intento",
    tries: "Intentos: {c}", higher: "Más alto", lower: "Más bajo", badNum: "Escribe un número entre 1 y {n}.",
    win2a: "Lo lograste en {c} intentos. El bot binario lo habría hecho en {b}. Le ganaste o empataste.",
    win2b: "Lo lograste en {c} intentos. El bot binario lo habría hecho en {b}. Esta vez gana el bot.",
    thinkOf: "Piensa un número del 1 al", start: "Empezar",
    q3start: "Elige un número en tu mente y presiona “Empezar”.",
    smaller: "Es menor", yes: "Es ese", bigger: "Es mayor",
    ask3: "¿Tu número es {g}?", info3: "Intento {c}. Quedan {r} posibles.",
    done3: "Lo adiviné en {c} intentos.", max3: "El máximo posible para este rango es {m}.",
    oops: "Algo no cuadra: parece que alguna respuesta fue incorrecta.", restart: "Presiona “Empezar” para reiniciar.",
    secretA: "Número secreto", secretB: "en el rango 1 a {n}",
    botLin: "Bot lineal", botRnd: "Bot al azar", botBin: "Bot binario", guesses: "intentos",
    axisY: "intentos", legLin: "lineal", legRnd: "al azar", legBin: "binaria",
    madeBy: "hecho por", empty: ""
  },
  en: {
    title: "Guess my number",
    h1a: "Guess my", h1b: "number",
    lede: "I built three bots and made them race to find the same secret number. One tries every number in order, one guesses blindly, and one always asks about the middle. Watch how long each one takes.",
    s1: "possible numbers", s2: "guesses at most for the binary bot", s3: "guesses if it were a billion",
    tab1: "01 / Race", tab2: "02 / You guess", tab3: "03 / Bot guesses",
    upTo: "Up to", secretNum: "Secret number", ph1: "random", go1: "Run the race",
    raceHint: "Press “Run the race” and the three bots look for the same number.",
    chartTitle: "How the work grows",
    chartHint: "Average guesses with random secret numbers. Both axes use a logarithmic scale.",
    calc: "Calculate", tablePress: "Press “Calculate”.", calcing: "Calculating…",
    thN: "Size", thLin: "Linear", thRnd: "Random", thBin: "Binary", thWorst: "Binary worst case",
    trioLin: "Linear", trioLinP: "Tries 1, 2, 3… until it finds the number. In the worst case it checks all n numbers.",
    trioRnd: "Random", trioRndO: "O(n) expected", trioRndP: "Fires off any number and may repeat ones it already ruled out. On average it needs about n guesses.",
    trioBin: "Binary", trioBinP: "Asks about the middle and discards the other half with every guess. It needs at most ⌈log₂ n⌉ guesses.",
    newGame: "New game", q2: "I picked a number from 1 to {n}. Which one is it?", guess: "Guess", ph2: "your guess",
    tries: "Guesses: {c}", higher: "Higher", lower: "Lower", badNum: "Enter a number between 1 and {n}.",
    win2a: "You got it in {c} guesses. The binary bot would have needed {b}. You beat it or tied.",
    win2b: "You got it in {c} guesses. The binary bot would have needed {b}. The bot wins this one.",
    thinkOf: "Think of a number from 1 to", start: "Start",
    q3start: "Pick a number in your head and press “Start”.",
    smaller: "It’s lower", yes: "That’s it", bigger: "It’s higher",
    ask3: "Is your number {g}?", info3: "Guess {c}. {r} possibilities left.",
    done3: "I got it in {c} guesses.", max3: "The maximum for this range is {m}.",
    oops: "Something doesn’t add up: one of the answers must have been wrong.", restart: "Press “Start” to restart.",
    secretA: "Secret number", secretB: "in the range 1 to {n}",
    botLin: "Linear bot", botRnd: "Random bot", botBin: "Binary bot", guesses: "guesses",
    axisY: "guesses", legLin: "linear", legRnd: "random", legBin: "binary",
    madeBy: "made by", empty: ""
  }
};

let lang = (navigator.language || "es").startsWith("en") ? "en" : "es";
try { lang = localStorage.getItem("lang") || lang; } catch (e) {}
let lastRace = null, lastRows = null;

const t = (k, p = {}) => (T[lang][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const fmt = n => n.toLocaleString(lang === "es" ? "es-MX" : "en-US");
function put(el, k, p = {}) {
  el.dataset.k = k; el.dataset.p = JSON.stringify(p); el.textContent = t(k, p);
}

function applyLang() {
  document.documentElement.lang = lang;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll("[data-ph]").forEach(e => e.placeholder = t(e.dataset.ph));
  document.querySelectorAll("[data-k]").forEach(e => e.textContent = t(e.dataset.k, JSON.parse(e.dataset.p || "{}")));
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  if (lastRace) renderRace(true);
  if (lastRows) { drawChart(lastRows); drawTable(lastRows); }
}
document.querySelectorAll(".lang button").forEach(b => b.onclick = () => {
  lang = b.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLang();
});

// ---------- Los tres bots ----------
// Cada uno recibe el rango 1..n y el número secreto s, y devuelve cuántos intentos necesitó.

// Lineal: prueba 1, 2, 3... O(n)
function lineal(n, s) {
  let c = 0;
  for (let x = 1; x <= n; x++) { c++; if (x === s) return c; }
}
// Al azar: dispara cualquier número, puede repetir. O(n) esperado
function azar(n, s) {
  let c = 0;
  for (;;) { c++; if (rint(n) === s) return c; }
}
// Binaria: pregunta por la mitad y descarta la otra mitad. O(log n)
function binaria(n, s) {
  let lo = 1, hi = n, c = 0;
  while (lo <= hi) {
    c++;
    const mid = Math.floor((lo + hi) / 2);
    if (mid === s) return c;
    if (mid < s) lo = mid + 1; else hi = mid - 1;
  }
}

// ---------- Pestañas ----------
document.querySelectorAll(".tabs button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".tabs button").forEach(x => x.classList.toggle("on", x === b));
  ["t1", "t2", "t3"].forEach(id => $("#" + id).classList.toggle("hide", id !== b.dataset.tab));
});

// ---------- 01 Carrera ----------
$("#go1").onclick = () => {
  const n = +$("#n1").value;
  let s = parseInt($("#s1").value);
  if (!s || s < 1 || s > n) s = rint(n);
  lastRace = { n, s, r: [lineal(n, s), azar(n, s), binaria(n, s)] };
  renderRace(false);
};

function renderRace(instant) {
  const { n, s, r } = lastRace, mx = Math.max(...r);
  const names = ["botLin", "botRnd", "botBin"], cls = ["lin", "azr", "bin"];
  $("#out1").innerHTML =
    `<p class="secret">${t("secretA")} <b>${fmt(s)}</b> ${t("secretB", { n: fmt(n) })}</p>` +
    r.map((a, i) => {
      const pct = Math.max(0.6, a / mx * 100), dur = (0.4 + 2.2 * a / mx).toFixed(2);
      const style = `--d:${dur}s;` + (instant ? `transition:none;width:${pct}%` : "");
      return `<div class="bot"><span class="name"><i class="dot ${cls[i]}"></i>${t(names[i])}</span>
        <div class="track"><div class="fill ${cls[i]}" style="${style}" data-w="${pct}"></div></div>
        <span class="val">${fmt(a)} ${t("guesses")}</span></div>`;
    }).join("");
  if (!instant) requestAnimationFrame(() => requestAnimationFrame(() =>
    document.querySelectorAll("#out1 .fill").forEach(f => f.style.width = f.dataset.w + "%")));
}

// Gráfica con ejes logarítmicos
function drawChart(rows) {
  const W = 640, H = 300, L = 52, R = 16, T0 = 20, B = 34;
  const px = x => L + (x - 1) / 5 * (W - L - R);
  const py = y => H - B - y / 6 * (H - T0 - B);
  const lab = ["1", "10", "100", "1k", "10k", "100k", "1M"];
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("chartTitle")}">`;
  for (let y = 0; y <= 6; y++)
    s += `<line class="grid" x1="${L}" x2="${W - R}" y1="${py(y)}" y2="${py(y)}"/>` +
         `<text x="${L - 8}" y="${py(y) + 4}" text-anchor="end">${lab[y]}</text>`;
  for (let x = 1; x <= 6; x++)
    s += `<text x="${px(x)}" y="${H - 12}" text-anchor="middle">${lab[x]}</text>`;
  s += `<text x="${L}" y="12">${t("axisY")}</text>`;
  ["lin", "azr", "bin"].forEach((c, i) => {
    const d = rows.map((q, k) => (k ? "L" : "M") + px(Math.log10(q.n)).toFixed(1) + " " +
      py(Math.log10(Math.max(q.a[i], 1))).toFixed(1)).join(" ");
    s += `<path class="${c}" d="${d}"/>`;
  });
  let x = L + 14;
  [["lin", "legLin"], ["azr", "legRnd"], ["bin", "legBin"]].forEach(([c, k]) => {
    const w = t(k);
    s += `<text x="${x}" y="${T0 + 8}" class="l-${c}">${w}</text>`;
    x += w.length * 7 + 22;
  });
  $("#chart").innerHTML = s + "</svg>";
}

function drawTable(rows) {
  $("#tab tbody").innerHTML = rows.map(q => `<tr><td>${fmt(q.n)}</td>` +
    q.a.map(v => `<td>${fmt(Math.round(v * 10) / 10)}</td>`).join("") +
    `<td>${Math.ceil(Math.log2(q.n))}</td></tr>`).join("");
}

$("#go2").onclick = () => {
  $("#tab tbody").innerHTML = `<tr><td colspan="5" class="hint" data-k="calcing" data-p="{}">${t("calcing")}</td></tr>`;
  setTimeout(() => {
    lastRows = [10, 100, 1000, 10000, 100000, 1000000].map(n => {
      const k = n >= 1000000 ? 3 : 30, sum = [0, 0, 0];
      for (let i = 0; i < k; i++) {
        const s = rint(n);
        sum[0] += lineal(n, s); sum[1] += azar(n, s); sum[2] += binaria(n, s);
      }
      return { n, a: sum.map(v => v / k) };
    });
    drawChart(lastRows); drawTable(lastRows);
  }, 30);
};

// ---------- 02 Adivina tú ----------
let sec2, tr2;
function new2() {
  const n = +$("#n2").value;
  sec2 = rint(n); tr2 = 0;
  put($("#q2"), "q2", { n: fmt(n) });
  put($("#m2"), "empty");
  put($("#i2"), "tries", { c: 0 });
  $("#g2").value = ""; $("#b2").disabled = false;
}
$("#new2").onclick = new2;
$("#n2").onchange = new2;
$("#b2").onclick = () => {
  const g = parseInt($("#g2").value), n = +$("#n2").value;
  if (!g || g < 1 || g > n) { put($("#m2"), "badNum", { n: fmt(n) }); return; }
  tr2++; put($("#i2"), "tries", { c: tr2 });
  if (g < sec2) put($("#m2"), "higher");
  else if (g > sec2) put($("#m2"), "lower");
  else {
    $("#b2").disabled = true;
    const b = binaria(n, sec2);
    put($("#m2"), tr2 <= b ? "win2a" : "win2b", { c: tr2, b });
  }
};
$("#g2").addEventListener("keydown", e => { if (e.key === "Enter") $("#b2").click(); });

// ---------- 03 El bot adivina ----------
let lo3, hi3, gs3, c3, on3 = false;
function ask3() {
  gs3 = Math.floor((lo3 + hi3) / 2);
  put($("#q3"), "ask3", { g: fmt(gs3) });
  put($("#i3"), "info3", { c: c3, r: fmt(hi3 - lo3 + 1) });
}
$("#new3").onclick = () => { lo3 = 1; hi3 = +$("#n3").value; c3 = 1; on3 = true; ask3(); };
$("#btn3").onclick = e => {
  const a = e.target.dataset && e.target.dataset.a;
  if (!a || !on3) return;
  if (a === "ok") {
    on3 = false;
    put($("#q3"), "done3", { c: c3 });
    put($("#i3"), "max3", { m: Math.ceil(Math.log2(+$("#n3").value)) });
    return;
  }
  if (a === "menor") hi3 = gs3 - 1; else lo3 = gs3 + 1;
  if (lo3 > hi3) {
    on3 = false;
    put($("#q3"), "oops"); put($("#i3"), "restart");
    return;
  }
  c3++; ask3();
};

// ---------- Inicio ----------
new2();
applyLang();
