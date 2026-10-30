import { Check } from "lucide-react";
import { GradientBackground } from "../components/GradientBackground";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
   const [name, setName] = useState(localStorage.getItem("name") || "");
   const navigate = useNavigate();

   const handleSaveName = () => {
      if (!name.trim()) return;
      localStorage.setItem("name", name.trim());
      navigate("/begin");
   };

   return (
      <>
         <GradientBackground />
         <main className="main">
            <h1 className="main__title">Swipey</h1>
            <form
               className="main__name"
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveName();
               }}
            >
               <input
                  className="main__input"
                  type="text"
                  maxLength={40}
                  aria-label="Введите имя"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <button
                  className="main__button"
                  type="submit"
                  aria-label="Сохранить имя"
                  disabled={!name.trim()}
               >
                  <Check />
               </button>
            </form>
            <p className="main__description">Выбери кино или сериал на вечер</p>
         </main>
      </>
   );
}

export { HomePage };
