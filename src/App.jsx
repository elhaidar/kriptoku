import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { CryptoProvider } from "./components/context/Context";
import NotFound from "./pages/404";

function App() {
  return (
    <CryptoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CryptoProvider>
  );
}

export default App;
