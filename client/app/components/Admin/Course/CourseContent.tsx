import { styles } from '@/app/styles/style'
import React, { FC, use, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsLink45Deg, BsPencil } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

type Props = {
  active: number
  setActive: (active: number) => void
  courseContentData: any
  setCourseContentData: (courseContentData: any) => void
  handleSubmit: any
}

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  )
  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed]
    updatedCollasped[index] = !updatedCollasped[index]
    setIsCollapsed(updatedCollasped)
  }

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData]
    updatedData[index] = {
      ...updatedData[index],
      links: updatedData[index].links.filter(
        (_: any, i: number) => i !== linkIndex
      )
    }
    setCourseContentData(updatedData)
  }

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData]
    // updatedData[index].links.push({ title: '', url: '' })
    updatedData[index] = {
      ...updatedData[index],
      links: [...updatedData[index].links, { title: '', url: '' }]
    }
    setCourseContentData(updatedData)
  }

  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.videoLength === '' ||
      item.links[0].title === '' ||
      item.links[0].url === ''
    ) {
      toast.error('Please fill all the fields first!')
    } else {
      let newVideoSection = ''

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection

        // Use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection
        }

        const newContent = {
          videoUrl: '',
          videoLength: '',
          title: '',
          description: '',
          videoSection: newVideoSection,
          links: [{ title: '', url: '' }]
        }

        setCourseContentData([...courseContentData, newContent])
      }
    }
  }

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].videoLength === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Please fill all the fields first!')
    } else {
      setActiveSection(activeSection + 1)
      const newContent = {
        videoUrl: '',
        videoLength: '',
        title: '',
        description: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }]
      }

      setCourseContentData([...courseContentData, newContent])
    }
  }

  const prevButton = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].videoLength === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Section cannot be empty!')
    } else {
      setActive(active + 1)
      handleCourseSubmit()
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection

          return (
            <div key={index}>
              <div
                className={`w-full dark:bg-[#cdc8c817] bg-slate-50 p-4 ${
                  showSectionInput ? 'mt-10' : 'mb-0'
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section'
                            ? 'w-[170px]'
                            : 'w-full'
                        } font-Roboto cursor-pointer text-black dark:text-white bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index] = {
                            ...updatedData[index],
                            videoSection: e.target.value
                          }
                          setCourseContentData(updatedData)
                        }}
                      />
                      <BsPencil className="cursor-pointer text-black dark:text-white text-right" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Roboto text-black dark:text-white">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div> </div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-black dark:text-white tex-[20px] mr-2 ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData]
                          updatedData.splice(index, 1)
                          setCourseContentData(updatedData)
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-black dark:text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)'
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = courseContentData.map(
                            (contentItem: any, contentIndex: number) => {
                              if (contentIndex === index) {
                                return { ...contentItem, title: e.target.value }
                              }
                              return contentItem
                            }
                          )
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index].videoUrl = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index] = {
                            ...updatedData[index],
                            videoLength: e.target.value
                          }
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Description..."
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index].description = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                      <br />
                    </div>
                    {item?.links?.map((link: any, linkIndex: number) => (
                      <div className="my-3 block" key={linkIndex + 1}>
                        <div className="w-full text-black dark:text-white flex items-center justify-between">
                          <label>Link {linkIndex + 1}</label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? 'cursor-no-drop'
                                : 'cursor-pointer'
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source... (Link Title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = courseContentData.map(
                              (contentItem: any, contentIndex: number) => {
                                if (contentIndex === index) {
                                  const updatedLinks = contentItem.links.map(
                                    (linkItem: any, linkIndex: number) => {
                                      if (linkIndex === linkIndex) {
                                        return {
                                          ...linkItem,
                                          title: e.target.value
                                        }
                                      }
                                      return linkItem
                                    }
                                  )
                                  return { ...contentItem, links: updatedLinks }
                                }
                                return contentItem
                              }
                            )
                            setCourseContentData(updatedData)
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Source Url... (Link URL)"
                          className={`${styles.input} mt-3`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData]
                            updatedData[index].links[linkIndex].url =
                              e.target.value
                            setCourseContentData(updatedData)
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* Add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* Add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-indigo-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={prevButton}
        >
          Pre
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-indigo-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={handleOptions}
        >
          Next
        </div>
      </div>
    </div>
  )
}

export default CourseContent
