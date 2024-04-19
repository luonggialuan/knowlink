import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useGetHeroDataQuery } from '@/redux/layout/layoutApi'
import Loader from './Loader/Loader'
import { useRouter } from 'next/navigation'

type Props = {}

const Banner = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery('Banner', {})
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (search === '') return
    else router.push(`/courses?title=${search}`)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="home-section" className="bg-lightkblue">
          <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
              <div className="col-span-6 flex flex-col justify-evenly">
                <div className="flex gap-2 mx-auto lg:mx-0">
                  <Image
                    src="/assets/banner/check.svg"
                    alt="check-image"
                    width={20}
                    height={20}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <h3 className="text-kellygreen text-sm font-semibold text-center lg:text-start text-black dark:text-white">
                    Get 30% off on first enroll
                  </h3>
                </div>
                <h1 className="text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0 text-black dark:text-white">
                  {data?.layout?.banner.title}
                </h1>
                <h3 className="text-charcoal text-lg font-normal text-center lg:text-start pt-5 lg:pt-0 text-black dark:text-white">
                  {data?.layout?.banner.subTitle}
                </h3>

                <div className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0">
                  <input
                    type="search"
                    className="py-6 lg:py-8 text-lg w-full text-black dark:text-white  rounded-full pl-8 focus:outline-none focus:text-black dark:shadow-lg dark:shadow-indigo-500/50"
                    placeholder="Search Courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5 lg:pt-0">
                    <button
                      type="submit"
                      className="p-3 lg:p-5 focus:outline-none focus:shadow-outline bg-[#4f46e5] hover:bg-[#7c3aed] duration-150 ease-in-out rounded-full"
                      onClick={handleSearch}
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
                <Image
                  src={data?.layout?.banner?.image?.url}
                  alt="nothing"
                  width={1000}
                  height={805}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Banner
