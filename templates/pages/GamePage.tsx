import { Fragment } from "react";
import { Heart, HeartCrack, RotateCcw } from "lucide-react";
import { Header } from "../components/Header";
import { SwipeCard } from "../components/SwipeCard";

function GamePage() {
   // TODO: загрузить сессию, хранить состояние игры и блокировки, найти текущий фильм.
   // TODO: без сессии вернуться к началу; после всех голосов открыть QR или результаты.
   return (
      <main className="workspace">
         <Header name={"" /* TODO: имя игрока */} />
         <div className="swipe-area">
            {/* TODO: показывать карточку и кнопки, только если есть текущий фильм. */}
            <Fragment key={"" /* TODO: id текущего фильма */}>
               <SwipeCard
                  movie={undefined /* TODO: текущий фильм */}
                  onChoice={
                     undefined /* TODO: сохранить голос и перейти к следующему фильму */
                  }
                  disabled={false /* TODO: состояние блокировки */}
               />
               <div className="vote-buttons">
                  <button
                     onClick={undefined /* TODO: дизлайк */}
                     className="no"
                     aria-label="Дизлайк"
                  >
                     <HeartCrack size={64} />
                  </button>
                  <button
                     onClick={undefined /* TODO: лайк */}
                     className="yes"
                     aria-label="Лайк"
                  >
                     <Heart size={64} />
                  </button>
               </div>
            </Fragment>
            <div className="bottom-actions">
               <button
                  onClick={undefined /* TODO: отменить последний голос */}
                  disabled={false /* TODO: нет голосов */}
               >
                  <RotateCcw size={17} /> Отменить
               </button>
               <button
                  onClick={
                     undefined /* TODO: открыть QR или результаты в зависимости от роли */
                  }
                  disabled={false /* TODO: оценены ещё не все фильмы */}
               >
                  Завершить
               </button>
            </div>
         </div>
      </main>
   );
}

export { GamePage };
