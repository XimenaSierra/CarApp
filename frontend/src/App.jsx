import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "./context/CarContext";
import CarsPage from "./pages/CarsPage";

const App = () => {
  return (
    <BrowserRouter>
      <CarProvider>
        <Routes>
          <Route path="/" element={<CarsPage />} />
        </Routes>
      </CarProvider>
    </BrowserRouter>
  );
};

export default App;