'use client'
import React, { FC, useState, useEffect } from 'react'
import {
  HomeOutlined,
  ArrowForwardIos,
  ArrowBackIos,
  PeopleOutlined,
  ReceiptOutlined,
  BarChartOutlined,
  MapOutlined,
  Groups,
  OndemandVideo,
  VideoCall,
  Web,
  Quiz,
  Wysiwyg,
  ManageHistory,
  Settings,
  ExitToApp
} from './Icon'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Typography, Box, IconButton } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useSelector } from 'react-redux'
import avatarDefault from '../../../../public/assets/default-avatar.jpg'
import { useLogOutQuery } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'

type itemProps = {
  title: string
  to: string
  icon: JSX.Element
  selected: string
  setSelected: any
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Roboto">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  )
}

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth)
  const [logout, setLogout] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  })

  const logOutHandler = async () => {
    // setLogout(true)
    // // await signOut()
    // toast.promise(signOut(), {
    //   loading: 'Loging Out...',
    //   success: <b>Logout Successfully!</b>,
    //   error: <b>There are something wrong.</b>
    // })
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${
            theme === 'dark' ? '#111C43 !important' : '#fff !important'
          }`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
          opacity: 1
        },
        '& .pro-menu-item': {
          color: `${theme !== 'dark' && '#000'}`
        }
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: isCollapsed ? '0%' : '16%'
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <ArrowForwardIos className="text-black dark:text-[#ffffffc1]" />
              ) : undefined
            }
            style={{ margin: '10px 0 20px 0' }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Roboto dark:text-white text-black">
                    KnowLink
                  </h3>
                </Link>
                <IconButton>
                  <ArrowBackIos className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-admin"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '3px solid #5b6fe6'
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: '10px 0 0 0' }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Data'}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Content'}
            </Typography>
            <Item
              title="Create Courses"
              to="/admin/create-course"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Customization'}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Controllers'}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Analytics'}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analystics"
              to="/admin/orders-analytics"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analystics"
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1]"
            >
              {!isCollapsed && 'Extras'}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logOutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToApp />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default AdminSidebar
