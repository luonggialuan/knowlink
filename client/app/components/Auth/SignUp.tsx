import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub
} from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BiX } from 'react-icons/bi'
import { useRegisterMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'

type Props = {
  setOpen: (open: boolean) => void
  setRoute: (route: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name!').max(20),
  email: Yup.string()
    .email('Invalid email!')
    .required('Please enter your email!')
    .max(50),
  password: Yup.string().required('Please enter your password!').min(6).max(50),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
})

const SignUp: FC<Props> = ({ setOpen, setRoute }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [register, { data, error, isSuccess }] = useRegisterMutation()

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration successfully!'
      toast.success(message)
      setRoute('Verification')
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password
      }
      setIsProcessing(true)
      await register(data)
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
            className="cursor-pointer"
            size={24}
            onClick={() => setOpen(false)}
          />
        </div>
        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Join in KnowLink
        </p>

        <a
          href="#"
          className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign up with Google
          </span>
        </a>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up with email
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Enter your Name
            </label>
            <input
              className={`${
                errors.name && touched.name && 'border-red-500'
              } block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300
            `}
              type="name"
              id="name"
              name=""
              placeholder="Loginmail@gmail.com"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Enter your Email
            </label>
            <input
              className={`${
                errors.email && touched.email && 'border-red-500'
              } block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300
            `}
              type="email"
              id="email"
              name=""
              placeholder="Loginmail@gmail.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Enter your Password
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.password && touched.password && 'border-red-500'
                } block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300
            `}
                type={!showPassword ? 'password' : 'text'}
                id="password"
                name=""
                value={values.password}
                onChange={handleChange}
                placeholder="Your password"
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
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
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
                'Sign Up'
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

export default SignUp
