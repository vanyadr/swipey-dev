import { UserRound } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: получить имя из props.
function Header(_props: { name?: string }) {
   return (
      <header className="header">
         <span className="logo">Swipey</span>
         <div className="profile">
            <span title={"" /* TODO: имя */}>{/* TODO: имя */}</span>
            <UserRound size={24} fill="currentColor" />
         </div>
      </header>
   );
}

export { Header };
