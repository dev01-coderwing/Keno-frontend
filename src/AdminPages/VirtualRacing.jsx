import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import RacingSection from '../Admin/VirtualRacing/RacingSection'

const VirtualRacing = () => {
  return (
    <AdminLayout title={"Virtual Racing"}>
        <RacingSection />
    </AdminLayout>
  )
}

export default VirtualRacing