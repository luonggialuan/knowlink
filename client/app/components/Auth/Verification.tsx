import React, { FC, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'

type Props = {
  setRoute: (route: string) => void
}

type VerifyNumber = {
  '0': string
  '1': string
  '2': string
  '3': string
}

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: '',
    1: '',
    2: '',
    3: ''
  })

  const verificationHandler = async () => {
    setInvalidError(true)
  }

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false)
    const newVerifyNumber = { ...verifyNumber, [index]: value }
    setVerifyNumber(newVerifyNumber)

    if (value === '' && index > 0) {
      inputRefs[index - 1].current?.focus()
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="w-full px-6 py-8 ">
        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Verify Your Account
        </p>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
            <VscWorkspaceTrusted size={40} fill="white" />
          </div>
        </div>
        <br />
        <br />
        <div className="m-auto flex items-center justify-around">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              ref={inputRefs[index]}
              className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center justify-center text-black dark:text-white text-[18px] font-Roboto outline-none text-center ${
                invalidError
                  ? 'shake border-red-500'
                  : 'dark:border-white border-[#0000004a]'
              }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <br />
        <div className="mt-6">
          <button
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            onClick={verificationHandler}
          >
            Verify OTP
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Roboto text-[14px] text-black dark:text-white">
          Go back to sign in?{' '}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute('Login')}
          >
            Sign in
          </span>
        </h5>
      </div>
    </div>
  )
}

export default Verification
