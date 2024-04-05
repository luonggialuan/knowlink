'use client'
import { Box, Button, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { format } from 'timeago.js'
import Loader from '../../Loader/Loader'
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation
} from '@/redux/features/user/userApi'
import { MdOutlineEmail } from 'react-icons/md'
import { styles } from '@/app/styles/style'
type Props = {
  isTeam: boolean
}

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme()
  const [active, setActive] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('admin')

  const { isLoading, data, error } = useGetAllUsersQuery({})
  const [updateUserRole, { isSuccess, error: updateError }] =
    useUpdateUserRoleMutation()

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.7 },
    { field: 'role', headerName: 'Role', flex: 0.2 },
    { field: 'courses', headerName: 'Purchased Courses', flex: 0.3 },
    { field: 'created_at', headerName: 'Joined At', flex: 0.3 },
    {
      field: '  ',
      headerName: 'Email',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center justify-center h-full">
            <a href={`mailto:${params.row.email}`}>
              <MdOutlineEmail
                className="dark:text-white text-black"
                size={20}
              />
            </a>
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

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === 'admin')

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt)
        })
      })
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt)
        })
      })
  }

  const handleSubmit = () => {}

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <button
                className={`${styles.button} !w-[200px] !mt-0 !mb-0`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}

          <Box
            m="40px 0 0 0"
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
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 outline-none">
                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Add New Member
                </p>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input_modal}`}
                  />
                </div>
                <select name="" id="" className={`${styles.input_modal} !mt-6`}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <br />
                <div className="flex items-center justify-center">
                  <button
                    className={`${styles.buttno_modal}`}
                    onClick={handleSubmit}
                  >
                    Submit
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

export default AllUsers
