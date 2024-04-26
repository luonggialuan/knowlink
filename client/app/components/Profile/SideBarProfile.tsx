import React, { FC, useState } from 'react'
import avatarDefault from '../../../public/assets/default-avatar.jpg'
import Image from 'next/image'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { IoIosLogOut } from 'react-icons/io'
import { MdAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'
import { Modal } from '@mui/material'

type Props = {
  user: any
  active: number
  avatar: string | null
  setActive: (active: number) => void
  logOutHandler: any
}

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full hover:text-white">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer  ${
          active === 1 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'
        } hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-gray-700 hover:dark:border-gray-300`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'
        } hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-gray-700 hover:dark:border-gray-300`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordFill size={20} className="fill-black dark:fill-[#fff]" />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'
        } hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-gray-700 hover:dark:border-gray-300`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="fill-black dark:fill-[#fff]" />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          Enrolled Courses
        </h5>
      </div>
      {user?.role === 'admin' && (
        <Link
          href={'/admin'}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'
          }`}
        >
          <MdAdminPanelSettings
            size={20}
            className="fill-black dark:fill-[#fff]"
          />
          <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'
        } hover:bg-slate-200 dark:hover:bg-slate-800 hover:border hover:border-gray-700 hover:dark:border-gray-300`}
        onClick={() => setOpen(true)}
      >
        <IoIosLogOut size={20} className="fill-black dark:fill-[#fff]" />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          Logout
        </h5>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
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
                    onClick={() => setOpen(false)}
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
                    onClick={() => setOpen(false)}
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
    </div>
  )
}

export default SideBarProfile
