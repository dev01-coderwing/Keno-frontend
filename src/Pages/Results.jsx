import React from 'react'
import Layout from '../Layout/Layout'
import ResultSection from '../Component/ResultSection/ResultSection'
import SubscriptionGuard from "../Component/SubscriptionGuard";

const Results = () => {
  return (
      <Layout>
      <SubscriptionGuard>
        <ResultSection />
      </SubscriptionGuard>
    </Layout>
  )
}

export default Results