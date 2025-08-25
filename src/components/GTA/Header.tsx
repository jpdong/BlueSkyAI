'use client';
import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useCommonContext } from '~/context/common-context';
import { languages } from "~/i18n/config";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = ({ locale = 'en' }) => {
  const { data: session, status } = useSession();
  const {
    userData,
    setUserData,
    setShowLoginModal,
    setShowLogoutModal,
    authText
  } = useCommonContext();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    let _userData;
    
    if (!userData || Object.keys(userData).length === 0) {
      if (status === 'authenticated') {
        setUserData(session?.user);
        _userData = session?.user;
      }
    } else {
      _userData = userData;
    }

    if (_userData && Object.keys(_userData).length > 0) {
      // Already logged in
      setLoading(false);
    } else {
      setShowLoginModal(true);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xs border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-white">GTA AI</span>
          </a>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 border border-[rgba(255,255,255,0.5)] rounded-md px-3 py-2 text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)]">
                  <GlobeAltIcon className="w-5 h-5 text-white" />
                  {locale === 'default' ? 'EN' : locale.toUpperCase()}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-30 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                  <div className="py-1">
                    {languages.map((item) => (
                      <Menu.Item key={item.lang}>
                        <Link href={`/${item.lang}`} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#2d6ae0] hover:bg-gray-50">
                          {item.language}
                        </Link>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Login/User Button */}
            {process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN !== '0' && (
              <div className="relative">
                {userData?.email ? (
                  // Logged in - show user avatar
                  <button
                    onClick={handleLogout}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors"
                  >
                    <img
                      src={userData.image}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ) : (
                  // Not logged in - show login button
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-[rgba(255,255,255,0.5)] rounded-md text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)] hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </>
                    ) : (
                      authText?.loginText || 'Login'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;