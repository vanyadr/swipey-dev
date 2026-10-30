import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { BeginPage } from "../pages/BeginPage";
import { QrPage } from "../pages/QrPage";
import { GamePage } from "../pages/GamePage";
import { ResultPage } from "../pages/ResultPage";
import { SharePage } from "../pages/SharePage";
import { JoinPage } from "../pages/JoinPage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/begin",
      element: <BeginPage />,
   },
   {
      path: "/qr",
      element: <QrPage />,
   },
   {
      path: "/game",
      element: <GamePage />,
   },
   {
      path: "/result",
      element: <ResultPage />,
   },
   {
       path: "/share",
       element: <SharePage />
   },
   {
       path: "/join",
       element: <JoinPage />
   },
]);

function AppRouter() {
   return <RouterProvider router={router} />;
}

export { AppRouter };
