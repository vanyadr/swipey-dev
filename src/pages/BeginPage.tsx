import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Intro } from "../components/Intro";
import { freshSession, getName, saveSession } from "../model";

function BeginPage() {
   const nav = useNavigate();
   const name = getName();
   useEffect(() => {
      if (!name) nav("/", { replace: true });
   }, [name, nav]);
   return (
      <Intro>
         <div className="start-actions">
            <button
               onClick={() => {
                  saveSession(freshSession(name));
                  nav("/game");
               }}
            >
               Начать
            </button>
            <button onClick={() => nav("/qr")}>Подключиться</button>
         </div>
      </Intro>
   );
}

export { BeginPage };
