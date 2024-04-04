'use client'
import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import React, { FC } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

type Props = {
  active: number
  setActive: (active: number) => void
  courseData: any
  handleCourseCreate: any
}

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate
}) => {
  const discountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100

  const discountPercentengePrice = discountPercentenge.toFixed(0)

  const prevButton = () => {
    setActive(active - 1)
  }

  const createCourse = () => {
    handleCourseCreate()
  }

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] text-black dark:text-white">
            {courseData?.price === 0 ? 'Free' : courseData?.price + '$'}
          </h1>
          <h5 className="pl-3 text-[18px] mt-2 line-through opacity-80 text-black dark:text-white">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
            {discountPercentengePrice}% Off
          </h4>
        </div>
        <div className="flex ">
          <button
            className={`${styles.button} !bg-violet-700 !rounded-full !w-[180px] !text-white font-Roboto cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </button>
        </div>
        <div className="flex items-baseline">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%]`}
          />
          <button
            className={`${styles.button} !bg-blue-500 !rounded-full !text-white my-3 ml-4 !w-[120px] font-Roboto cursor-pointer`}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Roboto font-[600] text-black dark:text-white">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={5} />
              <h5 className="text-black dark:text-white">0 Reviews</h5>
            </div>
            <h5 className="text-black dark:text-white">0 Students</h5>
          </div>
          <br />
          <h1 className="text-black dark:text-white text-[25px] font-Roboto font-[700]">
            What will you learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div key={index} className="w-full flex 800px:items-center py-2">
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline
                size={20}
                className="text-black dark:text-white"
              />
            </div>
            <p className="pl-2 text-black dark:text-white">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-black dark:text-white text-[25px] font-Roboto font-[700]">
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div key={index} className="w-full flex 800px:items-center py-2">
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline
                size={20}
                className="text-black dark:text-white"
              />
            </div>
            <p className="pl-2 text-black dark:text-white">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* Course Description */}
        <div className="w-full">
          <h1 className="text-black dark:text-white text-[25px] font-Roboto font-[700]">
            Course Details
          </h1>
          <p className="text-black dark:text-white text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-indigo-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={prevButton}
        >
          Pre
        </div>
        <div
          className="w-full  800px:w-[180px] flex items-center justify-center h-[40px] bg-indigo-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={createCourse}
        >
          Create
        </div>
      </div>
    </div>
  )
}

export default CoursePreview
