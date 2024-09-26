import { useEffect, useState } from 'react';
import Loading from './Loading'; 

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); 

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Department')
      .then(response => response.json())
      .then(data => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchKeyword.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="h-[700px]">
      <h1 className="text-2xl font-bold mb-4">Departamentos de Colombia</h1>
      <input
        type="text"
        placeholder="Buscar departamento..."
        value={searchKeyword}
        onChange={handleSearch}
        className="p-2 border rounded mb-4"
      />

      {loading ? (
        <Loading />
      ) : (
        <section className="flex h-full overflow-y-auto flex-col sm:flex-row">
          <ul className="bg-white p-4 rounded shadow h-3/4 overflow-y-auto sm:w-1/2">
            {filteredDepartments.map(department => (
              <li 
                key={department.id} 
                className="p-2 border-b cursor-pointer" 
                onClick={() => handleSelectDepartment(department)} 
              >
                {department.name}
              </li>
            ))}
          </ul>
          <div className="sm:ml-4 w-full sm:w-1/2 h-3/4 ">
            {selectedDepartment && (
              <div className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-xl font-bold">{selectedDepartment.name}</h2>
                <p>{selectedDepartment.description}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default DepartmentList;