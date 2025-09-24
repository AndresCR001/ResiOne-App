import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App.jsx';
import Registro from './Registro.jsx';
import './App.jsx';
import Comunicados from './Comunicados.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/registro' element={<Registro />} />
      <Route path='/comunicados' element={<Comunicados />} />
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);
