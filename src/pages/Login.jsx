// Librerías de React
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// Recursos
import Logo from '../assets/OIG.png'

// Librerías de terceros
import { useInView } from 'framer-motion'

// Componentes
import Alert from '../components/Alert'

// Configuración y utilidades
import axiosClient from '../config/axiosClient'

const initialForm = {
  email: '',
  password: ''
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth()
  const pageRef = useRef(null)
  const isInView = useInView(pageRef, { once: true })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosClient.post('/users/login', form)

      setAlert({
        msg: 'Usuario logeado correctamente',
        error: false
      })
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      console.log(error.response.data.msg)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId)

    if (passwordField.type === 'password') {
      passwordField.type = 'text'
    } else {
      passwordField.type = 'password'
    }
  }
  return (
    <div
      className='w-full min-h-screen grid grid-rows-[auto]  lg:grid-cols-2 bg-login-form bg-fixed bg-cover py-12 lg:py-0'
      ref={pageRef}
    >
      <section className='lg:flex  items-center justify-center'>
        <h1
          className='text-center font-black text-gray-50 uppercase space-y-2 text-3xl lg:text-4xl xl:text-5xl'
          style={{
            opacity: isInView ? 1 : 0,
            transition:
              'scale,opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
          }}
        >
          <span className='block'>Accede a la eficiencia</span>
          <span className='text-custom-cyan block text-5xl xl:text-7xl'>
            Tu proyecto
          </span>
          <span className='block'>nuestro impulso</span>
        </h1>
      </section>

      <section
        className='flex items-center'
        style={{
          transform: isInView ? 'scale-1' : 'scale-0',
          opacity: isInView ? 1 : 0,
          transition:
            'scale,opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
        }}
      >
        <div className='bg-white p-6 rounded-md mx-auto flex-1 max-w-md shadow-2xl'>
          <img
            className='mx-auto h-40 w-auto '
            src={Logo}
            alt='Your Company'
          />

          <h2 className='mt-3 text-center text-2xl  leading-9 tracking-tight text-primary-blue font-black'>
            Iniciar sesión en su cuenta
          </h2>

          <form
            className='space-y-6 mt-5'
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm leading-6 text-primary-blue font-bold'
              >
                Email
              </label>

              <input
                id='email'
                name='email'
                type='email'
                autoComplete='current-email'
                required
                className='mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                placeholder='Introduzca su email'
                onChange={(e) => handleChange(e)}
                value={form.email}
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm leading-6 text-primary-blue font-bold'
                >
                  Password
                </label>

                <div className='text-sm'>
                  <Link
                    to='forgot-password'
                    className='font-semibold text-custom-cyan hover:text-primary-blue'
                  >
                    ¿No puedes iniciar sesión?
                  </Link>
                </div>
              </div>

              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                  placeholder='Introduzca su contraseña'
                  onChange={(e) => handleChange(e)}
                  value={form.password}
                />

                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 cursor-pointer'
                >
                  {/* Icono de ojo para mostrar/ocultar la contraseña */}
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    ></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M2 12s3 9 10 9 10-9 10-9'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-primary-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-cyan hover:text-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200'
              >
                Acceder
              </button>
            </div>
          </form>

          {alert ? (
            <div className='mt-5'>
              <Alert alert={alert} />
            </div>
          ) : null}

          <p className='mt-5 text-center text-sm text-gray-500'>
            ¿No tienes una cuenta?{' '}
            <Link
              to='register'
              className='font-semibold leading-6 text-custom-cyan hover:text-primary-blue'
            >
              Crear una cuenta
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
