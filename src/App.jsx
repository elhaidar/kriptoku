import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { CryptoProvider } from "./components/context/Context";
import NotFound from "./pages/404";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <CryptoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CryptoProvider>
    </Provider>
  );
}

export default App;
