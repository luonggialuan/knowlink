'use client'
import DashBoardHero from '@/app/components/Admin/DashBoardHero'
import AllUsers from '@/app/components/Admin/User/AllUsers'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/useAdminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <AllUsers isTeam={false} />
    </>
  )
}

export default page
