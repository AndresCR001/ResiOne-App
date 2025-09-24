import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';

import './App.css'

function App() {
  const navigate = useNavigate();
  //Credenciales para inicio de sesion
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

// Manejo del evento inicio de sesion
const InicioSesion = async (e) => {
  e.preventDefault();
  try {
    console.log("Voy a mandar:", { correo, contraseña });

    const respuesta = await fetch("http://localhost:5050/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await respuesta.json();
    console.log(data)
    if (respuesta.ok) {
      alert(data.mensaje + " 👋 Bienvenido " + data.usuario);
      localStorage.setItem("usuario", data.usuario);
      navigate("/comunicados");

    } else {
      alert("Error: " + data.mensaje);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("No se pudo conectar con el servidor");
    
  }

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
