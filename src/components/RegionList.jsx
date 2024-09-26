import { useEffect, useState } from 'react';
import Loading from './Loading';

const RegionList = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null); // Estado para la región seleccionada

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Region')
      .then(response => response.json())
      .then((data) => {
        setRegions(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const handleRegionClick = (region) => {
    // Alterna la selección de la región o resetea si ya está seleccionada
    if (selectedRegion && selectedRegion.id === region.id) {
      setSelectedRegion(null);
    } else {
      setSelectedRegion(region);
    }
  };

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">Regiones de Colombia</h1>
      {loading ? (
        <Loading />
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {regions.map(region => (
            <li 
              key={region.id} 
              className="p-2 border-b cursor-pointer" 
              onClick={() => handleRegionClick(region)}
            >
              {region.name}
            </li>
          ))}
        </ul>
      )}
      
      {selectedRegion && ( 
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold">{selectedRegion.name}</h2>
          <p>{selectedRegion.description}</p>
        </div>
      )}
    </article>
  );
};

export default RegionList;