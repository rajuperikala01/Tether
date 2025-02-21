import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateAccPage from "./pages/CreateAccPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="/signup" element={<CreateAccPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
