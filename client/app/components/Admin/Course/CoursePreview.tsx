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
  isEdit: boolean
  isLoading: boolean
}

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
  isLoading
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
          {courseData.demoUrl && (
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.title}
            />
          )}
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] text-black dark:text-white">
            {courseData?.price == 0 ? 'Free' : courseData?.price + '$'}
          </h1>
          <h5 className="pl-3 text-[18px] mt-2 line-through opacity-80 text-black dark:text-white">
            {courseData?.price == 0 ? '' : courseData?.estimatedPrice + '$'}
            {/* {courseData?.estimatedPrice}$ */}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
            {courseData?.price == 0 ? '' : discountPercentengePrice + '% Off'}
            {/* {discountPercentengePrice}% Off */}
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
          {isEdit ? (
            isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Updating...
              </>
            ) : (
              'Update'
            )
          ) : (
            'Create'
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursePreview
