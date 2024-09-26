import { useEffect, useState } from 'react';
import Loading from './Loading';

const CountryInfo = () => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Country/Colombia')
      .then(response => response.json())
      .then(data => setCountry(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">Información General de Colombia</h1>
      {country ? (
        <section className="flex flex-row bg-white p-4 rounded shadow">
          <div className='flex flex-1 flex-col gap-4 text-pretty px-5'>
            <p><strong>Nombre:</strong> {country.name}</p>
            <p><strong>Capital:</strong> {country.description}</p>
            <p><strong>Área:</strong> {country.area} km²</p>
            <p><strong>Población:</strong> {country.population}</p>
            <p><strong>Capital:</strong> {country.stateCapital}</p>
          </div>
          <div className='flex flex-1'>
            <img src="/src/assets/colombiaimage.webp" alt="Colombia" className="w-full h-auto rounded-3xl" />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </article>
  );
};

export default CountryInfo;