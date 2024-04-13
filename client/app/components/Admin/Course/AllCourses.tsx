'use client'
import {
  useDeleteCourseMutation,
  useGetCoursesQuery
} from '@/redux/features/courses/coursesApi'
import { Box, Button, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
import { RiErrorWarningLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import Link from 'next/link'
type Props = {}

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [courseId, setCourseId] = useState('')

  const { isLoading, data, refetch } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation()

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'title', headerName: 'Course Title', flex: 1 },
    { field: 'ratings', headerName: 'Ratings', flex: 0.3 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.3 },
    { field: 'created_at', headerName: 'Created At', flex: 0.3 },
    {
      field: '  ',
      headerName: 'Edit',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center justify-center h-full">
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FaRegEdit className="dark:text-white text-black" size={20} />
            </Link>
          </div>
        )
      }
    },
    {
      field: '',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open)
                setCourseId(params.row.id)
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        )
      }
    }
  ]

  const rows: any[] = []

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt)
        })
      })
  }

  const handleDelete = async () => {
    const id = courseId
    await deleteCourse(id)
  }

  useEffect(() => {
    if (deleteError) {
      if ('data' in deleteError) {
        const errorMessage = deleteError as any
        toast.error(errorMessage.data.message)
      }
    }

    if (deleteSuccess) {
      refetch()
      toast.success('Deleted course successfully!')
      setOpen(false)
    }
  }, [deleteSuccess, deleteError, refetch])

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 10px 0"
            height="80vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none'
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30!important'
                    : '1px solid #ccc!important'
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor:
                  theme === 'dark'
                    ? '#3e4396 !important'
                    : '#99c4ff !important',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000'
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1f2a40' : '#fff'
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor:
                  theme === 'dark' ? '#3e4396 !important' : '#99c4ff !important'
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? `#b7ebde !important` : `#000 !important`
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `#fff !important`
              },
              '& .MuiButtonBase-root': {
                color: theme === 'dark' ? '#fff !important' : '#000 !important'
              }
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 outline-none">
                <RiErrorWarningLine className="w-20 h-20 text-red-600 mx-auto" />
                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Are you sure you want to delete this course?
                </p>
                <div className="flex items-center justify-center h-[100px]">
                  <button
                    onClick={handleDelete}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                  >
                    Yes, I am sure
                  </button>
                  <button
                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                    data-modal-toggle="delete-user-modal"
                    onClick={() => setOpen(false)}
                  >
                    No, cancel
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  )
}

export default AllCourses
