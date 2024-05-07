/* eslint-disable react/no-unescaped-entities */
import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from '../Review/ReviewCard'

type Props = {}

const reviews = [
  {
    name: 'Robert Fox',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'KnowLink has completely transformed the way I approach learning. The video lessons are concise and engaging, making complex topics easy to understand. The interactive features allow me to take notes and revisit key concepts, enhancing my retention and comprehension. Overall, KnowLink has greatly improved my academic performance.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Leslie Alexander',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'As a visual learner, KnowLink has been a game-changer for me. The video lessons are clear and well-paced, and I appreciate the variety of subjects covered. The system user-friendly interface makes navigation seamless, and the ability to access lessons anytime, anywhere has been incredibly convenient. I highly recommend KnowLink to fellow students.As a visual learner, KnowLink has been a game-changer for me. The video lessons are clear and well-paced, and I appreciate the variety of subjects covered. ',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Cody Fisher',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'KnowLink e-learning platform has been a lifesaver for me. The video lessons are structured in a way that caters to different learning styles, and the accompanying resources, such as quizzes and supplementary materials, have been instrumental in reinforcing my understanding. I feel more confident in my studies thanks to KnowLink. KnowLink e-learning platform has been a lifesaver for me. The video lessons are structured in a way that caters to different learning styles, and the accompanying resources, such as quizzes and supplementary materials, have been instrumental in reinforcing my understanding. I feel more confident in my studies thanks to KnowLink.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'Robert Fox',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'I have tried several e-learning platforms, but KnowLink stands out for its comprehensive video lessons. The instructors are knowledgeable and engaging, and the production quality is top-notch. Additionally, the system progress tracking feature allows me to monitor my learning journey and identify areas for improvement. I am impressed with KnowLink commitment to student success.',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    name: 'Leslie Alexander',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'KnowLink has exceeded my expectations in terms of both content and usability. The video lessons are dynamic and informative, and I appreciate the option to adjust playback speed to suit my learning pace. The platform search functionality makes it easy to find specific topics, and the discussion forums foster collaboration among students. KnowLink has truly made learning enjoyable for me.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    name: 'Cody Fisher',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'I have been using KnowLink for a few months now, and I am consistently impressed by the depth and quality of the video lessons. The instructors are passionate about their subjects, and it is evident in their teaching. The system mobile app allows me to learn on the go, and the offline access feature ensures uninterrupted learning even without an internet connection. KnowLink has become an invaluable resource in my academic journey.',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg'
  }
]

const Review = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src="/assets/e-learning.png"
            alt="pngtree-e-learning"
            width={700}
            height={700}
            style={{ width: 'auto', height: 'auto' }}
            className="inline-block"
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 inline-block text-transparent bg-clip-text">
              Our Strength
            </span>
          </h3>
          <br />
          <p className={`${styles.label} text-justify`}>
            Let's hear what our students have to say about KnowLink. They may
            share their experiences, feedback, and thoughts on how KnowLink has
            impacted their learning journey.
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i: any, index: number) => (
            <div key={index}>
              <ReviewCard item={i} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Review
