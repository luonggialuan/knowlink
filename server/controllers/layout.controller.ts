import { NextFunction, Request, Response } from 'express'
import { CatchAsyncError } from '../middleware/catchAsyncErrors'
import ErrorHandler from '../utils/ErrorHandler'
import cloudianry from 'cloudinary'
import LayoutModel from '../models/layout.model'

// Create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body
      const isTypeExist = await LayoutModel.findOne({ type })

      if (isTypeExist)
        return next(new ErrorHandler(`${type} already existed`, 400))

      if (type === 'Banner') {
        const { image, title, subTitle } = req.body
        const myCloud = await cloudianry.v2.uploader.upload(image, {
          folder: 'layout'
        })
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          },
          title,
          subTitle
        }
        await LayoutModel.create(banner)
      }

      if (type === 'FAQ') {
        const { faq } = req.body
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer
            }
          })
        )
        await LayoutModel.create({ type: 'FAQ', faq: faqItems })
      }

      if (type === 'Categories') {
        const { categories } = req.body
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title
            }
          })
        )
        await LayoutModel.create({
          type: 'Categories',
          categories: categoriesItems
        })
      }

      res.status(200).json({
        success: true,
        message: 'Layout created successfully'
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
)
