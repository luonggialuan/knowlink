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
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Leslie Alexander',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Cody Fisher',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'Robert Fox',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    name: 'Leslie Alexander',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    name: 'Cody Fisher',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia.
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
