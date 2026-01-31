import React from 'react'
import AnalyticsSection from '../Component/AnalyticsSection/AnalyticsSection'
import Layout from '../Layout/Layout'
import SubscriptionGuard from "../Component/SubscriptionGuard";

const Analytics = () => {
  return (
    <Layout>
      <SubscriptionGuard>
        <AnalyticsSection />
      </SubscriptionGuard>
    </Layout>
  )
}

export default Analytics