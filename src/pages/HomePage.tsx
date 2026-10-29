import { Check } from "lucide-react";
import { GradientBackground } from "../components/GradientBackground";
import { useState } from "react";

function HomePage() {
   const [name, setName] = useState("");

   const handleSaveName = () => {
      localStorage.setItem("name", name);
   };

   return (
      <>
         <GradientBackground />
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
            <p className="main__description">Выбери кино или сериал на вечер</p>
         </main>
      </>
   );
}

export { HomePage };
