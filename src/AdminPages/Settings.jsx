import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import SettingSection from '../Admin/Settings/SettingSection'

const Settings = () => {
  return (
    <AdminLayout title={"Settings"}>
        <SettingSection />
    </AdminLayout>
  )
}

export default Settings