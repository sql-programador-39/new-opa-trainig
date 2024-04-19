import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGears, faSackDollar, faX, faBars } from '@fortawesome/free-solid-svg-icons';

import user from '../../assets/user.png';
import LogoOpa from '../../assets/Logo-opa.png';


const Nav = () => {

  const [hamCollapsed, setHamCollapsed] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {

    const handleDropdownToggle = () => {

      if(dropdownRef.current.classList.contains('ant-dropdown-open')) {
        setHamCollapsed(true);
      } else {
        setHamCollapsed(false);
      }
    };

    document.addEventListener('click', handleDropdownToggle);

    return () => {
      document.removeEventListener('click', handleDropdownToggle);
    }

  }, [dropdownRef]);

  const items = [
    {
      label: <Link to="/config" className="flex justify-between items-center gap-4">
        <p>Configuración</p>
        <FontAwesomeIcon icon={ faGears } />
      </Link>,
      key: '0',
    },
    {
      label: <Link to="/recaudo" className="flex justify-between items-center gap-4">
        <p>Recaudo</p>
        <FontAwesomeIcon icon={ faSackDollar } />
      </Link>,
      key: '1',
    },
    {
      label: <Link to="/" className="flex justify-between items-center gap-4">
        <p>Perfil</p>
        <img src={ user } alt="" width={ "14px" } height={ "14px" } />
      </Link>,
      key: '2',
    },
    {
      label: <Link to="/" className="flex justify-between items-center gap-4">
        <p>Cerrar sesión</p>
        <FontAwesomeIcon icon={ faPowerOff } />   
      </Link>,
      key: '3',
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-5 md:px-10 h-16 shadow-md bg-white">
        <div className='flex items-center gap-5'>
          <img src={ LogoOpa } alt="Logo-opa" width={ "65px" } height={ "40px" } />
          <p className='text-2xl font-bold'>Opa Trainig</p>
        </div>

        <div className='border-l-2 pl-5 cursor-pointer'>
          <Dropdown
            menu={ { items } }
            trigger={ ['click'] }
          >
            <div ref={ dropdownRef }> 
              <Space>
                OPA S.A.S
                <div className='flex items-center'>
                  { hamCollapsed ? <FontAwesomeIcon className='w-7 h-6' icon={ faX } /> : <FontAwesomeIcon className='w-7 h-7' icon={ faBars } /> }
                </div>
              </Space>
            </div>
          </Dropdown>
        </div>
      </nav>
    </>
  )
}

export default Nav
