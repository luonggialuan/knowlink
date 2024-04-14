'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

type Props = {}

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState(0)
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: ''
  })
  console.log(courseInfo)
  const [benefits, setBenefits] = useState([{ title: '' }])
  const [prerequisites, setPrerequisites] = useState([{ title: '' }])
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      videoLength: '',
      links: [
        {
          title: '',
          url: ''
        }
      ],
      suggestion: ''
    }
  ])
  const [courseData, setCourseData] = useState({})

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title
    }))

    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title
    }))

    // Format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        videoLength: courseContent.videoLength,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url
        })),
        suggestion: courseContent.suggestion
      })
    )

    // Prepare data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      category: courseInfo.category,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideo: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData
    }

    setCourseData(data)
  }

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation()

  const handleCourseCreate = async (e: any) => {
    const data = courseData

    if (!isLoading) {
      // await createCourse(data)
      toast.promise(createCourse(data), {
        loading: 'Creating course...',
        success: <b>Course created successfully!</b>,
        error: <b>There are something wrong.</b>
      })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      redirect('/admin/courses')
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }
  }, [isSuccess, error])

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={false}
            isLoading={false}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default CreateCourse
