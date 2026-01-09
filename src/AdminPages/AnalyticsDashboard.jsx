import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import AdminAnalytics from '../Admin/AdminAnalytics/AdminAnalytics'

const AnalyticsDashboard = () => {
  return (
    <AdminLayout title={"Analytics"}>
        <AdminAnalytics />
    </AdminLayout>
  )
}

export default AnalyticsDashboard