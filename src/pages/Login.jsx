import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Importar el cliente de Supabase

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      if (error.message == 'missing email or phone') {
        setError("complete el formulario de login");
      }if (error.message == 'Invalid login credentials') {
        setError("verifique que el email y el password sean correctos");
      }else{
        setError(error.message);
      }
    } else {
      navigate('/dashboard/country-info');
    }
  };

  return (
    <main className='flex flex-col items-center justify-center h-screen dark:bg-gray-900'>
       <section className='flex flex-col items-center justify-around w-[350px] h-80 bg-gray-200 rounded-lg py-2 px-5 shadow-2xl sm:w-[450px] sm:py-4'>
            <h1 className='sm:text-3xl text-2xl font-extrabold text-pretty text-center text-gray-700'>LOGIN ADO TECNOLOGIES PRUEBA TECNICA </h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit" className='flex px-8 py-2 rounded-lg bg-pretty text-white bg-purple-900 uppercase font-semibold'>Login</button>
            </form>
            <a href="/register" className='flex w-full items-start justify-end text-cyan-600'>registrese ahora</a>
        </section>
    </main>
  );
}

export default Login;