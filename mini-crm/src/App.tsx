import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ClientsList from "./pages/ClientsList";
import ClientDetail from "./pages/ClientDetail";
import ClientNew from "./pages/ClientNew";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="clients">
            <Route index element={<ClientsList />} />
            <Route path="new" element={<ClientNew />} />
            <Route path=":id" element={<ClientDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
