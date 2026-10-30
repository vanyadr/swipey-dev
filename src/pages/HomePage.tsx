import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSession, freshSession } from "../model";
import { Intro } from "../components/Intro";

function HomePage() {
   const [name, setName] = useState("");
   const nav = useNavigate();

   const handleSaveName = () => {
      localStorage.setItem("name", name);
      saveSession(freshSession(name));
      nav("/game");
   };

   return (
      <Intro>
         <main className="main">
            <h1 className="main__title">Swipey</h1>
            <div className="main__name">
               <input
                  className="main__input"
                  type="text"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <button className="main__button" onClick={handleSaveName}>
                  <Check />
               </button>
            </div>
         </main>
      </Intro>
   );
}

export { HomePage };
