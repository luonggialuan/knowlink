import {
  useEditLayoutMutation,
  useGetHeroDataQuery
} from '@/redux/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import Banner from '../../Banner'
import Image from 'next/image'
import { AiOutlineCamera } from 'react-icons/ai'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'
import Loader from '../../Loader/Loader'

type Props = {}

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const { data, refetch, isLoading } = useGetHeroDataQuery('Banner', {
    refetchOnMountOrArgChange: true
  })
  const [editLayout, { isLoading: editLoading, isSuccess, error }] =
    useEditLayoutMutation()

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title)
      setSubTitle(data?.layout?.banner?.subTitle)
      setImage(data?.layout?.banner?.image?.url)
    }
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Updated successfully')
      refetch()
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any
        toast.error(errorData?.data?.message)
      }
    }
  }, [isSuccess, error])

  const handleUpdateImage = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const handleEdit = async () => {
    await editLayout({
      type: 'Banner',
      image,
      title,
      subTitle
    })
  }

  return (
    <>
      {isLoading || editLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
            <div className="col-span-6 flex flex-col justify-evenly">
              <div className="flex gap-2 mx-auto lg:mx-0">
                <Image
                  src="/assets/banner/check.svg"
                  alt="check-image"
                  width={20}
                  height={20}
                />
                <h3 className="text-kellygreen text-sm font-semibold text-center lg:text-start text-black dark:text-white">
                  Get 30% off on first enroll
                </h3>
              </div>

              <textarea
                className="text-midnightblue bg-transparent text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0 text-black dark:text-white"
                name=""
                id=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
              />
              <textarea
                className="text-charcoal bg-transparent text-lg font-normal text-center lg:text-start pt-5 lg:pt-0 text-black dark:text-white"
                name=""
                id=""
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />

              <div className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0">
                <input
                  type="search"
                  className="py-6 lg:py-8 text-lg w-full text-black dark:text-white  rounded-full pl-8 focus:outline-none focus:text-black dark:shadow-lg dark:shadow-indigo-500/50"
                  placeholder="Search Courses..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5 lg:pt-0">
                  <button
                    type="submit"
                    className="p-3 lg:p-5 focus:outline-none focus:shadow-outline bg-[#4f46e5] hover:bg-[#7c3aed] duration-150 ease-in-out rounded-full"
                  >
                    <Image
                      src={'/assets/banner/search.svg'}
                      alt="inputicon"
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-10 lg:pt-4">
                <div className="flex gap-2">
                  <Image
                    src="/assets/banner/check-circle.svg"
                    alt="check-image"
                    width={30}
                    height={30}
                    className="smallImage"
                  />
                  <p className="text-sm sm:text-lg font-normal text-black dark:text-white">
                    Flexible
                  </p>
                </div>
                <div className="flex gap-2">
                  <Image
                    src="/assets/banner/check-circle.svg"
                    alt="check-image"
                    width={30}
                    height={30}
                    className="smallImage"
                  />
                  <p className="text-sm sm:text-lg font-normal text-black dark:text-white">
                    Learning path
                  </p>
                </div>
                <div className="flex gap-2">
                  <Image
                    src="/assets/banner/check-circle.svg"
                    alt="check-image"
                    width={30}
                    height={30}
                    className="smallImage"
                  />
                  <p className="text-sm sm:text-lg font-normal text-black dark:text-white">
                    Community
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-6 flex justify-center">
              <div className="relative">
                {image ? (
                  <img src={image} alt="nothing" width={1000} height={805} />
                ) : (
                  <div className="max-w-full h-auto flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-200">No Image</p>
                  </div>
                )}
                <input
                  type="file"
                  name=""
                  id="avatar"
                  className="hidden"
                  onChange={handleUpdateImage}
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                />
                <label htmlFor="avatar">
                  <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                    <AiOutlineCamera size={20} className="z-10" fill="white" />
                  </div>
                </label>
              </div>
            </div>

            <button
              className={`${styles.button} mt-10
            ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? '!bg-indigo-500 text-white'
                : ''
            }
            `}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default EditHero
