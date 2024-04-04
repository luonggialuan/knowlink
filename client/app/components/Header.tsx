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
import { useSession } from 'next-auth/react'
import {
  useLogOutQuery,
  useSocialAuthMutation
} from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { MdLogin } from 'react-icons/md'

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
  const { user } = useSelector((state: any) => state.auth)
  const { data } = useSession()
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
  const [logout, setLogout] = useState(false)
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  })

  useEffect(() => {
    if (!!data && !user) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image
      })
    }
    // if (data === null && user === null && logout == false) setLogout(true)

    // Cleanup function
    return () => {
      if (user && logout) {
        setLogout(false)
      }
    }
  }, [data, user])

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
                KnowLink
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt2
                  size={25}
                  className=" cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href={'/profile'}>
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? '2px solid #4f46e5' : 'none'
                    }}
                  />
                </Link>
              ) : (
                // <MdLogin
                //   size={25}
                //   className="hidden 800px:block cursor-pointer dark:text-white text-black"
                //   onClick={() => {
                //     setOpen(true)
                //   }}
                // />
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
                  KnowLink
                </Link>
                <BiX
                  className="block h-6 w-6"
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
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              </div>
            </article>
          </section>
        </main>
      </div>
      {route === 'Login' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
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
    </nav>
  )
}

export default Header
