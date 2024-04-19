import { useState } from "react"
import { curses } from "../../api/db"
import CardHome from "../../components/CardHome/CardHome"
import SearchBar from "../../components/SearchBar/SearchBar"


const Categorys = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteresCourses = curses.filter((curse) => {
    return curse.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <section className="container mx-auto mt-5">
        <section className="w-2/4 mx-auto">
          <h2 className="text-4xl mb-5 font-bold text-center">Listado de temas</h2>
          <SearchBar onSearch={ handleSearch } />
        </section>

        <section>

          <div className="grid grid-cols-3">
            { 
              filteresCourses.length === 0 && searchTerm.length !== 0 ? (

                <div className="text-center col-span-4 mt-10">
                  <h2 className="text-2xl font-bold">No hay resultados...</h2>
                </div>

              ) : (
                filteresCourses.map((curse, i) => (
                  <div key={i} className="mx-auto my-10">
                    <CardHome
                      title={curse.courseName}
                      category={curse.category}
                      description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                      sections={curse.courseContent}
                    />
                  </div>
                ))
              )
            }
          </div>
        </section> 
      </section>
    </>
  )
}

export default Categorys
