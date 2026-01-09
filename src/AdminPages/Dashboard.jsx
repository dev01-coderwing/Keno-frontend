import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import DashboardSection from '../Admin/Dashboard/DashboardSection'

const Dashboard = () => {
  return (
    <AdminLayout title={"Dashboard"}>
        <DashboardSection />
    </AdminLayout>
  )
}

export default Dashboard