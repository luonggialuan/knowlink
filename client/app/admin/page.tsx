'use client'
import React, { useState } from 'react'
import AdminProtected from '../hooks/useAdminProtected'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashBoardHero from '../components/Admin/DashBoardHero'

type Props = {}

function page({}: Props) {
  return (
    <>
      <AdminProtected>
        <Heading
          title="KnowLink - Admin"
          description="KnowLink is a platform for student to learn and get help from teachers"
          keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
          </div>
        </div>
      </AdminProtected>
    </>
  )
}

export default page
