import Link from 'next/link'
import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { useRouter } from 'next/navigation'

export const navItemsData = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Courses',
    url: '/courses'
  },
  {
    name: 'Quizzzy',
    url: '/quizzzy'
  },
  {
    name: 'About',
    url: '/about'
  },
  {
    name: 'Policy',
    url: '/policy'
  },
  {
    name: 'FAQ',
    url: '/faq'
  }
]

type Props = {
  activeItem: number
  isMobile: boolean
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const router = useRouter()
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Tooltip title={`${i.name} page`} placement="bottom" key={index}>
              <span
                key={index}
                onClick={() => {
                  router.push(`${i.url}`)
                }}
                className={`${
                  activeItem === index
                    ? 'dark:text-[#38bdf8] text-[#4f46e5]'
                    : 'dark:text-white text-black'
                } text-[18px] px-6 font-Roboto font-[500] cursor-pointer hover:text-[#4f46e5] dark:hover:text-[#38bdf8]`}
              >
                {i.name}
              </span>
            </Tooltip>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href="/" key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? 'dark:text-[#38bdf8] text-[#4f46e5]'
                      : 'dark:text-white text-black'
                  } block py-5 text-[18px] px-6 font-Roboto font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  )
}

export default NavItems
