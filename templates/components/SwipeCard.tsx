import { motion } from "motion/react";
import { Poster } from "./Poster";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: получить props, добавить тип Movie, хуки и обработчик свайпа.
function SwipeCard(_props: {
   movie?: unknown;
   onChoice?: (liked: boolean) => void;
   disabled?: boolean;
}) {
   return (
      <motion.div
         className="swipe-card"
         style={{ x: 0 /* TODO: смещение */, rotate: 0 /* TODO: поворот */ }}
         drag={false /* TODO: "x", если карточка не заблокирована */}
         dragConstraints={{ left: 0, right: 0 }}
         dragElastic={0.95}
         onDragEnd={undefined /* TODO: обработчик окончания свайпа */}
      >
         <Poster movie={undefined /* TODO: фильм */} />
         <div className="card-shade" />
         <span className="card-label">Кино и сериалы</span>
         <motion.span
            className="vote-stamp vote-stamp--yes"
            style={{ opacity: 0 /* TODO: прозрачность лайка */ }}
         >
            ЛАЙК
         </motion.span>
         <motion.span
            className="vote-stamp vote-stamp--no"
            style={{ opacity: 0 /* TODO: прозрачность дизлайка */ }}
         >
            ДИЗЛАЙК
         </motion.span>
         <span className="card-meta">
            <strong>{/* TODO: название фильма */}</strong>
            <small>
               {/* TODO: год */} · {/* TODO: жанр */}
            </small>
         </span>
      </motion.div>
   );
}

export { SwipeCard };
