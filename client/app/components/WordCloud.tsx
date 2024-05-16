'use client'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

const data = [
  {
    text: 'Math',
    value: 10
  },
  {
    text: 'English',
    value: 18
  },
  {
    text: 'Computer Science',
    value: 10
  },
  {
    text: 'Environmental Science',
    value: 5
  },
  {
    text: 'Health and Wellness',
    value: 3
  },
  {
    text: 'Civics',
    value: 4
  },
  {
    text: 'STEM',
    value: 5
  }
]

type Props = {
  formattedTopics: { text: string; value: number }[]
}

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16

const WordCloud = ({ formattedTopics }: Props) => {
  const theme = useTheme()
  const router = useRouter()
  return (
    <>
      <D3WordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === 'dark' ? 'white' : 'black'}
        onWordClick={(e, d) => {
          router.push('/quiz?topic=' + d.text)
        }}
      />
    </>
  )
}

export default WordCloud
