import { useEffect, useState } from 'react';
import Loading from './Loading'; 

const AttractionList = () => {
  const [attraction, setAttraction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/TouristicAttraction')
      .then(response => response.json())
      .then(data => {
        setAttraction(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

  const handleSelectAttraction = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  // Filtra los departamentos basados en la palabra clave
  const filteredattraction = attraction.filter(attraction => 
    attraction.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Atracciones de Colombia</h1>
      <input
        type="text"
        placeholder="Buscar atracción..."
        value={searchKeyword}
        onChange={handleSearch}
        className="p-2 border rounded mb-4"
      />

      {loading ? (
        <Loading />
      ) : (
        <section className="flex h-full overflow-y-auto">
          <ul className="bg-white p-4 rounded shadow h-3/4 overflow-y-auto w-1/2">
            {filteredattraction.map(attraction => (
              <li 
                key={attraction.id} 
                className="p-2 border-b cursor-pointer" 
                onClick={() => handleSelectAttraction(attraction)} 
              >
                {attraction.name}
              </li>
            ))}
          </ul>
          <div className="ml-4 w-1/2">
            {selectedAttraction && (
              <div className="flex flex-col p-4 bg-gray-100 rounded shadow gap-4">
                <h2 className="flex text-xl font-bold">{selectedAttraction.name}</h2>
                <p className='flex'>{selectedAttraction.description ? selectedAttraction.description : "No hay información disponible"}</p>
                
                {selectedAttraction.images && selectedAttraction.images.length > 0 ? (
                  <img 
                    src={selectedAttraction.images[0]}
                    alt={selectedAttraction.name} 
                    className="w-80 h-auto max-h-72 rounded-3xl flex self-center" 
                  />
                ) : (
                  <p>No hay imágenes disponibles</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default AttractionList;