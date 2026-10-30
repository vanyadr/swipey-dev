# Swipey — шпаргалка по приложению

Схема соответствует `main`, коммит `81e789a`.
Диаграммы Mermaid отображаются прямо на GitHub.

## Страницы и сценарий игры

Синие блоки — одна и та же `GamePage` для разных игроков.

```mermaid
flowchart TD
    home["HomePage · /<br/>Ввод имени<br/>Сохранение имени и новой сессии"]
    game1["GamePage · /game<br/>Первый игрок · role = 1<br/>Свайпы, лайки, дизлайки<br/>Отмена последнего голоса"]
    share["SharePage · /share<br/>Создание приглашения<br/>QR-код и копирование ссылки"]
    join["JoinPage · /join#s=…<br/>Чтение приглашения<br/>Ввод имени второго игрока<br/>Создание сессии с данными первого"]
    game2["GamePage · /game<br/>Второй игрок · role = 2<br/>Оценка тех же фильмов<br/>в новом случайном порядке"]
    result["ResultPage · /result<br/>Общие лайки<br/>Личные результаты каждого игрока<br/>Переключение вкладок"]
    home -->|"Сохранить имя"| game1
    game1 -->|"Все фильмы оценены — автоматически"| share
    share -->|"QR, ссылка или тот же телефон"| join
    join -->|"Присоединиться"| game2
    game2 -->|"Все фильмы оценены — автоматически"| result
    result -->|"Начать снова: очистить сессию"| home
    classDef game fill:#dceeff,stroke:#5795cc
    classDef page fill:#e5f3e6,stroke:#73a66e
    class game1,game2 game
    class home,share,join,result page
```

## Какие компоненты используют страницы

Стрелка означает «рендерит компонент». `Intro` выводит `children` внутри общей обёртки.

```mermaid
flowchart LR
    app["main.tsx → App → AppRouter"]
    home["HomePage"]
    share["SharePage"]
    join["JoinPage"]
    game["GamePage"]
    result["ResultPage"]
    intro["Intro<br/>Общая обёртка и подпись"]
    gradient["GradientBackground<br/>Градиентный фон"]
    header["Header<br/>Имя из localStorage<br/>и иконка профиля"]
    swipe["SwipeCard<br/>Перетаскивание и анимация<br/>Вызывает onChoice"]
    poster["Poster<br/>Изображение фильма<br/>или заглушка с названием"]
    qr["QRCodeSVG<br/>QR-код · библиотека"]
    app --> home & share & join & game & result
    home --> intro
    share --> intro
    join --> intro
    intro --> gradient
    share --> qr
    game --> header
    game -->|"movie, onChoice, disabled"| swipe
    swipe -->|"movie"| poster
    result --> header
    result -->|"movie, small"| poster
    result -.->|"Экран «Пока нет результатов»"| intro
    classDef component fill:#e5f3e6,stroke:#73a66e
    class intro,gradient,header,swipe,poster component
```

## Проверки при открытии страниц

Ромбы — условия. Красные блоки — сообщения на текущей странице; оранжевые — автоматические перенаправления.

```mermaid
flowchart TD
    subgraph gameChecks["GamePage · /game"]
        gSession{"Есть сессия?"}
        gComplete{"Все фильмы оценены?"}
        gRole{"Первый игрок?"}
        gHome["Переход на /"]
        gPlay["Показать текущий фильм"]
        gShare["Переход на /share"]
        gResult["Переход на /result"]
        gSession -->|"Нет"| gHome
        gSession -->|"Да"| gComplete
        gComplete -->|"Нет"| gPlay
        gComplete -->|"Да"| gRole
        gRole -->|"Да · role = 1"| gShare
        gRole -->|"Нет · role = 2"| gResult
    end
    subgraph shareChecks["SharePage · /share"]
        sValid{"Есть сессия первого игрока<br/>и все фильмы оценены?"}
        sHome["Переход на /"]
        sShow["Показать приглашение"]
        sValid -->|"Нет"| sHome
        sValid -->|"Да"| sShow
    end
    subgraph joinChecks["JoinPage · /join"]
        jValid{"Приглашение из hash<br/>удалось прочитать?"}
        jError["«Приглашение не найдено»<br/>Остаёмся на странице"]
        jForm["Показать форму имени"]
        jValid -->|"Нет"| jError
        jValid -->|"Да"| jForm
    end
    subgraph resultChecks["ResultPage · /result"]
        rValid{"Есть сессия, role = 2,<br/>данные first и все голоса?"}
        rError["«Пока нет результатов»<br/>Кнопка «На главную» → /"]
        rShow["Показать результаты"]
        rValid -->|"Нет"| rError
        rValid -->|"Да"| rShow
    end
    classDef redirect fill:#fff0d6,stroke:#d5a04c
    classDef error fill:#ffe5df,stroke:#cf8270
    classDef success fill:#e5f3e6,stroke:#73a66e
    class gHome,gShare,gResult,sHome redirect
    class jError,rError error
    class gPlay,sShow,jForm,rShow success
```

Дополнительные условия внутри страниц:

| Где | Условие → поведение |
|---|---|
| `HomePage` | Проверок при входе нет. Пустое имя тоже позволяет начать игру. |
| `GamePage` | Нет голосов → «Отменить» недоступно. Не все фильмы оценены → «Завершить» недоступно. |
| `JoinPage` | Пустое имя после `trim()` → нельзя присоединиться. Поле ограничено 40 символами. |
| `ResultPage` | Список выбранной вкладки пуст → сообщение вместо постеров. |
| `Poster` | Нет изображения → заглушка с названием, годом и жанром. |

## Как связаны данные

```mermaid
flowchart LR
    movies["data.json<br/>Каталог фильмов"]
    model["model.ts<br/>Типы и функции"]
    storage[("localStorage<br/>name — имя<br/>swipey:session:v1 — сессия")]
    state["Состояние GamePage<br/>Текущая сессия"]
    card["SwipeCard"]
    invitation["Приглашение в ссылке<br/>Имя и лайки первого игрока"]
    second["Сессия второго игрока<br/>first — данные первого<br/>votes — собственные оценки"]
    common["matches<br/>Общие ID понравившихся фильмов"]
    movies --> model
    model -->|"readSession"| state
    storage -->|"Загрузка"| state
    state -->|"Текущий фильм"| card
    card -->|"onChoice: лайк / дизлайк"| state
    state -->|"saveSession"| storage
    storage -->|"SharePage"| invitation
    invitation -->|"JoinPage"| second
    second -->|"first.likes + собственные лайки"| common
```

`useState` хранит данные для отображения интерфейса, а `localStorage` сохраняет их между перезагрузками. Первый игрок передаёт свои результаты второму через ссылку — серверной синхронизации нет.

Стили приложения находятся в `src/App.css`, сброс стилей — в `src/index.css`.
