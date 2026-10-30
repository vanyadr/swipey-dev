import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Heart, HeartCrack, RotateCcw } from "lucide-react";
import { Header } from "../components/Header";
import { Poster } from "../components/Poster";
import {
   movies,
   readSession,
   saveSession,
   type Movie,
   type Session,
} from "../model";

function SwipeCard({
   movie,
   onChoice,
   disabled,
}: {
   movie: Movie;
   onChoice: (liked: boolean) => void;
   disabled: boolean;
}) {
   const x = useMotionValue(0);
   const rotate = useTransform(x, [-220, 220], [-16, 16]);
   const yes = useTransform(x, [0, 110], [0, 1]);
   const no = useTransform(x, [-110, 0], [1, 0]);
   const busy = useRef(false);
   function choose(liked: boolean) {
      if (busy.current || disabled) return;
      busy.current = true;
      animate(x, liked ? 550 : -550, { duration: 0.28 }).then(() =>
         onChoice(liked),
      );
   }
   return (
      <motion.div
         className="swipe-card"
         style={{ x, rotate }}
         drag={disabled ? false : "x"}
         dragConstraints={{ left: 0, right: 0 }}
         dragElastic={0.95}
         onDragEnd={(_e, info) => {
            if (Math.abs(info.offset.x) > 95 || Math.abs(info.velocity.x) > 650)
               choose(info.offset.x > 0);
            else animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
         }}
      >
         <Poster movie={movie} />
         <div className="card-shade" />
         <span className="card-label">Кино и сериалы</span>
         <motion.span
            className="vote-stamp vote-stamp--yes"
            style={{ opacity: yes }}
         >
            НРАВИТСЯ
         </motion.span>
         <motion.span
            className="vote-stamp vote-stamp--no"
            style={{ opacity: no }}
         >
            НЕ МОЁ
         </motion.span>
         <span className="card-meta">
            <strong>{movie.title}</strong>
            <small>
               {movie.year} · {movie.genre}
            </small>
         </span>
         <div className="drag-hotspot">
            <button
               onClick={() => choose(false)}
               aria-label="Не нравится"
               disabled={disabled}
            >
               ←
            </button>
            <button
               onClick={() => choose(true)}
               aria-label="Нравится"
               disabled={disabled}
            >
               →
            </button>
         </div>
      </motion.div>
   );
}

function GamePage() {
   const nav = useNavigate();
   const [s, set] = useState<Session | null>(() => readSession());
   const [locked, setLocked] = useState(false);
   useEffect(() => {
      if (!s) nav("/begin", { replace: true });
      else if (s.votes.length === s.order.length)
         nav(s.role === 1 ? "/share" : "/result", { replace: true });
   }, [s, nav]);
   if (!s) return null;
   const id = s.order[s.votes.length];
   const movie = movies.find((m) => m.id === id);
   const update = (liked: boolean) => {
      if (locked || !movie) return;
      setLocked(true);
      const next = { ...s, votes: [...s.votes, { id: movie.id, liked }] };
      saveSession(next);
      set(next);
      setLocked(false);
   };
   const undo = () => {
      if (!s.votes.length || locked) return;
      const next = { ...s, votes: s.votes.slice(0, -1) };
      saveSession(next);
      set(next);
   };
   return (
      <main className="workspace">
         <Header name={s.name} />
         <div className="swipe-area">
            <div className="progress-line">
               <span>{s.role === 1 ? "Первый игрок" : "Второй игрок"}</span>
               <span>{s.votes.length} / 15</span>
            </div>
            <div className="progress-track">
               <div style={{ width: `${(s.votes.length / 15) * 100}%` }} />
            </div>
            {movie && (
               <Fragment key={id}>
                  <SwipeCard
                     movie={movie}
                     onChoice={update}
                     disabled={locked}
                  />
                  <div className="vote-buttons">
                     <button
                        onClick={() => update(false)}
                        className="no"
                        aria-label="Дизлайк"
                     >
                        <HeartCrack size={64} fill="currentColor" />
                     </button>
                     <button
                        onClick={() => update(true)}
                        className="yes"
                        aria-label="Лайк"
                     >
                        <Heart size={64} fill="currentColor" />
                     </button>
                  </div>
               </Fragment>
            )}
            <div className="bottom-actions">
               <button onClick={undo} disabled={!s.votes.length}>
                  <RotateCcw size={17} /> Отменить
               </button>
               <button
                  onClick={() => nav(s.role === 1 ? "/share" : "/result")}
                  disabled={s.votes.length < 15}
               >
                  Завершить
               </button>
            </div>
         </div>
      </main>
   );
}

export { GamePage };
