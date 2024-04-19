import image from '../../assets/image-1.jpg'
import ModalCategory from '../Modal/ModalCategory'

const CardHome = ({ title, category, description, sections }) => {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        
        <img className="rounded-t-lg" src={ image } alt="" />
        
        <div className="px-5 pb-5 pt-3">

          <h3 className="text-2xl font-medium tracking-tight text-gray-900">{ title }</h3>
          <p className='text-sm text-slate-400'>{ category }</p>
          <p className="my-4 text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          
          <ModalCategory
            title={ title }
            category={ category }
            description={ description }
            img={ image }
            sections={ sections }
          />

        </div>
      </div> 
    </>
  )
}

export default CardHome
