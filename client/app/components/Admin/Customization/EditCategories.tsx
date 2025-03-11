'use client'
import {
  useEditLayoutMutation,
  useGetHeroDataQuery
} from '@/redux/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import { styles } from '@/app/styles/style'
import { AiOutlineDelete } from 'react-icons/ai'
import { title } from 'process'
import toast from 'react-hot-toast'
import { IoMdAddCircleOutline } from 'react-icons/io'

type Props = {}

const EditCategories = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true
  })
  const [editLayout, { isLoading: editLoading, isSuccess, error }] =
    useEditLayoutMutation()

  const [categories, setCategories] = useState<any[]>([])

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((i: any) =>
        i._id === id ? { ...i, title: value } : i
      )
    )
  }

  const newCategoriesHandler = () => {
    if (
      categories?.length > 0 &&
      categories[categories?.length - 1]?.title === ''
    ) {
      toast.error('Category title cannot be empty')
    } else {
      setCategories((prevCategories: any) => [
        ...(prevCategories || []),
        { _id: Date.now().toString(), title: '' }
      ])
    }
  }

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories)
  }

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === '')
  }

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryEmpty(categories)
    ) {
      await editLayout({
        type: 'Categories',
        categories
      })
    }
  }

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories)
    }
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Categories updated successfully')
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
        <div className=" w-[90%] 800px:w-[80%] m-auto mt-[120px] min-h-screen">
          <h1 className={`${styles.title} text-start`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div key={index} className="p-2">
                  <div className="flex items-center w-full ">
                    <input
                      className={`${styles.input} !w-[unset] !border-none focus:ring-transparent !text-[18px] `}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategories: any) =>
                          prevCategories.filter((i: any) => i._id !== item._id)
                        )
                      }}
                    />
                  </div>
                </div>
              )
            })}

          <div className="w-full flex">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>

          <button
            className={`${styles.button} mt-10 
              ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryEmpty(categories)
                  ? ''
                  : '!bg-indigo-500 text-white'
              }
              `}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategoryEmpty(categories)
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

export default EditCategories
