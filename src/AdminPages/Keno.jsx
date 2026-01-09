import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import KenoSection from '../Admin/AdminKeno/KenoSection'

const Keno = () => {
  return (
    <AdminLayout title={"Keno"}>
        <KenoSection />
    </AdminLayout>
  )
}

export default Keno