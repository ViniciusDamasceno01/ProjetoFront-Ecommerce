import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './UserList.css';


<Link to="/usuarios/novo">
  <button>Novo Usuário</button>
</Link>

function UserList({ refreshKey }) {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarUsuarios = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/users");
        setUsuarios(response.data);
      } catch (error) {
        toast.error("Erro ao carregar usuários: " + (error.response?.data?.message || error.message));
        console.error("Detalhes do erro:", error);
      } finally {
        setIsLoading(false);
      }
    };
    buscarUsuarios();
  }, [refreshKey]); // Atualiza quando refreshKey mudar (vindo do App.js)

  return (
    <div className="user-list">
      <h2>Lista de Usuários</h2>
      {isLoading ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nome} - {usuario.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;