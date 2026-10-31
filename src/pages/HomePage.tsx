import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSession, freshSession } from "../model";
import { Intro } from "../components/Intro";
import { Input } from "../components/Input";

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
            <Input value={name} onChange={setName} onClick={handleSaveName} />
         </main>
      </Intro>
   );
}

export { HomePage };
