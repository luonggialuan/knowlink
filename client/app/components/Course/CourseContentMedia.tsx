import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar
} from 'react-icons/ai'
import avatarDefault from '@/public/assets/default-avatar.jpg'

type Props = {
  data: any
  id: string
  activeVideo: number
  setActiveVideo: (activeVideo: number) => void
  user: any
}

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user
}: Props) => {
  const [activeBar, setActiveBar] = useState(0)
  const [question, setQuestion] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  )

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] flex items-center justify-center rounded-full p-2 ${
            activeVideo == 0 && '!cursor-no-drop opacity-[.8]'
          }`}
          onClick={() => setActiveVideo(activeVideo == 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] flex items-center justify-center rounded-full p-2 ${
            data.length - 1 == activeVideo && '!cursor-no-drop opacity-[.8]'
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 == activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <span>Next Lesson</span>
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[500] text-black dark:text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-400 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {['Overview', 'Resourses', 'QA', 'Reviews'].map(
          (text: any, index: number) => (
            <h5
              key={index}
              className={`800px:text-[20px] text-black dark:text-white cursor-pointer ${
                activeBar === index &&
                'text-indigo-700 dark:text-sky-400 font-[500]'
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          )
        )}
      </div>
      <br />
      {activeBar == 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar == 1 && (
        <>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + ' :'}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </>
      )}

      {activeBar == 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatarDefault}
              width={50}
              height={50}
              alt="avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your quesion..."
              className="outline-none bg-transparent border dark:border-slate-200 border-slate-500 800px:w-full p-2 ml-3 rounded w-[90%] 800px:text-[18px] font-Roboto"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 rounded-full`}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:border-slate-200 border-slate-500"></div>
        </>
      )}

      {activeBar == 3 && (
        // <div className="w-full">
        <>
          {!isReviewExists && (
            <div className="flex w-full">
              <Image
                src={user.avatar ? user.avatar.url : avatarDefault}
                alt="avatar"
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px] font-[500] text-black dark:text-white">
                  {rating != 0 ? 'Your Rating' : 'Give a Rating '}
                  {rating != 0 ? '' : <span className="text-red-500">*</span>}
                </h5>
                <div className="flex w-full ml-2 pb-3">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <textarea
                  name=""
                  id=""
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  cols={40}
                  rows={5}
                  placeholder="Write your review..."
                  className="outline-none bg-transparent border dark:border-slate-200 border-slate-500 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Roboto"
                ></textarea>
                <div className="w-full flex justify-end">
                  <button
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 rounded-full`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
        // </div>
      )}
    </div>
  )
}

export default CourseContentMedia
