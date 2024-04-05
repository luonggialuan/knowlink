'use client'
import { useGetCoursesQuery } from '@/redux/features/courses/coursesApi'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
type Props = {}

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme()

  const { isLoading, data, error } = useGetCoursesQuery({})

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
          <>
            <Button>
              <FaRegEdit className="dark:text-white text-black" size={20} />
            </Button>
          </>
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
            <Button>
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
                backgroundColor: theme === 'dark' ? '#1f2a40' : '#f2f0f0'
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
        </Box>
      )}
    </div>
  )
}

export default AllCourses
