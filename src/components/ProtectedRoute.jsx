import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error obteniendo la sesión:', error);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div><h2 className='text-center text-white text-5xl'>Loading...</h2></div>;
  }

  if (!session) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;