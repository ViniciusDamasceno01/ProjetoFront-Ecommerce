// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Tela de listagem com botão para ir para a tela de cadastro */}
          <Route
            path="/usuarios"
            element={
              <UserList refreshKey={refreshKey} />
            }
          />

          {/* Tela exclusiva de cadastro de usuário */}
          <Route
            path="/usuarios/novo"
            element={
              <UserForm onUserAdded={() => setRefreshKey(k => k + 1)} />
            }
          />

          {/* Você pode adicionar mais rotas depois, como Home ou Login */}
        </Routes>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;