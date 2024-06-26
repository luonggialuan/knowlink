'use client'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import DashBoardHeader from '@/app/components/Admin/DashBoardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/useAdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = ({ params }: any) => {
  const id = params?.id
  return (
    <>
      <EditCourse id={id} />
    </>
  )
}

export default page
