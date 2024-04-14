'use client'
import React, { useState } from 'react'
import DashBoardHero from '../components/Admin/DashBoardHero'

type Props = {}

function page({}: Props) {
  return <DashBoardHero isDashboard={true} />
}

export default page
