import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Registro(){
    const [nombre,setNombre] = useState("");
    const [correo,setCorreo] = useState("");
    const [contraseña,setContraseña] = useState("");
    const [confirmar,setConfirmar] = useState("");

    const Registrar = (nuevoRegistro) => {
        nuevoRegistro.preventDefault();
        if (contraseña !== confirmar) {
            alert('Contraseña incorrecta');
            return;
        }
        //Aca se ingresa un usuario a la base de datos
        console.log('Nuevo usuario: ', nombre, correo);
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