import { useEffect, useState } from "react";
import Loading from "./Loading";

const RadioList = () => {
  const [radio, setRadios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedradio, setSelectedradio] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Radio")
      .then((response) => response.json())
      .then((data) => {
        setRadios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSelectradio = (radio) => {
    setSelectedradio(radio);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredradio = radio
    .filter((radio) =>
      radio.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Radios en Colombia</h1>
      <input
        type="text"
        placeholder="Buscar Emisora..."
        value={searchKeyword}
        onChange={handleSearch}
        className="p-2 border rounded mb-4"
      />

      {loading ? (
        <Loading />
      ) : (
        <section className="flex h-full overflow-y-auto">
          <ul className="bg-white p-4 rounded shadow h-3/4 overflow-y-auto w-1/2">
            {filteredradio.map((radio) => (
              <li
                key={radio.id}
                className="p-2 border-b cursor-pointer"
                onClick={() => handleSelectradio(radio)}
              >
                {radio.name}
              </li>
            ))}
          </ul>
          <div className="ml-4 w-1/2">
            {selectedradio && (
              <div className="flex flex-col p-4 bg-gray-100 rounded shadow gap-4">
                <h2 className="flex text-xl font-bold">{selectedradio.name}</h2>
                <p className="flex">
                  {" "}
                  <strong className="mr-2">Frecuencia:</strong>{" "}
                  {selectedradio.frequency
                    ? selectedradio.frequency
                    : "No hay información disponible"}{" "}
                  FM
                </p>
                <p className="flex">
                  {" "}
                  <strong className="mr-2">Ciudad de Emision:</strong>{" "}
                  {selectedradio.city.name
                    ? selectedradio.city.name
                    : "No hay información disponible"}
                </p>
                <p className="flex">
                  {" "}
                  {selectedradio.city.description
                    ? selectedradio.city.description
                    : "No hay información disponible"}
                </p>
                {selectedradio.url != "" ? (
                  <a
                    href={
                      selectedradio.url
                        ? selectedradio.url
                        : "No hay información disponible"
                    }
                    target="_blank"
                    className="flex w-full items-start justify-end text-cyan-600"
                  >
                    Ver en el sitio web
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default RadioList;
