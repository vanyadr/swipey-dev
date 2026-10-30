import { Intro } from "../components/Intro";

function JoinPage() {
   // TODO: прочитать и расшифровать приглашение из URL, хранить введённое имя.
   return (
      <>
         {/* TODO: вернуть этот экран, если приглашения нет или оно некорректно. */}
         <Intro>
            <div className="center-block">
               <h2>Приглашение не найдено</h2>
               <button
                  className="primary"
                  onClick={undefined /* TODO: перейти к сканированию QR */}
               >
                  Сканировать QR
               </button>
            </div>
         </Intro>

         {/* TODO: показывать форму, если приглашение корректно. */}
         <Intro>
            <form
               className="join-form"
               onSubmit={
                  undefined /* TODO: отменить отправку формы, сохранить имя и сессию второго игрока, открыть игру */
               }
            >
               <h2>
                  {/* TODO: имя первого игрока */} приглашает выбрать кино
                  вместе!
               </h2>
               <p>Оцените те же 15 фильмов, и мы найдём совпадения</p>
               <input
                  aria-label="Ваше имя"
                  maxLength={40}
                  placeholder="Ваше имя"
                  value={undefined /* TODO: введённое имя */}
                  onChange={undefined /* TODO: обновить имя */}
               />
               <button
                  className="primary"
                  disabled={false /* TODO: имя пустое */}
               >
                  Присоединиться
               </button>
            </form>
         </Intro>
      </>
   );
}

export { JoinPage };
