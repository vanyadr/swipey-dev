import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Intro } from "../components/Intro";

function HomePage() {
   const [name, setName] = useState(localStorage.getItem("name") || "");
   const navigate = useNavigate();

   const handleSaveName = () => {
      if (!name.trim()) return;
      localStorage.setItem("name", name.trim());
      navigate("/begin");
   };

   return (
      <Intro>
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
               <button className="main__button" type="submit" aria-label="Сохранить имя" disabled={!name.trim()}>
                  <Check />
               </button>
            </form>
         </main>
      </Intro>
   );
}

export { HomePage };
