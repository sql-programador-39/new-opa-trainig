
import { useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ModalCategory = ({ title, category, description, img, sections }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type='button' className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none' onClick={showModal}>
        <span className='mr-3'>Listado de cursos</span><FontAwesomeIcon icon={ faArrowRight } />
      </button>

      <Modal 
        title={ title } 
        open={isModalOpen} 
        onCancel={handleCancel}
        centered
        width={"35%"}
        footer={[
          <button type='button' className='mt-5 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none' key="back" onClick={handleCancel}>
            Salir
          </button>
        ]}
      >
        <div className='mt-3 w-11/12 mx-auto'>
          <img src={ img } alt="" className='w-full h-72 object-cover rounded-xl' />
        </div>

        <div className="mt-2 w-11/12 mx-auto">
          <p className="text-lg font-medium">Descripción del tema: </p>
          <p className="text-lg text-gray-500">
            { description }
          </p>
        </div>

        <div>
          <ul className="mt-4 overflow-y-scroll h-72">
            {
              sections.map((section, i) => (
                <li key={i} className="mt-2 w-11/12 mx-auto">
                  <Link to={ `category/${category}/${section.sectionName}` } className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-gray-100">                           
                    <div className="block">
                        <div className="w-full text-lg font-semibold">{ section.sectionName }</div>
                    </div>
                    <FontAwesomeIcon icon={ faArrowRight } />
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

      </Modal>
    </>
  );
}

export default ModalCategory
