'use client'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import NavItems from '../utils/NavItems'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt2, HiOutlineUserCircle } from 'react-icons/hi'
import { BiX } from 'react-icons/bi'
import CustomModal from '../utils/CustomModal'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Verification from './Auth/Verification'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import avatar from '../../public/assets/default-avatar.jpg'
import { signOut, useSession } from 'next-auth/react'
import {
  useLogOutQuery,
  useSocialAuthMutation
} from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { MdLogin } from 'react-icons/md'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import ForgotPassword from './Auth/ForgotPassword'
import VerificationResetPassword from './Auth/VerificationResetPassword'
import ResetPassword from './Auth/ResetPassword'
import Tooltip from '@mui/material/Tooltip'
import { Modal } from '@mui/material'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem: number
  route: string
  setRoute: (route: string) => void
}

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)
  // const { user } = useSelector((state: any) => state.auth)
  const {
    data: userData,
    isLoading,
    refetch
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data } = useSession()
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
  const [logout, setLogout] = useState(false)
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogout, setIsOpenLogout] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const logOutHandler = async () => {
    setLogout(true)
    // await signOut()

    toast.promise(signOut(), {
      loading: 'Loging Out...',
      success: <b>Logout Successfully!</b>,
      error: <b>There are something wrong.</b>
    })
  }

  useEffect(() => {
    if (!isLoading && !userData) {
      if (data && data.user) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image
        })
        if (isSuccess) toast.success('Login Successfully!')
        refetch()
      }
    }
    // if (data === null && !isLoading && !userData) setLogout(true)
  }, [data, userData, isLoading])

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setActive(true)
      } else {
        setActive(false)
      }
    })
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      setOpenSidebar(false)
    }
  }

  return (
    <nav className="w-full relative">
      <div
        className={`${
          active
            ? 'bg-gradient-to-br from-white to-indigo-100 via-blue-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-indigo-950 dark:via-blue-950 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 '
            : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z[80] dark:shadow'
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={'/'}
                className={`text-[25px] font-Roboto font-[700] text-black dark:text-white`}
              >
                <Image
                  src="/assets/logo/knowlink-logo.png"
                  alt="logo"
                  width={214}
                  height={66}
                />
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <div className="mr-2">
                <ThemeSwitcher />
              </div>
              {/* Only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt2
                  size={25}
                  className=" cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <div>
                  <Tooltip title="Your Profile" placement="bottom">
                    <button
                      id="dropdownUserAvatarButton"
                      data-dropdown-toggle="dropdownAvatar"
                      className="flex text-sm bg-indigo-500 rounded-full md:me-0 focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                      type="button"
                      onClick={toggleMenu}
                    >
                      <Image
                        src={
                          userData.user.avatar
                            ? userData.user.avatar?.url
                            : avatar
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full object-cover cursor-pointer hidden 800px:flex"
                        style={{
                          border:
                            activeItem === 6 ? '2px solid #4f46e5' : 'none'
                        }}
                      />
                    </button>
                  </Tooltip>
                  {isOpen && (
                    <div
                      id="dropdownAvatar"
                      className="z-10 absolute mt-4 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <p>{userData.user.name}</p>
                        <div className="font-medium truncate">
                          {userData.user?.email}
                        </div>
                      </div>
                      <div className="py-2 pl-4 flex items-center justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <CgProfile />
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          My Profile
                        </Link>
                      </div>
                      <div className="py-2 pl-4 flex items-center justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <IoIosLogOut />
                        <span
                          className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={() => setIsOpenLogout(true)}
                        >
                          Logout
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="hidden 800px:flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => setOpen(true)}
                >
                  <MdLogin className="mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        <main
          className={
            ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
            (openSidebar
              ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
              : ' transition-all delay-500 opacity-0 -translate-x-full  ')
          }
          onClick={handleClose}
          id="screen"
        >
          <section
            className={
              'w-[60%] md:w-2/5 lg:w-2/5 xl:w-1/4 left-0 absolute bg-gradient-to-br from-white to-indigo-200 via-blue-100 dark:from-gray-800 dark:to-indigo-900 dark:via-blue-950 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
              (openSidebar ? 'translate-x-0' : '-translate-x-full')
            }
          >
            <article className="relative w-270 max-w-lg pb-10 flex flex-col space-y-6 h-full">
              <header className="p-4 flex items-center justify-between">
                {/* <div className="w-full text-center py-6"> */}
                <Link
                  href={'/'}
                  passHref
                  className={`text-[25px] font-Roboto font-[700] text-black dark:text-white`}
                >
                  <Image
                    src="/assets/logo/knowlink-logo.png"
                    alt="logo"
                    width={214}
                    height={66}
                  />
                </Link>
                <BiX
                  className="block h-6 w-6 cursor-pointer"
                  onClick={() => {
                    setOpenSidebar(false)
                  }}
                />
                {/* </div> */}
              </header>
              <div
                onClick={() => {
                  setOpenSidebar(false)
                }}
              >
                <NavItems activeItem={activeItem} isMobile={true} />
                {userData ? (
                  <Link
                    href={'/profile'}
                    className="flex items-center justify-between text-[18px] mr-6 ml-6 text-black dark:text-white"
                  >
                    Your Profile
                    <Image
                      src={
                        userData.user.avatar
                          ? userData.user.avatar?.url
                          : avatar
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full object-cover cursor-pointer ml-5 my-2 mr-2"
                      style={{
                        border: activeItem === 5 ? '2px solid #4f46e5' : 'none'
                      }}
                    />{' '}
                  </Link>
                ) : (
                  <button
                    className="flex 800px:flex items-center justify-center h-[40px] w-[80px] ml-5 my-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => setOpen(true)}
                  >
                    <MdLogin className="mr-2" />
                    Login
                  </button>
                )}
                <div className="ml-5 my-2 mt-10">
                  <h4 className=" text-black dark:text-white opacity-75 text-sm text-center md:text-start font-normal">
                    @2024.KnowLink.All rights reserved
                  </h4>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
      {isOpenLogout && (
        <Modal
          open={isOpenLogout}
          onClose={() => setOpen(!isOpenLogout)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    data-behavior="cancel"
                    onClick={() => setIsOpenLogout(false)}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Are your sure to logout?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your are logging out from the system
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    data-behavior="commit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => logOutHandler()}
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    data-behavior="cancel"
                    onClick={() => setIsOpenLogout(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {route === 'Login' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === 'SignUp' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === 'Verification' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}

      {route === 'ForgotPassword' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={ForgotPassword}
            />
          )}
        </>
      )}

      {route === 'VerificationResetPassword' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={VerificationResetPassword}
            />
          )}
        </>
      )}
      {route === 'ResetPassword' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={ResetPassword}
            />
          )}
        </>
      )}
    </nav>
  )
}

export default Header
