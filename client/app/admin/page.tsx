'use client'
import React, { useState } from 'react'
import AdminProtected from '../hooks/useAdminProtected'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar'
import DashBoardHero from '../components/Admin/DashBoardHero'

type Props = {}

function page({}: Props) {
  return <div>Admin</div>
}

export default page
