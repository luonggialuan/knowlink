import { NextFunction, Request, Response } from 'express'
import { CatchAsyncError } from '../middleware/catchAsyncErrors'
import ErrorHandler from '../utils/ErrorHandler'
import cloudinary from 'cloudinary'
import { createCourse } from '../services/course.service'
import courseModel from '../models/course.model'
import { redis } from '../utils/redis'
import mongoose from 'mongoose'

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

      const course = await courseModel.findByIdAndUpdate(
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
        const course = await courseModel
          .findById(courseId)
          .select(
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
export const getAllCourses = CatchAsyncError(
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
        const courses = await courseModel
          .find()
          .select(
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

      const course = await courseModel.findById(courseId)

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
      const course = await courseModel.findById(courseId)

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
