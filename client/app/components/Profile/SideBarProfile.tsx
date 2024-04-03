import React, { FC } from 'react'
import avatarDefault from '../../../public/assets/default-avatar.jpg'
import Image from 'next/image'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { IoIosLogOut } from 'react-icons/io'
import { MdAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'

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
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'
        }`}
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
          active === 2 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordFill size={20} className="fill-black dark:fill-[#fff]" />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'
        }`}
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
            active === 6 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'
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
          active === 4 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'
        }`}
        onClick={() => logOutHandler()}
      >
        <IoIosLogOut size={20} className="fill-black dark:fill-[#fff]" />
        <h5 className="text-black dark:text-white pl-2 800px:block hidden font-Roboto">
          Logout
        </h5>
      </div>
    </div>
  )
}

export default SideBarProfile
