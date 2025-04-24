import { useState } from 'react';
import {
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow">
      <div className="container mx-auto">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl text-indigo-600">Talenta</span>
            </div>
            {/* <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </div>
            </div> */}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="md:hidden">
              <button
                type="button"
                className="bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={isMobileMenuOpen ? "md:hidden" : "hidden md:hidden"} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</a>
        </div>
        {/* <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Your Name</div>
              <div className="text-sm font-medium text-gray-500">youremail@example.com</div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="mobile-search"
                id="mobile-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Search..."
              />
            </div>
            <a href="#" className="block bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium">Sign In</a>
          </div>
        </div> */}
      </div>
    </header>
  );
}