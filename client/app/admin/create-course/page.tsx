'use client'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import DashBoardHeader from '@/app/components/Admin/DashBoardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/useAdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <CreateCourse />
    </>
  )
}

export default page
