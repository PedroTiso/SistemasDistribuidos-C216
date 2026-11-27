import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCallPage from "./pages/CreateCallPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelcomePage />} path="/" />
        <Route element={<CreateCallPage />} path="/chamados/novo" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
