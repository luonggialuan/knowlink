'use client'
import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5'
import { format } from 'timeago.js'
import CourseContentList from './CourseContentList'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '../Payment/CheckOutForm'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import Image from 'next/image'
import avatarDefault from '@/public/assets/default-avatar.jpg'

type Props = {
  data: any
  clientSecret: string
  stripePromise: any
  setRoute: any
  setOpen: any
}

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const [user, setUser] = useState<any>()
  // const user = userData?.user
  useEffect(() => {
    setUser(userData?.user)
    refetch()
  }, [userData, refetch])

  const [open, setOpen] = useState(false)
  const discountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100

  const discountPercentengePrice = discountPercentenge.toFixed(0)

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id)

  const handleOrder = (e: any) => {
    if (user) setOpen(true)
    else {
      setRoute('Login')
      openAuthModal(true)
    }
  }

  return (
    <>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[28px] font-Roboto font-[700] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Roboto font-[500] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex 800px:items-center py-2"
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </>
            <h1 className="text-[25px] font-Roboto font-[500] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            <>
              {data.prerequisites?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex 800px:items-center py-2"
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </>
            <h1 className="text-[25px] font-Roboto font-[500] text-black dark:text-white">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-Roboto font-[500] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white text-justify">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]">
                  <h5 className="text-[25px] font-Roboto text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{' '}
                    Course Rating | {data?.reviews?.length} Reviews
                  </h5>
                </div>
              </div>
              <br />
              {(data?.reviews && [...data?.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div key={index} className="w-full pb-4">
                    <div className="flex">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : avatarDefault
                        }
                        width={50}
                        height={50}
                        alt="avatar"
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              {!isPurchased && (
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px] text-black dark:text-white">
                    {data.price == 0 ? 'Free' : data.price + '$'}
                  </h1>
                  <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                    {/* {data.estimatedPrice}$ */}
                    {data.price == 0 ? '' : data.estimatedPrice + '$'}
                  </h5>
                  <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                    {/* {discountPercentengePrice}% Off */}
                    {data.price == 0 ? '' : discountPercentengePrice + '% Off'}
                  </h4>
                </div>
              )}
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Roboto cursor-pointer flex items-center justify-center`}
                    href={`/course/access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <button
                    className={`${styles.button} !w-[180px] my-3 font-Roboto cursor-pointer `}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </button>
                )}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </>
  )
}

export default CourseDetails
