import { useState } from 'react'
import { Link } from 'react-router-dom';

import './App.css'

function App() {
  //Credenciales para inicio de sesion
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  //Aca se da el manejo del evento inicio de seion
  const InicioSesion = (iniciar) => {
    iniciar.preventDefault();
    console.log("Intentando iniciar sesion con: ", correo,contraseña);
    // Aca debe estar la logica de autenticacion
  };

  return (
    <>
      <div className='contenedor-login'>

        <div className='caja-login'>
          <h1>Inicio de Sesion </h1>
          <form onSubmit={InicioSesion}>

            <div className='grupo-input'>
              <label htmlFor='correo'>Correo Electronico</label>
              <input
                type='email'
                id='correo'
                placeholder='usuario@ejemplo.com'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label htmlFor='contraseña'>Contraseña</label>
              <input
                type='password'
                id='contraseña'
                placeholder='***********'
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            <button type='submit' className='boton-login'>Ingresar</button>

          </form>

          <p className='texto-registro'>
            No tienes cuenta? <Link to='/registro'>Crear una cuenta</Link>
          </p>

        </div>
      </div>
    </>
  )

}

export default App
