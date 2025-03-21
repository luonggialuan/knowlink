import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

type Props = {}

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery('FAQ', {})
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq)
    }
  }, [data])

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id)
  }

  return (
    <>
      <div className="!w-[95%] 800px:!w-[85%] m-auto mt-2">
        <h1 className={`${styles.title} 800px:!text-[40px]`}>
          Frequently Asked Questions
        </h1>
        <div className="w-[95%] 800px:w-[85%] m-auto mt-12">
          <dl className="space-y-8">
            {questions?.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && 'border-t'
                } border-gray-500 dark:border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Roboto text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}

export default FAQ
