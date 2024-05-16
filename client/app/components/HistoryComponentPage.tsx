'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { MdDashboard } from 'react-icons/md'
import HistoryComponent from '../components/HistoryComponent'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Props = {
  games: any
}

const HistoryComponentPage = ({ games }: Props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(2)
  const [route, setRoute] = useState('Login')
  return (
    <main>
      <Protected>
        <Heading
          title={`History | Quizzzy - KnowLink`}
          description="KnowLink is a platform for student to learn and get help from teachers"
          keywords="Math, English, Physics, Chemistry, Geography, History, Biology"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="flex inset-0 items-center justify-center self-center w-full mt-20">
          <div className="w-[400px]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">History</CardTitle>
                  <Link className={buttonVariants()} href="/quizzzy">
                    <MdDashboard className="mr-2" />
                    Back to Dashboard
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="max-h-[60vh] overflow-scroll">
                <HistoryComponent games={games} />
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </Protected>
    </main>
  )
}

export default HistoryComponentPage
