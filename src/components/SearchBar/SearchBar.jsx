import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ onSearch }) => {
  
  return (
    <>
       <form>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative mx-auto">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={ faMagnifyingGlass } />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50 focus:border-black"
              placeholder="Buscar Proyectos..."
              required
              onChange={(e) => onSearch(e.target.value)}
            />
        </div>
      </form>
    </>
  )
}

export default SearchBar
