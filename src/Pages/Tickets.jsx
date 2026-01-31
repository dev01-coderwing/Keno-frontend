import React from "react";
import MyTickets from "../Component/My Tickets/MyTickets";
import Layout from "../Layout/Layout";
import SubscriptionGuard from "../Component/SubscriptionGuard";

const Tickets = () => {
  return (
    <div>
        <Layout>
          <SubscriptionGuard>
        <MyTickets />
        </SubscriptionGuard>
        </Layout>
    </div>
  );
};

export default Tickets;
