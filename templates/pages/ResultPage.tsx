import { HeartCrack, RotateCcw } from "lucide-react";
import { Header } from "../components/Header";
import { Intro } from "../components/Intro";
import { Poster } from "../components/Poster";

function ResultPage() {
   // TODO: загрузить сессию, хранить выбранную вкладку и игрока, вычислить список фильмов.
   return (
      <>
         {/* TODO: вернуть этот экран, если нет завершённой сессии второго игрока. */}
         <Intro>
            <div className="center-block">
               <h2>Пока нет результатов</h2>
               <button
                  className="primary"
                  onClick={undefined /* TODO: вернуться к началу */}
               >
                  На главную
               </button>
            </div>
         </Intro>

         {/* TODO: показывать этот экран для завершённой сессии второго игрока. */}
         <main className="workspace">
            <Header name={"" /* TODO: имя игрока */} />
            <section className="result-area">
               <nav className="result-tabs">
                  <button
                     className={"" /* TODO: active для вкладки совпадений */}
                     onClick={undefined /* TODO: выбрать вкладку совпадений */}
                  >
                     Совпадения
                  </button>
                  <button
                     className={
                        "" /* TODO: active для вкладки личных результатов */
                     }
                     onClick={
                        undefined /* TODO: выбрать вкладку личных результатов */
                     }
                  >
                     Мой результат
                  </button>
               </nav>
               {/* TODO: показывать переключатель игроков только для личных результатов. */}
               <div className="person-tabs">
                  <button
                     className={"" /* TODO: selected для первого игрока */}
                     onClick={undefined /* TODO: выбрать первого игрока */}
                  >
                     {/* TODO: имя первого игрока */}
                  </button>
                  <button
                     className={"" /* TODO: selected для второго игрока */}
                     onClick={undefined /* TODO: выбрать второго игрока */}
                  >
                     {/* TODO: имя второго игрока */}
                  </button>
               </div>
               {/* TODO: показывать сетку, если список фильмов не пустой. */}
               <div className="movie-grid">
                  {/* TODO: повторить этот элемент через map для каждого найденного фильма. */}
                  <div
                     key={"" /* TODO: id фильма */}
                     title={"" /* TODO: название фильма */}
                  >
                     <Poster movie={undefined /* TODO: фильм */} small />
                  </div>
               </div>
               {/* TODO: показывать пустое состояние вместо сетки, если список пустой. */}
               <div className="empty-state">
                  <HeartCrack size={50} />
                  <h2>Пока нет совпадений</h2>
                  <p>Может быть, вы выберете что-то новое в следующий раз?</p>
               </div>
               <div className="result-footer">
                  <button
                     onClick={
                        undefined /* TODO: очистить сессию и вернуться к началу */
                     }
                  >
                     <RotateCcw size={16} /> Начать снова
                  </button>
               </div>
            </section>
         </main>
      </>
   );
}

export { ResultPage };
