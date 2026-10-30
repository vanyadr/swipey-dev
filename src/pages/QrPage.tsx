import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserQRCodeReader } from "@zxing/browser";
import { ScanLine } from "lucide-react";
import { Intro } from "../components/Intro";
import { decodeInvitation } from "../model";

function QrPage() {
   const nav = useNavigate();
   const video = useRef<HTMLVideoElement>(null);
   const [error, setError] = useState("");
   const [link, setLink] = useState("");
   useEffect(() => {
      let stopped = false;
      const scanner = new BrowserQRCodeReader();
      let controls: { stop: () => void } | undefined;
      async function go() {
         try {
            controls = await scanner.decodeFromVideoDevice(
               undefined,
               video.current!,
               (result) => {
                  if (stopped || !result) return;
                  const value = result.getText();
                  try {
                     const parsed = new URL(value);
                     const encoded = new URLSearchParams(
                        parsed.hash.slice(1),
                     ).get("s");
                     if (!encoded || !decodeInvitation(encoded)) throw Error();
                     stopped = true;
                     controls?.stop();
                     nav("/join#s=" + encoded);
                  } catch {
                     setError("QR-код не содержит приглашение Swipey");
                  }
               },
            );
            if (stopped) controls.stop();
         } catch {
            if (!stopped)
               setError("Нет доступа к камере. Вставьте ссылку вручную.");
         }
      }
      go();
      return () => {
         stopped = true;
         controls?.stop();
      };
   }, [nav]);
   function connect() {
      try {
         const url = new URL(link);
         const encoded = new URLSearchParams(url.hash.slice(1)).get("s");
         if (!encoded || !decodeInvitation(encoded)) throw Error();
         nav("/join#s=" + encoded);
      } catch {
         setError("Проверьте ссылку приглашения");
      }
   }
   return (
      <Intro>
         <div className="scan-content">
            <h2>Наведите камеру на QR-код, чтобы подключиться</h2>
            <div className="scan-window">
               <video autoPlay muted playsInline ref={video} />
               <ScanLine />
            </div>
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  connect();
               }}
            >
               <input
                  aria-label="Ссылка приглашения"
                  value={link}
                  placeholder="Или вставьте ссылку"
                  onChange={(e) => setLink(e.target.value)}
               />
               <button className="primary">Открыть</button>
            </form>
            {error && <p role="alert">{error}</p>}
            <button className="text-button" onClick={() => nav("/begin")}>
               Назад
            </button>
         </div>
      </Intro>
   );
}

export { QrPage };
