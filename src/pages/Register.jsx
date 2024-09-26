import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message === 'Anonymous sign-ins are disabled') {
        setError("complete el formulario de registro");
      } else {
        setError(error.message);
      }
    } else {
      setSuccess(true);
    }
  };

  const handleLogin = () => {
    navigate('/'); 
  };

  return (
    <main className='flex flex-col items-center justify-center h-screen dark:bg-gray-900'>
      <section className='flex flex-col items-center justify-around w-[350px] h-80 bg-gray-200 rounded-lg py-2 pb-0 px-5 shadow-2xl sm:w-[400px] sm:py-6'>
        <h1 className='text-3xl font-extrabold text-pretty text-center text-gray-700'>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success ? (
          <div className='flex flex-col items-center justify-center'>
            <p>Registro exitoso, revisa tu correo para confirmar tu cuenta.</p>
            <button 
              onClick={handleLogin} 
              className='mt-4 px-8 py-2 rounded-lg bg-pretty text-white bg-purple-900 uppercase font-semibold'
            >
              Volver al Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='flex-1 flex flex-col items-center justify-evenly w-full'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex w-full rounded-lg px-5 py-4'
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='flex w-full rounded-lg px-5 py-4'
            />
            <button type="submit" className='flex px-8 py-2 rounded-lg bg-pretty text-white bg-purple-900 uppercase font-semibold'>Register</button>
            <button onClick={handleLogin} className='flex w-full items-start justify-end text-cyan-600'>
              loguearse ahora
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Register;
