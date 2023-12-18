import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import logoOMS from '../../static/images/logo/header__logophone.png';
import { TERipple } from 'tw-elements-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [navigation, setNavigation] = useState([
    { name: 'Home', to: '/', current: true },
    { name: 'Product', to: '/products', current: false },
    { name: 'About', to: '/about', current: false },
    { name: 'Blog', to: '/blog', current: false },
    { name: 'My order', to: '/my-order', current: false },
  ]);
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;

  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
  setNavigation((prevNavigation) =>
    prevNavigation.map((item) => ({
      ...item,
      current: item.to === location.pathname,
    }))
  );

  setShowUserMenu(!!user);
}, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl shadow-md hover:text-yellow-500 transition-colors duration-200 cursor-pointer hidden sm:flex">
                    Online Mobile Store
                  </h3>
                  <img className="h-8 w-auto" src={logoOMS} alt="Your Company" />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                  
                  {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          item.current && 'bg-gray-900 text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="md:w-96 mx-auto ">
                      <div className="relative flex w-full flex-wrap items-stretch">
                        <input
                          type="search"
                          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon3"
                        />
                        <TERipple>
                          <button
                            className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-green-400  hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            type="button"
                            id="button-addon3"
                          >
                            Search
                          </button>
                        </TERipple>
                      </div>
                    </div>        
                  </div>
                  
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
             

                <Link to={`/cart/${userId}`}
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingBasketIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                {/* Profile dropdown */}
                <div className="flex items-center">
                  {showUserMenu ? (
                    // User is logged in, show user menu
                    <div className="flex items-center">
                      <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Your Profile
                      </Link>
                      <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Settings
                      </Link>
                      <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Sign out
                      </button>
                    </div>
                  ) : (
                    // User is not logged in, show login, register, and forgot password links
                    <div className="flex">
                      <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Login
                      </Link>
                      <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Register
                      </Link>
                      <Link to="/forgot-password" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Forgot Password
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="md:w-96 mx-auto ">
                      <div className="relative flex w-full flex-wrap items-stretch">
                        <input
                          type="search"
                          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon3"
                        />
                        <TERipple>
                          <button
                            className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-green-400 hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            type="button"
                            id="button-addon3"
                          >
                            Search
                          </button>
                        </TERipple>
                      </div>
                    </div>  
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
