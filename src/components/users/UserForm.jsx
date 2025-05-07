import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './UserForm.css';


function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (name.length < 3) {
      toast.warning("Nome deve ter pelo menos 3 caracteres");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning("Digite um e-mail válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await api.post("/users", { name, email });
      toast.success("Usuário cadastrado com sucesso!");
      setName("");
      setEmail("");
      e.target.reset(); // Limpa validações do HTML
      if (onUserAdded) onUserAdded(); // Atualiza lista externa
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        "Erro ao cadastrar. Tente novamente."
      );
      console.error("Erro detalhado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome completo (mín. 3 caracteres)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          minLength={3}
        />
        <input
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default UserForm;