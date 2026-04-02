import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./api/layout/AppLayout";
import HomePage from "./api/pages/HomePage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<HomePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;