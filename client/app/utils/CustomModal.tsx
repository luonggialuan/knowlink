import React, { FC } from 'react'
import { Box, Modal } from '@mui/material'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem: any
  component: any
  setRoute?: (route: string) => void
  refetch?: any
}

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </Box>
    </Modal>
  )
}

export default CustomModal
