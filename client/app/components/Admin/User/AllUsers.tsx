'use client'
import { Box, Button, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { format } from 'timeago.js'
import Loader from '../../Loader/Loader'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation
} from '@/redux/features/user/userApi'
import { MdOutlineEmail } from 'react-icons/md'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'
import { RiErrorWarningLine } from 'react-icons/ri'
type Props = {
  isTeam: boolean
}

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme()
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('admin')
  const { isLoading, data, error } = useGetAllUsersQuery({})
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation()
  const [
    updateUserRole,
    { isSuccess, error: updateError, isLoading: isLoadingUpdate }
  ] = useUpdateUserRoleMutation()

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
            <Button
              onClick={() => {
                setOpen(!open)
                setUserId(params.row.id)
                console.log(userId)
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

  const handleSubmit = async () => {
    if (!isLoadingUpdate) {
      await updateUserRole({ email, role })
    }
  }

  const handleDelete = async () => {
    const id = userId
    await deleteUser(id)
  }

  useEffect(() => {
    if (updateError) {
      if ('data' in updateError) {
        const errorMessage = updateError as any
        toast.error(errorMessage.data.message)
      }
    }

    if (deleteError) {
      if ('data' in deleteError) {
        const errorMessage = deleteError as any
        toast.error(errorMessage.data.message)
      }
    }

    if (isSuccess) {
      toast.success('User role updated successfully!')
      setActive(false)
      window.location.reload()
    }

    if (deleteSuccess) {
      toast.success('Deleted user successfully!')
      setOpen(false)
      window.location.reload()
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError])

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
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Email User
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input_modal}`}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-200">
                    Change Role User to
                  </label>
                  <select
                    name=""
                    id=""
                    className={`${styles.input_modal} !mt-2`}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
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
                  Are you sure you want to delete this user?
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

export default AllUsers
