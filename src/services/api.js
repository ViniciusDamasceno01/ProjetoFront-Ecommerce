// src/services/api.js
import axios from 'axios';

// Configuração global do Axios para seu backend Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080', // Confirme se esta é a porta do seu backend
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers globais se necessário (ex: Auth)
  }
});

// Interceptador para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    
    // Tratamento personalizado por status code
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Não autorizado - redirecionar para login');
          break;
        case 404:
          console.error('Endpoint não encontrado');
          break;
        case 500:
          console.error('Erro interno do servidor');
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;