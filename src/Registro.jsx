import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Registro(){
    const [nombre,setNombre] = useState("");
    const [correo,setCorreo] = useState("");
    const [contraseña,setContraseña] = useState("");
    const [confirmar,setConfirmar] = useState("");

    const Registrar = async (e) => {
    e.preventDefault();

    // Validación simple
    if (contraseña !== confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }
/*
    try {
      // Petición al backend
      const respuesta = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contraseña }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert(data.mensaje); // "Usuario registrado"
        // Limpiar inputs después de registro exitoso
        setNombre("");
        setCorreo("");
        setContraseña("");
        setConfirmar("");
      } else {
        alert("Error: " + data.mensaje);
      }
    } catch (error) {
      console.error("Error al registrar:", error.mensaje);
      console.error(error);
      alert("No se pudo conectar con el servidor");
    } */
  };
  

    return(
    
    <>
      <div className='contenedor-login'>

        <div className='caja-login'>
          <h1>Registro </h1>
          <form onSubmit={Registrar}>

            <div className='grupo-input'>
              <label htmlFor='nombre'>Nombre Completo</label>
              <input
                type='text'
                id='nombre'
                placeholder='Nombre Completo'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

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

            <div className='grupo-input'>
              <label htmlFor='confirmar'>Confirmar</label>
              <input
                type='password'
                id='confirmar'
                placeholder='***********'
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>

            <button type='submit' className='boton-login'>Registrarme</button>

          </form>

          <p className='texto-registro'>
            Ya tienes una cuenta? <Link to='/'>Iniciar Sesion</Link>
          </p>

        </div>
      </div>
    </>
  );
}