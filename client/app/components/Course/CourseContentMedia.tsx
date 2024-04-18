import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar
} from 'react-icons/ai'
import avatarDefault from '@/public/assets/default-avatar.jpg'
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation
} from '@/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'

type Props = {
  data: any
  id: string
  activeVideo: number
  setActiveVideo: (activeVideo: number) => void
  user: any
  refetch: any
}

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch
}: Props) => {
  const [activeBar, setActiveBar] = useState(0)
  const [question, setQuestion] = useState('')
  const [review, setReview] = useState('')
  const [answer, setAnswer] = useState('')
  const [questionId, setQuestionId] = useState('')
  const [rating, setRating] = useState(0)
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: createQuestionLoading }
  ] = useAddNewQuestionMutation()
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: createAnswerLoading
    }
  ] = useAddAnswerInQuestionMutation()

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  )

  const handleQuestion = () => {
    if (question.length == 0) {
      toast.error('Question cannot be empty!')
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id
      })
    }
  }

  const handleReview = () => {}

  const handleAnswerSubmit = () => {
    // answer, courseId, contentId, questionId

    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setQuestion('')
      refetch()
      toast.success('Added question successfully!')
    }

    if (answerSuccess) {
      setAnswer('')
      refetch()
      toast.success('Added answer successfully!')
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }

    if (answerError) {
      if ('data' in answerError) {
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }
  }, [isSuccess, error, answerSuccess, answerError])

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
                'text-indigo-700 dark:text-blue-400 font-[500]'
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
              className="outline-none bg-transparent border dark:border-slate-200 border-slate-500 800px:w-full p-2 ml-3 rounded w-[90%] 800px:text-[18px] font-Roboto text-black dark:text-white"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 rounded-full ${
                createQuestionLoading && 'cursor-not-allowed'
              }`}
              onClick={createQuestionLoading ? () => {} : handleQuestion}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] border dark:border-slate-200 border-slate-500"></div>
          <CommentReply
            data={data}
            activeVideo={activeVideo}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            setQuestionId={setQuestionId}
            createAnswerLoading={createAnswerLoading}
          />
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
                    onClick={handleReview}
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

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  createAnswerLoading
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            createAnswerLoading={createAnswerLoading}
          />
        ))}
      </div>
    </>
  )
}

const CommentItem = ({
  data,
  activeVideo,
  item,
  index,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  createAnswerLoading
}: any) => {
  const [replyActive, setReplyActive] = useState(false)

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item.user.avatar ? item.user.avatar.url : avatarDefault}
            width={50}
            height={50}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="pl-3">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.user.name}
            </h5>
            <p className="text-[#000000] dark:text-[#ffffff]">
              {item.question}
            </p>
            <small className="dark:text-[#ffffff83] text-gray-500">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-gray-600 dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive)
              setQuestionId(item._id)
            }}
          >
            {!replyActive
              ? item.questionReplies.length != 0
                ? 'All Replies'
                : 'Add Reply'
              : 'Hide Replies'}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-gray-500 dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer  text-gray-500 dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
              >
                <Image
                  src={item.user.avatar ? item.user.avatar.url : avatarDefault}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px] text-black dark:text-white">
                      {item.user.name}
                    </h5>
                    {item.user.role === 'admin' && (
                      <VscVerifiedFilled className="text-[#0095f6] ml-2 tex-[20px]" />
                    )}
                  </div>
                  <p className="text-[#000000] dark:text-[#ffffff]">
                    {item.answer}
                  </p>
                  <small className="dark:text-[#ffffff83] text-gray-500">
                    {format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full relative">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your answer..."
                    value={answer}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000083] text-black dark:text-white dark:border-[#ffffff83] p-[5px] w-[95%]"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className={`${styles.button} !w-[100px] rounded-full !mt-2 mr-2 bg-transparent text-black dark:text-white hover:bg-slate-500 dark:hover:bg-slate-500 hover:text-white !border-none`}
                    onClick={() => {
                      setAnswer('')
                      setReplyActive(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${
                      styles.button
                    } !w-[100px] rounded-full !mt-2 !border-none cursor-not-allowed ${
                      answer === ''
                        ? '!cursor-not-allowed hover:bg-slate-400 dark:hover:bg-slate-400 !bg-slate-400'
                        : 'hover:bg-blue-500 dark:hover:bg-blue-500 !bg-blue-500'
                    }`}
                    onClick={handleAnswerSubmit}
                    disabled={answer === '' || createAnswerLoading}
                  >
                    Reply
                  </button>
                </div>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  )
}

export default CourseContentMedia
