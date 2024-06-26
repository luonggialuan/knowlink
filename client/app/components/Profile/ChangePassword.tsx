import { styles } from '@/app/styles/style'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

type Props = {}

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Password do not match')
    } else {
      await updatePassword({ oldPassword, newPassword })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password changed successfully!')
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="text-gray-800 dark:text-[#fff] block text-[25px] 800px:text-[30px] font-Roboto text-center font-[500] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%]">
            <label className="block pb-1 pt-4 text-black dark:text-white">
              Enter your old password
            </label>
            <input
              type="password"
              className="w-full py-2 px-4 rounded-md border border-indigo-500 bg-transparent text-gray-800 dark:text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500  mb-4 800px:mb-0"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%]">
            <label className="block pb-1 pt-4 text-black dark:text-white">
              Enter your new password
            </label>
            <input
              type="password"
              className="w-full py-2 px-4 rounded-md border border-indigo-500 bg-transparent text-gray-800 dark:text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500  mb-4 800px:mb-0"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%]">
            <label className="block pb-1 pt-4 text-black dark:text-white">
              Enter your confirm password
            </label>
            <input
              type="password"
              className="w-full py-2 px-4 rounded-md border border-indigo-500 bg-transparent text-gray-800 dark:text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500  mb-4 800px:mb-0"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              required
              value="Update"
              className={`${styles.button}`}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
