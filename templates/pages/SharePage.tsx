import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { Intro } from "../components/Intro";

function SharePage() {
   // TODO: загрузить сессию; без завершённой сессии первого игрока вернуться к началу.
   // TODO: создать приглашение и ссылку; хранить состояние копирования.
   return (
      <Intro>
         <div className="qr-content">
            <h2>Отсканируйте QR-код, чтобы подключиться</h2>
            <div className="qr-square">
               <QRCodeSVG
                  value={"" /* TODO: ссылка приглашения */}
                  size={206}
                  marginSize={1}
               />
            </div>
            <p>Передайте ссылку второму игроку</p>
            <button
               className="outline-button"
               onClick={
                  undefined /* TODO: скопировать ссылку и обновить состояние */
               }
            >
               <Copy size={18} />
               {/* TODO: после копирования показывать «Скопировано». */}
               Скопировать ссылку
            </button>
            <button
               className="text-button"
               onClick={
                  undefined /* TODO: открыть приглашение на этом телефоне */
               }
            >
               Продолжить на этом телефоне
            </button>
         </div>
      </Intro>
   );
}

export { SharePage };
