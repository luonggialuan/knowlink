import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import avatarDefault from '../../../public/assets/default-avatar.jpg'
import { AiOutlineCamera, AiOutlineLoading } from 'react-icons/ai'
import {
  useEditProfileMutation,
  useUpdateAvatarMutation
} from '@/redux/features/user/userApi'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import toast from 'react-hot-toast'

type Props = {
  avatar: string | null
  user: any
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name)
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation()
  const [loadUser, setLoadUser] = useState(false)
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [loadingName, setLoadingName] = useState(false)
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true })

  const imageHandler = async (e: any) => {
    const file = e.target.files[0]

    if (!file || file.type.indexOf('image/') !== 0) {
      toast.error('Please choose a valid image file.')
      return
    }

    // Check max size of Image
    const maxSizeInBytes = 5e6
    if (file.size > maxSizeInBytes) {
      toast.error('File size is too large. Please choose a smaller file.')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Please choose a valid image file.')
      return
    }

    // Check file extension
    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!acceptedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please choose a valid image file.')
      return
    }

    setLoadingAvatar(true)
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatarDataURL = fileReader.result as string
        updateAvatar({
          avatar: avatarDataURL
        })
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoadingName(true)
    if (name !== '' || name !== user?.name) {
      await editProfile({
        name: name
      })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true)
      setLoadingAvatar(false)
    }

    if (success) {
      setLoadUser(true)
      toast.success('Update your full name successfully!')
      setLoadingName(false)
    }

    if (error) {
      toast.error('Fail to upload avatar')
    }
  }, [isSuccess, error, success, updateError])

  return (
    <>
      <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
        <div className="w-full flex justify-center">
          <div className="relative">
            <Image
              src={
                user.avatar || avatar
                  ? user.avatar.url || avatar
                  : avatarDefault
              }
              alt=""
              width={120}
              height={120}
              className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#4f46e5] rounded-full"
            />
            {loadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="spinner"></div>
              </div>
            )}
            <input
              type="file"
              name=""
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={20} className="z-10" fill="white" />
              </div>
            </label>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full ">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-[100%] 800px:w-[60%]">
              <div className="w-[100%]">
                <label className="block pb-2 text-black dark:text-white">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full py-2 px-4 rounded-md border-[2px] border-indigo-500 bg-transparent  text-gray-800 dark:text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500  mb-4 800px:mb-0"
                    required
                    value={name}
                    style={{
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {loadingName && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AiOutlineLoading className="animate-spin text-gray-500" />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[100%]">
                <label className="block pb-2 pt-4 text-black dark:text-white">
                  Email Address
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-md border-[2px] border-indigo-500 bg-transparent text-gray-800 dark:text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500  mb-4 800px:mb-0"
                  required
                  readOnly
                  value={user?.email}
                  style={{
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                  }}
                />
              </div>
              <input
                type="submit"
                required
                value="Update"
                className="w-full 800px:w-[250px] h-[40px] border border-indigo-500 dark:border-indigo-300 text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-700 dark:hover:text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileInfo
