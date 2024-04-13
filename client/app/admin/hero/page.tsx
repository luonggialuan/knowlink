'use client'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import EditHero from '@/app/components/Admin/Customization/EditHero'
import DashBoardHeader from '@/app/components/Admin/DashBoardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/useAdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <EditHero />
    </>
  )
}

export default page
