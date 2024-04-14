import React, { useState } from 'react'
import DashBoardHeader from './DashBoardHeader'
import DashboardWidgets from './Widgets/DashboardWidgets'

type Props = {
  isDashboard?: boolean
}

function DashBoardHero({ isDashboard }: Props) {
  const [open, setOpen] = useState(false)
  return <>{isDashboard && <DashboardWidgets open={open} />}</>
}

export default DashBoardHero
