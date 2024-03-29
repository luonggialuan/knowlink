import Link from 'next/link'
import React from 'react'

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
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? 'dark:text-[#38bdf8] text-[#4f46e5]'
                    : 'dark:text-white text-black'
                } text-[18px] px-6 font-Roboto font-[500]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? 'dark:text-[#38bdf8] text-[#4f46e5]'
                        : 'dark:text-white text-black'
                    } block py-5 text-[18px] px-6 font-Roboto font-[400]`}
                  ></span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default NavItems
