import { ScanLine } from "lucide-react";
import { Intro } from "../components/Intro";

function QrPage() {
   // TODO: создать ref для видео и состояния ссылки и ошибки.
   // TODO: запустить сканер в эффекте, проверить приглашение и остановить камеру при уходе.
   return (
      <Intro>
         <div className="scan-content">
            <h2>Наведите камеру на QR-код, чтобы подключиться</h2>
            <div className="scan-window">
               <video
                  autoPlay
                  muted
                  playsInline
                  ref={undefined /* TODO: ref видео */}
               />
               <ScanLine />
            </div>
            <form
               onSubmit={
                  undefined /* TODO: отменить отправку формы, проверить ссылку и открыть приглашение */
               }
            >
               <input
                  aria-label="Ссылка приглашения"
                  value={undefined /* TODO: ссылка */}
                  placeholder="Или вставьте ссылку"
                  onChange={undefined /* TODO: обновить ссылку */}
               />
               <button className="primary">Открыть</button>
            </form>
            {/* TODO: показывать сообщение, только если есть ошибка. */}
            <p role="alert">{/* TODO: текст ошибки */}</p>
            <button
               className="text-button"
               onClick={undefined /* TODO: вернуться к началу */}
            >
               Назад
            </button>
         </div>
      </Intro>
   );
}

export { QrPage };
