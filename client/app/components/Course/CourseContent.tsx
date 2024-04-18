import Heading from '@/app/utils/Heading'
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React, { useState } from 'react'
import CourseContentMedia from './CourseContentMedia'
import Loader from '../Loader/Loader'
import Header from '../Header'
import CourseContentList from './CourseContentList'
import Footer from '../Footer'

type Props = {
  id: string
  user: any
}

const CourseContent = ({ id, user }: Props) => {
  const [route, setRoute] = useState('Login')
  const [open, setOpen] = useState(false)
  const {
    data: contentData,
    isLoading,
    refetch
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true })
  const data = contentData?.content
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
                data={data}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default CourseContent
