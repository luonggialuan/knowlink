'use client'
import { styles } from '@/app/styles/style'
import {
  useEditLayoutMutation,
  useGetHeroDataQuery
} from '@/redux/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Loader from '../../Loader/Loader'

type Props = {}

const EditFaq = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery('FAQ', {
    refetchOnMountOrArgChange: true
  })
  const [editLayout, { isLoading: editLoading, isSuccess, error }] =
    useEditLayoutMutation()

  const [questions, setQuestions] = useState<any[]>([])

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    )
  }

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    )
  }

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    )
  }

  const newFaqHandler = () => {
    setQuestions([
      ...(questions || []),
      {
        questions: '',
        answer: '',
        _id: Date.now().toString()
      }
    ])
  }

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions)
  }

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === '' || q.answer === '')
  }

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: 'FAQ',
        faq: questions
      })
    }
  }

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || [])
    }
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      toast.success('FAQ updated successfully')
      refetch()
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any
        toast.error(errorData?.data?.message)
      }
    }
  }, [isSuccess, error])

  return (
    <>
      {isLoading || editLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] min-h-screen">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && 'border-t'
                  } border-gray-500 pt-6 dark:border-gray-200`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        className={`${styles.input} border-none focus:ring-transparent`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={'Add your question...'}
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd>
                      <input
                        className={`${styles.input} border-none focus:ring-transparent`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={'Add your answer...'}
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            )
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <button
            className={`${styles.button} mt-10
              ${
                areQuestionsUnchanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? ''
                  : '!bg-indigo-500 text-white'
              }
              `}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </button>
        </div>
      )}
    </>
  )
}

export default EditFaq
