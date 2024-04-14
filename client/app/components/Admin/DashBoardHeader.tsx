'use client'
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher'
import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Props = {}

const DashBoardHeader = (props: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 bg-indigo-600 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div
          className={`w-[70%] sm:w-[300px] md:w-[350px] h-[50vh] dark:bg-gray-900 bg-white shadow-xl absolute top-16 z-100 rounded transition-opacity duration-300 transform ${
            open ? '' : 'scale-y-0 opacity-0'
          } origin-top-right`}
        >
          <h5 className="text-center text-[20px] font-Roboto text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-gray-800 bg-gray-100 font-Roboto border-b dark:border-b-gray-700 border-b-gray-200 my-2 px-2">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-blue-500 dark:text-blue-300 cursor-pointer text-[14px]">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">Testing</p>
            <p className="px-2 text-slate-600 dark:text-slate-400 text-[12px]">
              5 days ago
            </p>
          </div>
          <div className="dark:bg-gray-800 bg-gray-100 font-Roboto border-b dark:border-b-gray-700 border-b-gray-200 my-2 px-2">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-blue-500 dark:text-blue-300 cursor-pointer text-[14px]">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">Testing</p>
            <p className="px-2 text-slate-600 dark:text-slate-400 text-[12px]">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashBoardHeader
