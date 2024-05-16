import React, { useState } from 'react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from '@/schemas/forms/quiz'
import { LuCopyCheck, LuBookOpen } from 'react-icons/lu'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import LoadingQuestions from '../components/Loader/LoadingQuestions'
import Link from 'next/link'
import { MdDashboard } from 'react-icons/md'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'

type Props = {
  topic: string
}

type Input = z.infer<typeof quizCreationSchema>

const QuizCreation = ({ topic: topicParam }: Props) => {
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(false)
  const [finishedLoading, setFinishedLoading] = useState(false)
  const { toast } = useToast()
  const { data: userData } = useLoadUserQuery({})
  const userId = userData.user._id
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type, userId }: Input) => {
      const response = await axios.post('/api/game', {
        amount,
        topic,
        type,
        userId
      })
      return response.data
    }
  })

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: topicParam,
      type: 'mcq',
      amount: 3,
      userId: userId
    }
  })

  // const onSubmit = (data: Input) => {
  //   alert(JSON.stringify(data, null, 2))
  // }

  const onSubmit = async (data: Input) => {
    setShowLoader(true)
    getQuestions(data, {
      onError: (error) => {
        setShowLoader(false)
        if (error instanceof AxiosError) {
          if (error.response?.status == 500) {
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again later.',
              variant: 'destructive'
            })
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {
        setFinishedLoading(true)
        setTimeout(() => {
          if (form.getValues('type') === 'mcq') {
            router.push(`/play/mcq/${gameId}`)
          } else if (form.getValues('type') === 'open_ended') {
            router.push(`/play/open-ended/${gameId}`)
          }
        }, 2000)
      }
    })
  }
  form.watch()

  return (
    <div className="w-full flex inset-0 items-center justify-center self-center mt-20 font-Roboto">
      {showLoader ? (
        <LoadingQuestions finished={finishedLoading} />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Quiz Creation
              </CardTitle>
              <Link className={buttonVariants()} href="/quizzzy">
                <MdDashboard className="mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <CardDescription>Choose a topic</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a topic" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide any topic you would like to be quizzed on
                        here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="How many questions?"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            form.setValue('amount', parseInt(e.target.value))
                          }}
                          min={1}
                          max={10}
                        />
                      </FormControl>
                      <FormDescription>
                        You can choose how many questions you would like to be
                        quizzed on here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    variant={
                      form.getValues('type') === 'mcq' ? 'default' : 'secondary'
                    }
                    className="w-1/2 rounded-none rounded-l-lg"
                    onClick={() => {
                      form.setValue('type', 'mcq')
                    }}
                    type="button"
                  >
                    <LuCopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                  </Button>
                  <Separator orientation="vertical" />
                  <Button
                    variant={
                      form.getValues('type') === 'open_ended'
                        ? 'default'
                        : 'secondary'
                    }
                    className="w-1/2 rounded-none rounded-r-lg"
                    onClick={() => form.setValue('type', 'open_ended')}
                    type="button"
                  >
                    <LuBookOpen className="w-4 h-4 mr-2" /> Open Ended
                  </Button>
                </div>
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QuizCreation
