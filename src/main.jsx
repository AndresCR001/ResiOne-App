import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App.jsx';
import Registro from './Registro.jsx';
import './App.jsx';
import Comunicados from './Comunicados.jsx';
import Reservas from './Reservas.jsx';
import Reportes from './Reportes.jsx';
import Chatbot from './chatbot.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/registro' element={<Registro />} />
      <Route path='/comunicados' element={<Comunicados />} />
      <Route path='/reservas' element={<Reservas />} />
      <Route path='/reportes' element={<Reportes />} />
      <Route path='/chatbot' element={<Chatbot />} />
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);
