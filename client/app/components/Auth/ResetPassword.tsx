import React, { FC, useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { useFormik } from 'formik'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as Yup from 'yup'
import { useResetPasswordMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

type Props = {
  setRoute: (route: string) => void
  setOpen: (open: boolean) => void
}

const schema = Yup.object().shape({
  newPassword: Yup.string().required('Password is required').min(6).max(50),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password')
})

const ResetPassword: FC<Props> = ({ setOpen, setRoute }) => {
  const { token } = useSelector((state: any) => state.auth)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetPassword, { data, error, isSuccess }] = useResetPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Reset Password successfully!'
      toast.success(message)
      setRoute('Login')
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: async ({ newPassword }) => {
      const data = {
        activation_token: token,
        newPassword
      }
      setIsProcessing(true)
      await resetPassword(data)
      setIsProcessing(false)
    }
  })

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="w-full px-6 py-8 ">
        <div className="absolute top-0 right-0 m-4">
          {' '}
          <BiX
            className="cursor-pointer text-black dark:text-white"
            size={24}
            onClick={() => setOpen(false)}
          />
        </div>
        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Reset your password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Enter your Password
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.newPassword && touched.newPassword && 'border-red-500'
                } block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300
            `}
                type={!showPassword ? 'password' : 'text'}
                id="newPassword"
                name=""
                value={values.newPassword}
                onChange={handleChange}
                placeholder="Your Password"
              />
              {!showPassword ? (
                <AiOutlineEyeInvisible
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer dark:fill-white"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer dark:fill-white"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            {errors.newPassword && touched.newPassword && (
              <span className="text-red-500 pt-2 block">
                {errors.newPassword}
              </span>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Confirm your Password
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  'border-red-500'
                } block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300
            `}
                type={!showConfirmPassword ? 'password' : 'text'}
                id="confirmPassword"
                name=""
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your Password"
              />
              {!showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer dark:fill-white"
                  size={20}
                  onClick={() => setShowConfirmPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer dark:fill-white"
                  size={20}
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="text-red-500 pt-2 block">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide flex items-center justify-center text-white capitalize transition-colors duration-300 transform bg-gray-800 dark:bg-blue-800 rounded-lg hover:bg-gray-700 dark:hover:bg-blue-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {/* Processing... when submit form */}
              {isProcessing ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <span
            className="text-xs text-gray-500 uppercase dark:text-gray-400 cursor-pointer "
            onClick={() => setRoute('Login')}
          >
            or sign in
          </span>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
