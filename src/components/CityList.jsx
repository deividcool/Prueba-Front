import { useEffect, useState } from 'react';
import Loading from './Loading'; 

const CityList = () => {
  const [city, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedcity, setSelectedCity] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/City')
      .then(response => response.json())
      .then(data => {
        setCities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredcity = city.filter(city => 
    city.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Ciudades de Colombia</h1>
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={searchKeyword}
        onChange={handleSearch}
        className="p-2 border rounded mb-4"
      />

      {loading ? (
        <Loading />
      ) : (
        <section className="flex h-full overflow-y-auto">
          <ul className="bg-white p-4 rounded shadow h-3/4 overflow-y-auto w-1/2">
            {filteredcity.map(city => (
              <li 
                key={city.id} 
                className="p-2 border-b cursor-pointer" 
                onClick={() => handleSelectCity(city)} 
              >
                {city.name}
              </li>
            ))}
          </ul>
          <div className="ml-4 w-1/2">
            {selectedcity && (
              <div className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-xl font-bold">{selectedcity.name}</h2>
                <p>{selectedcity.description ? selectedcity.description : "No hay información disponible"}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default CityList;