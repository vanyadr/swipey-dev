import { Check } from "lucide-react";

function Input({
   value,
   onChange,
   onClick,
}: {
   value: string;
   onChange: (newValue: string) => void;
   onClick: () => void;
}) {
   return (
      <div className="main__name">
         <input
            className="main__input"
            type="text"
            placeholder="Введите имя"
            value={value}
            onChange={(e) => onChange(e.target.value)}
         />
         <button className="main__button" onClick={onClick}>
            <Check />
         </button>
      </div>
   );
}

export { Input };
