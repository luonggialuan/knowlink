import Ratings from '@/app/utils/Ratings'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

type Props = {
  item: any
  isProfile?: boolean
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course/access/${item._id}`}
    >
      <div className="relative group w-full min-h-[35px] bg-opacity-20 bg-slate-300 dark:bg-slate-500 dark:bg-opacity-20 border dark:border-[#ffffff1d] border-[#00000015] hover:shadow-indigo-400 dark:hover:shadow-indigo-400 rounded-lg p-3 shadow-2xl dark:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <Image
          src={item.thumbnail.url}
          alt=""
          width={500}
          height={300}
          // objectFit="contain"
          className="rounded w-full h-[200px]"
        />
        <br />
        <h1 className="font-Roboto text-[16px] text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && 'hidden 800px:inline'
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price == 0 ? 'Free' : item.price + '$'}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList
              size={20}
              className="text-black dark:text-[#fff]"
            />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
