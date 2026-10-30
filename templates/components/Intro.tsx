import { type ReactNode } from "react";
import { GradientBackground } from "./GradientBackground";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: получить children из props.
function Intro(_props: { children?: ReactNode }) {
   return (
      <main className="intro">
         <GradientBackground />
         <div className="intro__content">{/* TODO: children */}</div>
         <footer>Выбери кино или сериал на вечер</footer>
      </main>
   );
}

export { Intro };
