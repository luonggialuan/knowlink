import { NextFunction, Request, Response } from 'express'
import { CatchAsyncError } from '../middleware/catchAsyncErrors'
import ErrorHandler from '../utils/ErrorHandler'
import cloudinary from 'cloudinary'
import { createCourse, getAllCoursesService } from '../services/course.service'
import CourseModel from '../models/course.model'
import { redis } from '../utils/redis'
import mongoose from 'mongoose'
import path from 'path'
import ejs from 'ejs'
import sendMail from '../utils/sendMail'
import NotificationModel from '../models/notification.model'

// Upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const thumbnail = data.thumbnail

      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: 'courses'
        })

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url
        }
      }
      createCourse(data, res, next)
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

//  Edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const thumbnail = data.thumbnail

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id)

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: 'courses'
        })

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url
        }
      }

      const courseId = req.params.id

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data
        },
        {
          new: true
        }
      )

      res.status(201).json({
        success: true,
        course
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Get single course - Without purchasing
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id

      const isCacheExist = await redis.get(courseId)

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist)

        res.status(200).json({
          success: true,
          course
        })
      } else {
        const course = await CourseModel.findById(courseId).select(
          '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
        )

        await redis.set(courseId, JSON.stringify(course))

        res.status(200).json({
          success: true,
          course
        })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Get all courses - Without purchasing
export const getCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get('allCourses')
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist)

        res.status(200).json({
          success: true,
          courses
        })
      } else {
        const courses = await CourseModel.find().select(
          '-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links'
        )

        await redis.set('allCourses', JSON.stringify(courses))

        res.status(200).json({
          success: true,
          courses
        })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Get course content - Only for valid user
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses
      const courseId = req.params.id

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      )

      if (!courseExists) {
        return next(
          new ErrorHandler('You are not eligible to access this course', 404)
        )
      }

      const course = await CourseModel.findById(courseId)

      const content = course?.courseData

      res.status(200).json({
        success: true,
        content
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Add question in course
interface IAddQuestionData {
  question: string
  courseId: string
  contentId: string
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body
      const course = await CourseModel.findById(courseId)

      if (!mongoose.Types.ObjectId.isValid(contentId))
        return next(new ErrorHandler('Invalid content id', 400))

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      )

      if (!courseContent)
        return next(new ErrorHandler('Invalid content id', 400))

      // Create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: []
      }

      // Add this question to our course content
      courseContent.questions.push(newQuestion)

      await NotificationModel.create({
        user: req.user?._id,
        title: 'New Question Recieved',
        message: `You have a new question in ${courseContent?.title}`
      })

      // Save the updated course
      await course?.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Add answer in course question
interface IAddAnswerData {
  answer: string
  courseId: string
  contentId: string
  questionId: string
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body
      const course = await CourseModel.findById(courseId)

      if (!mongoose.Types.ObjectId.isValid(contentId))
        return next(new ErrorHandler('Invalid content id', 400))

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      )

      if (!courseContent)
        return next(new ErrorHandler('Invalid content id', 400))

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      )

      if (!question) return next(new ErrorHandler('Invalid question id', 400))

      // Create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer
      }

      // Add this answer to our course content
      question.questionReplies.push(newAnswer)

      await course?.save()

      if (req.user?._id === question.user._id) {
        // Create a notification
        await NotificationModel.create({
          user: req.user?._id,
          title: 'New Question Reply Recieved',
          message: `You have a new question reply in ${courseContent?.title}`
        })
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title
        }

        const html = await ejs.renderFile(
          path.join(__dirname, '../mails/question-reply.ejs'),
          data
        )

        try {
          await sendMail({
            email: question.user.email,
            subject: 'Question Reply',
            template: 'question-reply.ejs',
            data
          })
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500))
        }
      }

      res.status(200).json({
        success: true,
        course
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Add review in course
interface IAddReviewData {
  review: string
  rating: string
  userId: string
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses

      const courseId = req.params.id

      // Check if courseId already exists in userCourseList basedon _id
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      )

      if (!courseExists)
        return next(
          new ErrorHandler('You are not eligible to access this course', 400)
        )

      const course = await CourseModel.findById(courseId)

      const { review, rating } = req.body as IAddReviewData

      const reviewData: any = {
        user: req.user,
        rating,
        comment: review
      }

      course?.reviews.push(reviewData)

      let avg = 0

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating
      })

      if (course) course.ratings = avg / course.reviews.length

      await course?.save()

      const notification = {
        title: 'New Review Recieved',
        message: `${req.user?.name} has given a review in ${course?.name}`
      }

      // Create notification

      res.status(200).json({
        success: true,
        course
      })

      course?.reviews.push(reviewData)
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Add reply in review
interface IAddReviewData {
  comment: string
  courseId: string
  reviewId: string
}

export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData

      const course = await CourseModel.findById(courseId)

      if (!course) return next(new ErrorHandler('Course not found', 404))

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      )

      if (!review) return next(new ErrorHandler('Review not found', 404))

      const replyData: any = {
        user: req.user,
        comment
      }

      if (!review.commentReplies) {
        review.commentReplies = []
      }

      review.commentReplies?.push(replyData)

      await course?.save()

      res.status(200).json({
        success: true,
        course
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)

// Get all courses - Only for admin
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res)
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400))
    }
  }
)
