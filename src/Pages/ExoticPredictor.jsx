import React from 'react'
import Layout from '../Layout/Layout'
import Predictor from '../Component/ExoticPredictor/Predictor'
import SubscriptionGuard from "../Component/SubscriptionGuard";

const ExoticPredictor = () => {
  return (
    <Layout>
      <SubscriptionGuard>
    <Predictor /> 
    </SubscriptionGuard> 
    </Layout>
  )
}

export default ExoticPredictor