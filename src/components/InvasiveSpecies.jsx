import { useEffect, useState } from 'react';
import Loading from './Loading'; 

const InvasiveSpecies = () => {
  const [specie, setSpecie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedspecie, setSelectedspecie] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/InvasiveSpecie')
      .then(response => response.json())
      .then(data => {
        setSpecie(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

  const handleSelectspecie = (specie) => {
    setSelectedspecie(specie);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredspecie = specie.filter(specie => 
    specie.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Especies Invasoras en Colombia</h1>
      <input
        type="text"
        placeholder="Buscar specie..."
        value={searchKeyword}
        onChange={handleSearch}
        className="p-2 border rounded mb-4"
      />

      {loading ? (
        <Loading />
      ) : (
        <section className="flex h-full overflow-y-auto">
          <ul className="bg-white p-4 rounded shadow h-3/4 overflow-y-auto w-1/2">
            {filteredspecie.map(specie => (
              <li 
                key={specie.id} 
                className="p-2 border-b cursor-pointer" 
                onClick={() => handleSelectspecie(specie)} 
              >
                {specie.name}
              </li>
            ))}
          </ul>
          <div className="ml-4 w-1/2">
            {selectedspecie && (
              <div className="flex flex-col p-4 bg-gray-100 rounded shadow gap-4">
                <h2 className="flex text-xl font-bold">{selectedspecie.name}</h2>
                <p className='flex'> nombre cientifico {selectedspecie.scientificName ? selectedspecie.scientificName : "No hay información disponible"}</p>
                <p className='flex'> {selectedspecie.impact ? selectedspecie.impact : "No hay información disponible"}</p>
                <p className='flex'> {selectedspecie.manage ? selectedspecie.manage : "No hay información disponible"}</p>
                
                {selectedspecie.urlImage && selectedspecie.urlImage.length > 0 ? (
                  <img 
                    src={selectedspecie.urlImage}
                    alt={selectedspecie.name} 
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

export default InvasiveSpecies;