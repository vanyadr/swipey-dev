// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: получить фильм и размер из props, добавить тип Movie.
function Poster(_props: { movie?: unknown; small?: boolean }) {
   return (
      <div
         className={
            "poster" /* TODO: добавить poster--<id фильма> и poster--small для маленького постера */
         }
         style={{ backgroundImage: "" /* TODO: url постера, если он есть */ }}
      >
         {/* TODO: показывать этот блок, только если у фильма нет постера. */}
         <div className="poster__fallback">
            <span className="poster__shape">✦</span>
            <strong>{/* TODO: название фильма */}</strong>
            <small>
               {/* TODO: год */} · {/* TODO: жанр */}
            </small>
         </div>
      </div>
   );
}

export { Poster };
