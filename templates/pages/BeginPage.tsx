import { Intro } from "../components/Intro";

function BeginPage() {
   // TODO: получить имя и настроить переходы; без имени вернуться на главную.
   return (
      <Intro>
         <div className="start-actions">
            <button
               onClick={
                  undefined /* TODO: создать и сохранить сессию, перейти к игре */
               }
            >
               Начать
            </button>
            <button onClick={undefined /* TODO: перейти к сканированию QR */}>
               Подключиться
            </button>
         </div>
      </Intro>
   );
}

export { BeginPage };
