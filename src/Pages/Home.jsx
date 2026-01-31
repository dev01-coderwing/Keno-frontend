import React from 'react'
import HomeSection from '../Component/HomeSection/HomeSection'
import Layout from '../Layout/Layout'
import SubscriptionGuard from "../Component/SubscriptionGuard";

const Home = () => {
  return (
       <Layout>
        <SubscriptionGuard>
        <HomeSection />
        </SubscriptionGuard>
    </Layout>
  )
}

export default Home