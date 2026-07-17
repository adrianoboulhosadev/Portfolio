/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONTACT_LINKS,
  EXPERIENCE_BULLETS,
  I18N,
  type Lang,
  NAV_LINKS,
  STACK,
  STATS,
  TYPE_WORDS,
} from "@/lib/content";

const MONO = "var(--font-jetbrains), monospace";

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 13px",
  border: "1px solid rgba(139,92,246,.28)",
  borderRadius: 8,
  background: "linear-gradient(180deg, rgba(139,92,246,.08), rgba(139,92,246,.03))",
  color: "#cdc7db",
  fontFamily: MONO,
  fontSize: "11.5px",
  letterSpacing: ".4px",
  textTransform: "uppercase",
  fontWeight: 700,
  transition:
    "transform .25s, border-color .25s, box-shadow .25s, background .25s, color .25s",
  cursor: "default",
};

const chipIconWrap: React.CSSProperties = {
  display: "inline-flex",
  width: 20,
  height: 20,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const catLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontFamily: MONO,
  fontSize: 12,
  fontWeight: 700,
  paddingTop: 7,
  color: "#a78bfa",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "132px 1fr",
  gap: 20,
  alignItems: "start",
  padding: "15px 0",
  borderTop: "1px solid rgba(139,92,246,.12)",
};

const navLinkStyle: React.CSSProperties = { transition: "color .2s" };

function onChipEnter(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transform = "translateY(-3px)";
  el.style.borderColor = "rgba(167,139,250,.95)";
  el.style.boxShadow = "0 8px 22px rgba(139,92,246,.4)";
  el.style.background = "linear-gradient(180deg, rgba(139,92,246,.2), rgba(139,92,246,.07))";
  el.style.color = "#fff";
}

function onChipLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transform = "translateY(0)";
  el.style.borderColor = "rgba(139,92,246,.28)";
  el.style.boxShadow = "none";
  el.style.background = "linear-gradient(180deg, rgba(139,92,246,.08), rgba(139,92,246,.03))";
  el.style.color = "#cdc7db";
}

function onMagnetMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${
    (e.clientY - r.top - r.height / 2) * 0.35
  }px)`;
}

function onMagnetLeave(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "none";
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [year] = useState(() => new Date().getFullYear());
  const rootRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);

  const t = (o: { en: string; pt: string }) => (lang === "pt" ? o.pt : o.en);
  const cvHref = "/assets/adriano-curriculo.pdf";
  const cvName = "adriano-currículo.pdf";

  // ---------- Typewriter (restarts on language change) ----------
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    const words = TYPE_WORDS[lang];
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer: number | undefined;
    let active = true;

    const tick = () => {
      if (!active) return;
      const w = words[wi] || "";
      el.textContent = w.slice(0, ci);
      if (!deleting) {
        if (ci < w.length) {
          ci++;
          timer = window.setTimeout(tick, 55);
        } else {
          deleting = true;
          timer = window.setTimeout(tick, 1500);
        }
      } else {
        if (ci > 0) {
          ci--;
          timer = window.setTimeout(tick, 28);
        } else {
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = window.setTimeout(tick, 220);
        }
      }
    };
    tick();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [lang]);

  // ---------- Visual effects (mount once) ----------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rafIds: number[] = [];
    const timeouts: number[] = [];
    const observers: IntersectionObserver[] = [];
    const cleanups: Array<() => void> = [];

    // ----- Boot sequence -----
    const boot = root.querySelector<HTMLElement>("[data-boot]");
    const bootLog = root.querySelector<HTMLElement>("[data-boot-log]");
    if (boot && bootLog) {
      const lines = [
        "> booting portfolio ...",
        "> modules loaded   [ok]",
        "> render( Adriano.tsx )   ✓",
      ];
      let li = 0;
      let cc = 0;
      let hidden = false;
      const done: string[] = [];
      const hideBoot = () => {
        if (hidden) return;
        hidden = true;
        boot.style.opacity = "0";
        timeouts.push(window.setTimeout(() => (boot.style.display = "none"), 380));
      };
      timeouts.push(window.setTimeout(hideBoot, 2600));
      const bt = () => {
        if (hidden) return;
        if (li >= lines.length) {
          timeouts.push(window.setTimeout(hideBoot, 160));
          return;
        }
        const line = lines[li];
        bootLog.innerHTML =
          done.map((l) => "<div>" + l + "</div>").join("") +
          '<div>' +
          line.slice(0, cc) +
          '<span style="color:#a78bfa">▊</span></div>';
        if (cc < line.length) {
          cc++;
          timeouts.push(window.setTimeout(bt, 9));
        } else {
          done.push(line);
          li++;
          cc = 0;
          timeouts.push(window.setTimeout(bt, 55));
        }
      };
      bt();
    }

    // ----- Scroll reveal -----
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(46px)";
      el.style.transition =
        "opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)";
    });
    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = parseInt(
              (e.target as HTMLElement).getAttribute("data-reveal-delay") || "0",
              10
            );
            timeouts.push(window.setTimeout(() => show(e.target as HTMLElement), d));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    observers.push(io);
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show(el);
      else io.observe(el);
    });
    timeouts.push(
      window.setTimeout(() => {
        items.forEach((el) => {
          if (el.style.opacity === "0") show(el);
        });
      }, 1800)
    );

    // ----- Matrix code-rain (30fps cap) -----
    root.querySelectorAll<HTMLCanvasElement>("[data-matrix]").forEach((cv) => {
      const ctx = cv.getContext("2d");
      const parent = cv.parentElement;
      if (!ctx || !parent) return;
      const chars = "01<>/{}[]=+*;$#ABCDEF01".split("");
      let cols = 0;
      let drops: number[] = [];
      let W = 0;
      let H = 0;
      const resize = () => {
        W = cv.width = parent.offsetWidth;
        H = cv.height = parent.offsetHeight;
        cols = Math.floor(W / 16);
        drops = new Array(cols).fill(0).map(() => Math.random() * -40);
      };
      resize();
      window.addEventListener("resize", resize);
      cleanups.push(() => window.removeEventListener("resize", resize));
      let last = 0;
      const frame = 1000 / 30;
      const draw = (time: number) => {
        rafIds.push(requestAnimationFrame(draw));
        if (time - last < frame) return;
        last = time;
        ctx.fillStyle = "rgba(5,5,7,0.10)";
        ctx.fillRect(0, 0, W, H);
        ctx.font = '14px "JetBrains Mono", monospace';
        for (let i = 0; i < cols; i++) {
          const ch = chars[(Math.random() * chars.length) | 0];
          const x = i * 16;
          const y = drops[i] * 16;
          ctx.fillStyle = Math.random() > 0.94 ? "#e6dcff" : "rgba(167,139,250,0.6)";
          ctx.fillText(ch, x, y);
          if (y > H && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 0.5;
        }
      };
      rafIds.push(requestAnimationFrame(draw));
    });

    // ----- Spotlight + custom cursor -----
    const spot = root.querySelector<HTMLElement>("[data-spotlight]");
    const cur = root.querySelector<HTMLElement>("[data-cursor]");
    const onMove = (ev: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      if (spot) {
        spot.style.left = x + "px";
        spot.style.top = y + "px";
      }
      if (cur) {
        cur.style.left = x + "px";
        cur.style.top = y + "px";
        cur.style.opacity = "1";
      }
    };
    const onLeave = () => {
      if (cur) cur.style.opacity = "0";
    };
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    });

    // ----- Count-up -----
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const since = el.getAttribute("data-since");
      const to = since
        ? Math.max(1, new Date().getFullYear() - parseInt(since, 10))
        : parseInt(el.getAttribute("data-to") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      let started = false;
      const run = () => {
        if (started) return;
        started = true;
        const dur = 1400;
        const t0 = performance.now();
        const step = (time: number) => {
          const p = Math.min((time - t0) / dur, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
          if (p < 1) rafIds.push(requestAnimationFrame(step));
        };
        rafIds.push(requestAnimationFrame(step));
      };
      const co = new IntersectionObserver(
        (ents) => {
          ents.forEach((e) => {
            if (e.isIntersecting) {
              co.unobserve(e.target);
              run();
            }
          });
        },
        { threshold: 0.4 }
      );
      observers.push(co);
      co.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) run();
      timeouts.push(window.setTimeout(run, 2000));
    });

    // ----- Scroll progress -----
    const bar = root.querySelector<HTMLElement>("[data-progress]");
    const onScroll = () => {
      if (!bar) return;
      const r = root.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      bar.style.width = p * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
    onScroll();

    return () => {
      rafIds.forEach((id) => cancelAnimationFrame(id));
      timeouts.forEach((id) => clearTimeout(id));
      observers.forEach((o) => o.disconnect());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      style={{ width: "100%", background: "#050507", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div
        id="1b"
        ref={rootRef}
        style={{
          position: "relative",
          width: "100%",
          background: "#050507",
          fontFamily: MONO,
          overflow: "clip",
        }}
      >
        {/* Grid pan background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(139,92,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            animation: "gridPan 3s linear infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <canvas
          data-matrix
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: 0.28,
            pointerEvents: "none",
          }}
        />
        <div
          data-spotlight
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,.16), transparent 60%)",
            transform: "translate(-50%,-50%)",
            left: "30%",
            top: "20%",
            pointerEvents: "none",
            zIndex: 1,
            transition: "left .18s ease-out, top .18s ease-out",
          }}
        />
        <div
          data-cursor
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            border: "1px solid rgba(167,139,250,.9)",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 150,
            opacity: 0,
            transition: "opacity .3s",
            boxShadow: "0 0 14px rgba(167,139,250,.6)",
            mixBlendMode: "screen",
          }}
        />

        {/* NAVBAR */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(6,6,10,.85)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(139,92,246,.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              maxWidth: 1240,
              margin: "0 auto",
              padding: "14px clamp(18px,4vw,40px)",
            }}
          >
            <a
              href="#1b"
              style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 700, color: "#fff" }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#5eead4",
                  animation: "dotPulse 2s infinite",
                }}
              />
              adriano<span style={{ color: "#a78bfa" }}>.dev</span>
            </a>
            <div style={{ display: "flex", gap: 26, fontSize: 13, color: "#9b95ad" }}>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={navLinkStyle}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#c4b5fd")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "")}
                >
                  {t(l)}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid rgba(139,92,246,.4)",
                  borderRadius: 7,
                  overflow: "hidden",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <button
                  onClick={() => setLang("en")}
                  style={{
                    padding: "6px 11px",
                    border: "none",
                    cursor: "pointer",
                    background: lang === "en" ? "#a78bfa" : "transparent",
                    color: lang === "en" ? "#0a0810" : "#c4b5fd",
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("pt")}
                  style={{
                    padding: "6px 11px",
                    border: "none",
                    cursor: "pointer",
                    background: lang === "pt" ? "#a78bfa" : "transparent",
                    color: lang === "pt" ? "#0a0810" : "#c4b5fd",
                  }}
                >
                  PT
                </button>
              </div>
              <a
                href={cvHref}
                download={cvName}
                style={{
                  padding: "7px 15px",
                  borderRadius: 7,
                  background: "#a78bfa",
                  color: "#0a0810",
                  fontSize: 12,
                  fontWeight: 700,
                  boxShadow: "0 0 20px rgba(167,139,250,.5)",
                }}
              >
                {t(I18N.navCv)}
              </a>
            </div>
          </div>
          <div
            data-progress
            style={{
              position: "absolute",
              left: 0,
              bottom: -1,
              height: 2,
              width: "0%",
              background: "linear-gradient(90deg,#5eead4,#a78bfa,#e879f9)",
            }}
          />
        </div>

        <div data-content style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto" }}>
          {/* HERO */}
          <div style={{ position: "relative", zIndex: 2, padding: "88px clamp(18px,4vw,72px) 70px" }}>
            <div
              data-reveal
              style={{
                border: "1px solid rgba(139,92,246,.45)",
                borderRadius: 14,
                background: "rgba(9,9,15,.85)",
                overflow: "hidden",
                animation: "borderPulse 5s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 18px",
                  borderBottom: "1px solid rgba(139,92,246,.25)",
                  background: "rgba(139,92,246,.06)",
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                <span style={{ marginLeft: 14, fontSize: 13, color: "#6b6580" }}>~/adriano — zsh</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 40,
                  padding: "44px 44px 48px",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, color: "#5eead4", marginBottom: 6 }}>{t(I18N.heroWhoami)}</div>
                  <h1
                    style={{
                      fontSize: "clamp(38px,7vw,62px)",
                      lineHeight: 1,
                      fontWeight: 700,
                      margin: "0 0 4px",
                      color: "#fff",
                      animation: "glitchShift 4s infinite",
                    }}
                  >
                    Adriano
                    <br />
                    Boulhosa
                  </h1>
                  <div style={{ fontSize: 20, color: "#a78bfa", margin: "18px 0 8px" }}>
                    &gt; <span ref={typeRef} />
                    <span style={{ animation: "blink 1s step-end infinite", color: "#a78bfa" }}>▊</span>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "#8b8499",
                      margin: "24px 0 30px",
                      maxWidth: 440,
                    }}
                  >
                    {t(I18N.heroDesc)}
                  </p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <a
                      href="#stack"
                      onMouseMove={onMagnetMove}
                      onMouseLeave={onMagnetLeave}
                      style={{
                        padding: "14px 26px",
                        borderRadius: 8,
                        background: "#a78bfa",
                        color: "#0a0810",
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: "0 0 28px rgba(167,139,250,.6)",
                        transition: "transform .25s ease",
                      }}
                    >
                      ./explore.sh
                    </a>
                    <a
                      href="#contact"
                      style={{
                        padding: "14px 26px",
                        borderRadius: 8,
                        background: "transparent",
                        border: "1px solid rgba(139,92,246,.5)",
                        color: "#c4b5fd",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      ./contact.sh
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    alignSelf: "stretch",
                    minHeight: 300,
                    border: "1px solid rgba(139,92,246,.35)",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "url('/assets/adriano.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 22%",
                      filter: "grayscale(.4) contrast(1.05)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(160deg, rgba(139,92,246,.55), rgba(56,189,248,.25))",
                      mixBlendMode: "color",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(transparent 60%, rgba(5,5,7,.9))",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      fontSize: 12,
                      color: "#c4b5fd",
                      textShadow: "0 0 10px rgba(167,139,250,.8)",
                    }}
                  >
                    {t(I18N.heroStatus)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MARQUEE */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "18px 0",
              borderTop: "1px solid rgba(139,92,246,.25)",
              borderBottom: "1px solid rgba(139,92,246,.25)",
              overflow: "hidden",
              background: "rgba(139,92,246,.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "marquee 22s linear infinite",
                gap: 32,
                fontSize: 15,
                fontWeight: 500,
                color: "#a78bfa",
                whiteSpace: "nowrap",
                textShadow: "0 0 12px rgba(167,139,250,.5)",
              }}
            >
              <span>
                const stack = [ JavaScript, TypeScript, Node.js, React, Next.js, NestJS, SQLServer,
                MySQL, Docker, DDD ] &gt;&gt;
              </span>
              <span>
                const stack = [ JavaScript, TypeScript, Node.js, React, Next.js, NestJS, SQLServer,
                MySQL, Docker, DDD ] &gt;&gt;
              </span>
            </div>
          </div>

          {/* STATS */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "64px clamp(18px,4vw,72px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
              borderBottom: "1px solid rgba(139,92,246,.14)",
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} data-reveal data-reveal-delay={i * 80 || undefined}>
                <div
                  data-count
                  data-since={s.since}
                  data-to={s.to}
                  data-suffix={s.suffix}
                  style={{
                    fontSize: "clamp(36px,5vw,52px)",
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 0 24px rgba(167,139,250,.5)",
                  }}
                >
                  0
                </div>
                <div style={{ fontSize: 13, color: "#8b8499", marginTop: 6 }}>{t(s)}</div>
              </div>
            ))}
          </div>

          {/* ABOUT */}
          <div
            id="about"
            style={{ position: "relative", zIndex: 2, padding: "84px clamp(18px,4vw,72px)", scrollMarginTop: 80 }}
          >
            <div data-reveal style={{ fontSize: 13, letterSpacing: 2, color: "#5eead4", marginBottom: 18 }}>
              {t(I18N.aboutTag)}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 48,
                alignItems: "start",
              }}
            >
              <h2
                data-reveal
                dangerouslySetInnerHTML={{ __html: t(I18N.aboutHeading) }}
                style={{
                  fontSize: "clamp(28px,4vw,40px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#fff",
                  margin: 0,
                  textShadow: "0 0 24px rgba(167,139,250,.35)",
                }}
              />
              <div
                data-reveal
                data-reveal-delay={120}
                style={{ fontSize: 15, lineHeight: 1.8, color: "#8b8499" }}
              >
                <p style={{ margin: "0 0 16px" }}>{t(I18N.aboutBody)}</p>
                <p style={{ margin: 0, color: "#c4b5fd" }}>
                  $ git commit -m &quot;make it simple, then scalable&quot;
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div
            id="stack"
            style={{ position: "relative", zIndex: 2, padding: "20px clamp(18px,4vw,72px) 84px", scrollMarginTop: 40 }}
          >
            <div data-reveal style={{ fontSize: 13, letterSpacing: 2, color: "#5eead4", marginBottom: 14 }}>
              {t(I18N.stackTag)}
            </div>
            {STACK.map((cat) => (
              <div key={cat.en} data-reveal style={rowStyle}>
                <div style={catLabelStyle}>
                  <span style={{ color: "#5eead4" }}>[</span>
                  <span>{t(cat)}</span>
                  <span style={{ color: "#5eead4" }}>]</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {cat.chips.map((chip, ci) => (
                    <span
                      key={ci}
                      style={chipStyle}
                      onMouseEnter={onChipEnter}
                      onMouseLeave={onChipLeave}
                    >
                      <span style={chipIconWrap}>
                        {chip.icon ? (
                          <img
                            src={chip.icon}
                            alt={chip.label || t({ en: chip.en!, pt: chip.pt! })}
                            width={18}
                            height={18}
                            style={chip.iconStyle}
                          />
                        ) : (
                          <span style={{ color: "#a78bfa", fontSize: 15 }}>{chip.glyph}</span>
                        )}
                      </span>
                      {chip.label ? chip.label : t({ en: chip.en!, pt: chip.pt! })}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* EXPERIENCE */}
          <div
            id="experience"
            style={{ position: "relative", zIndex: 2, padding: "20px clamp(18px,4vw,72px) 84px", scrollMarginTop: 80 }}
          >
            <div data-reveal style={{ fontSize: 13, letterSpacing: 2, color: "#5eead4", marginBottom: 12 }}>
              {t(I18N.expTag)}
            </div>
            <h2
              data-reveal
              style={{
                fontSize: "clamp(24px,3.5vw,34px)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 40px",
                textShadow: "0 0 24px rgba(167,139,250,.3)",
              }}
            >
              {t(I18N.expHeading)}
            </h2>
            <div style={{ position: "relative", paddingLeft: 34 }}>
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  top: 6,
                  bottom: 6,
                  width: 2,
                  background: "linear-gradient(#a78bfa, rgba(167,139,250,.1))",
                }}
              />
              <div data-reveal style={{ position: "relative", marginBottom: 30 }}>
                <span
                  style={{
                    position: "absolute",
                    left: -34,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#a78bfa",
                    boxShadow: "0 0 14px #a78bfa",
                    border: "3px solid #050507",
                  }}
                />
                <div
                  style={{
                    border: "1px solid rgba(139,92,246,.3)",
                    borderRadius: 12,
                    background: "rgba(139,92,246,.04)",
                    padding: "26px 28px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{t(I18N.expRole)}</div>
                    <div style={{ fontSize: 13, color: "#5eead4" }}>{t(I18N.expPeriod)}</div>
                  </div>
                  <ul
                    style={{
                      margin: "18px 0 0",
                      paddingLeft: 18,
                      color: "#a79fb8",
                      fontSize: 14,
                      lineHeight: 1.9,
                    }}
                  >
                    {EXPERIENCE_BULLETS.map((b, i) => (
                      <li key={i}>{t(b)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div data-reveal data-reveal-delay={80} style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: -34,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#1a1524",
                    boxShadow: "0 0 10px rgba(167,139,250,.4)",
                    border: "3px solid #050507",
                  }}
                />
                <div style={{ padding: "4px 4px 4px 0", color: "#8b8499", fontSize: 14 }}>
                  {t(I18N.expClosing)}
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div
            id="contact"
            data-reveal
            style={{
              position: "relative",
              zIndex: 2,
              padding: "80px clamp(18px,4vw,72px) 100px",
              textAlign: "center",
              scrollMarginTop: 80,
            }}
          >
            <div style={{ fontSize: 13, letterSpacing: 2, color: "#5eead4", marginBottom: 18 }}>
              {t(I18N.contactTag)}
            </div>
            <h2
              dangerouslySetInnerHTML={{ __html: t(I18N.contactHeading) }}
              style={{
                fontSize: "clamp(30px,5vw,48px)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 20px",
                textShadow: "0 0 30px rgba(167,139,250,.5)",
              }}
            />
            <p style={{ fontSize: 15, color: "#8b8499", margin: "0 0 34px" }}>{t(I18N.contactSub)}</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={CONTACT_LINKS.email}
                onMouseMove={onMagnetMove}
                onMouseLeave={onMagnetLeave}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 8,
                  background: "#a78bfa",
                  color: "#0a0810",
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: "0 0 28px rgba(167,139,250,.5)",
                  transition: "transform .25s ease",
                }}
              >
                ● Email
              </a>
              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "14px 24px",
                  borderRadius: 8,
                  border: "1px solid rgba(139,92,246,.5)",
                  color: "#c4b5fd",
                  fontSize: 14,
                }}
              >
                LinkedIn
              </a>
              <a
                href={CONTACT_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "14px 24px",
                  borderRadius: 8,
                  border: "1px solid rgba(139,92,246,.5)",
                  color: "#c4b5fd",
                  fontSize: 14,
                }}
              >
                GitHub
              </a>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 8,
                  background: "#25D366",
                  color: "#05210f",
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: "0 0 28px rgba(37,211,102,.45)",
                }}
              >
                ● WhatsApp
              </a>
            </div>
            <div
              style={{
                marginTop: 26,
                display: "flex",
                gap: 14,
                justifyContent: "center",
                fontSize: 13,
                color: "#6b6580",
              }}
            >
              <a
                href={cvHref}
                download={cvName}
                style={{ borderBottom: "1px solid rgba(167,139,250,.4)", paddingBottom: 2 }}
              >
                {t(I18N.contactResume)}
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            position: "relative",
            zIndex: 2,
            padding: "26px clamp(18px,4vw,72px)",
            borderTop: "1px solid rgba(139,92,246,.22)",
            background: "rgba(139,92,246,.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: MONO,
            fontSize: "12.5px",
            color: "#6b6580",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#5eead4",
                boxShadow: "0 0 10px #5eead4",
              }}
            />
            <span>© {year} Adriano Boulhosa</span>
          </div>
          <div style={{ color: "#8b8499" }}>{t(I18N.footerBuilt)}</div>
          <a href="#1b" style={{ color: "#a78bfa" }}>
            $ exit &amp;&amp; scroll --top
          </a>
        </footer>

        {/* BOOT OVERLAY */}
        <div
          data-boot
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 200,
            background: "#050507",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "150px 60px",
            transition: "opacity .38s ease",
          }}
        >
          <div
            data-boot-log
            style={{
              fontFamily: MONO,
              fontSize: 15,
              lineHeight: 2,
              color: "#5eead4",
              textShadow: "0 0 10px rgba(94,234,212,.4)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
