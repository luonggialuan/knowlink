import { styles } from '@/app/styles/style'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi'
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ''
const socketId = socketIO('http://localhost:8000/', {
  transports: ['websocket']
})

type Props = {
  setOpen: any
  data: any
  user: any
}

const CheckOutForm: FC<Props> = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<any>('')
  const [createOrder, { data: orderData, isSuccess, error }] =
    useCreateOrderMutation()
  const [loadUser, setLoadUser] = useState(false)
  const {} = useLoadUserQuery({ skip: loadUser ? false : true })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    if (error) {
      setMessage(error.message)
      setIsLoading(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false)
      createOrder({ courseId: data._id, payment_info: paymentIntent })
      // setOpen(false)
    }
  }

  useEffect(() => {
    if (orderData) {
      setLoadUser(true)
      socketId.emit('notification', {
        title: 'New Order',
        message: `You have a new order from ${data.name}`,
        userId: user._id
      })
      redirect(`/course/access/${data._id}`)
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }
  }, [orderData, error])

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <div className="flex justify-center">
        <button
          className={`${styles.button} rounded-full`}
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
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
                Paying...
              </>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div className="text-[red] font-Roboto pt-2">{message}</div>}
    </form>
  )
}

export default CheckOutForm
