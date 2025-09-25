import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';
import ChatbotButton from './ChatbotButton';

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [habitantes, setHabitantes] = useState(1);
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [esAdministrador, setEsAdministrador] = useState(false);
  const [codigoEmpleado, setCodigoEmpleado] = useState('');

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{8}$/;
    const idRegex = /^\d{9}$/;
    const passwordRegex = /^[A-Za-z]{6}\d{4}\.$/;
    const codigoEmpleadoRegex = /^[A-Za-z]{4}\d{2}$/;

    if (!nombre || !correo || !telefono || !identificacion || !apartamento || !contraseña || !confirmar || !habitantes) {
      alert('Todos los campos son obligatorios');
      return false;
    }

    if (!emailRegex.test(correo)) {
      alert('Correo no tiene un formato válido');
      return false;
    }

    if (!telefonoRegex.test(telefono)) {
      alert('El número de teléfono debe tener exactamente 8 dígitos');
      return false;
    }

    if (!idRegex.test(identificacion)) {
      alert('La identificación debe tener exactamente 9 dígitos');
      return false;
    }

    if (!passwordRegex.test(contraseña)) {
      alert('La contraseña debe tener 6 letras, 4 números y un punto (ej: abcdef1234.)');
      return false;
    }

    if (contraseña !== confirmar) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    if (esAdministrador && !codigoEmpleadoRegex.test(codigoEmpleado)) {
      alert('El código de empleado debe tener 4 letras y 2 números (ej: ABCD12)');
      return false;
    }

    return true;
  };

  const Registrar = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const respuesta = await fetch(`${API_BASE_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          identificacion,
          contraseña,
          apartamento,
          habitantes,
          esAdministrador,
          codigoEmpleado: esAdministrador ? codigoEmpleado : undefined,
        }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert(data.mensaje);
        navigate('/');
      } else {
        alert('Error: ' + data.mensaje);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <>
      <div className='contenedor-login'>
        <div className='caja-login'>
          <h1>Registro</h1>
          <form onSubmit={Registrar}>
            <div className='grupo-input'>
              <label>Nombre Completo</label>
              <input
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Correo Electrónico</label>
              <input
                type='email'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Teléfono</label>
              <input
                type='tel'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Identificación</label>
              <input
                type='text'
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Apartamento / Unidad Habitacional</label>
              <input
                type='text'
                value={apartamento}
                onChange={(e) => setApartamento(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Cantidad de Habitantes</label>
              <input
                type='number'
                value={habitantes}
                min={1}
                onChange={(e) => setHabitantes(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Contraseña</label>
              <input
                type='password'
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>Confirmar Contraseña</label>
              <input
                type='password'
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>

            <div className='grupo-input'>
              <label>
                <input
                  type='checkbox'
                  checked={esAdministrador}
                  onChange={(e) => setEsAdministrador(e.target.checked)}
                />
                ¿Es Administrador?
              </label>
            </div>

            {esAdministrador && (
              <div className='grupo-input'>
                <label>Código de Empleado</label>
                <input
                  type='text'
                  value={codigoEmpleado}
                  onChange={(e) => setCodigoEmpleado(e.target.value)}
                  required={esAdministrador}
                />
              </div>
            )}

            <button type='submit' className='boton-login'>
              Registrarme
            </button>
          </form>

          <p className='texto-registro'>
            Ya tienes una cuenta? <Link to='/'>Iniciar Sesión</Link>
          </p>
        </div>

        <ChatbotButton />
      </div>
    </>
  );
}
