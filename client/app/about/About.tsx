/* eslint-disable react/no-unescaped-entities */
import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <>
      <div className={`w-[95%] 800px:w-[85%] m-auto mt-2`}>
        <h1 className="text-center font-Roboto text-[40px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-gray-300 800px:!leading-[60px] text-[#000] font-[500] tracking-tight">
          What is{' '}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 inline-block text-transparent bg-clip-text">
            KnowLink
          </span>
          {'?'}
        </h1>
        <br />
        <div className="w-[95%] 800px:w-[85%] m-auto">
          <p className="text-[18px] font-Roboto text-justify text-black dark:text-gray-300">
            KnowLink is a cutting-edge e-learning platform tailored specifically
            for high school students seeking to excel academically. At its core,
            KnowLink serves as a comprehensive digital hub offering a rich array
            of educational resources and interactive experiences.
            <br />
            <br />
            Central to KnowLink's mission is its extensive catalogue of courses
            meticulously crafted to cater to the diverse interests and academic
            needs of high school students. From foundational subjects like
            mathematics, science, history, and language arts to specialized
            electives spanning computer science, arts, and personal development,
            KnowLink provides a holistic learning experience that transcends
            traditional classroom boundaries.
            <br />
            <br />
            One of KnowLink's distinguishing features is its commitment to
            fostering engaging and immersive learning environments. Through a
            blend of dynamic multimedia content, including videos, animations,
            and simulations, students are not only educated but also
            entertained, making the learning process enjoyable and memorable.
            <br />
            <br />
            KnowLink takes personalization to the next level with its adaptive
            learning pathways, empowering students to tailor their educational
            journey according to their unique learning styles, preferences, and
            pace. Regular assessments, quizzes, and assignments serve as
            checkpoints along the way, allowing students to gauge their
            understanding and track their progress over time.
            <br />
            <br />
            Beyond its robust academic offerings, KnowLink cultivates a vibrant
            online community where students can connect with peers, share
            insights, and collaborate on projects. Additionally, access to
            support resources such as discussion forums, live chat assistance,
            and virtual tutoring sessions ensures that students receive the
            guidance and assistance they need to succeed.
            <br />
            <br />
            Ready to take the next step in your academic journey? Visit our
            website today to discover the endless possibilities awaiting you at
            KnowLink. Whether you're seeking to sharpen your skills, pursue your
            passions, or prepare for future endeavors, KnowLink is here to help
            you succeed. Join us and unlock your potential – the adventure
            begins now!
          </p>
        </div>
      </div>
    </>
  )
}

export default About
