'use client'
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher'
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation
} from '@/redux/features/notifications/notificationsApi'
import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import socketIO from 'socket.io-client'
import { format } from 'timeago.js'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ''
const socketId = socketIO('http://localhost:8000/', {
  transports: ['websocket']
})

type Props = {}

const DashBoardHeader = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation()
  const [notifications, setNotifications] = useState<any>([])
  const [audio] = useState(
    new Audio(
      'https://res.cloudinary.com/dnqbpwz2p/video/upload/v1713551016/vwwcndqfokia1ctxpyze.mp3'
    )
  )
  const playNotificationSound = () => {
    audio.play()
  }

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === 'unread')
      )
    }

    if (isSuccess) refetch()
    audio.load()
  }, [data, isSuccess])

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch()
      playNotificationSound()
    })
  }, [])

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id)
  }

  return (
    <div className="w-full flex items-center justify-end p-6 top-5 right-0 fixed">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        {notifications && notifications.length != 0 && (
          <span className="absolute -top-2 -right-2 bg-indigo-600 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications && notifications.length}
          </span>
        )}
      </div>
      {open && (
        <div
          className={`w-[70%] sm:w-[300px] md:w-[350px] h-[50vh] dark:bg-gray-900 bg-white shadow-xl absolute top-16 z-100 rounded transition-opacity duration-300 transform ${
            open ? '' : 'scale-y-0 opacity-0'
          } origin-top-right`}
        >
          <h5 className="text-center text-[20px] font-Roboto text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                key={index}
                className="dark:bg-gray-800 bg-gray-100 font-Roboto border-b dark:border-b-gray-700 border-b-gray-200 my-2 px-2"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-blue-400 dark:text-blue-300 cursor-pointer text-[14px] transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-500"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="px-2 text-slate-600 dark:text-slate-400 text-[12px]">
                  {format(item?.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default DashBoardHeader
