import React from 'react'
import AdminTable from './AdminTable';


const columns = [
  { header: 'Race Id', accessor: 'race' },
  { header: 'Type', accessor: 'type' },
  { header: 'Time', accessor: 'time' },
  { header: 'Numbers', accessor: 'number' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    race: "#20674",
    type: "Keno",
    time: "11:30 AM",
    number: "12-15-44-19",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Keno",
    time: "11:30 AM",
    number: "12-15-44-19",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Keno",
    time: "11:30 AM",
    number: "12-15-44-19",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Keno",
    time: "11:30 AM",
    number: "12-15-44-19",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Virtual Race",
    time: "11:30 AM",
    number: "3-7-5",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Virtual Race",
    time: "11:30 AM",
    number: "3-7-5",
    status: "Completed",
  },
  {
    race: "#20674",
    type: "Virtual Race",
    time: "11:30 AM",
    number: "3-7-5",
    status: "Completed",
  },
];

const RecentRaceTable = () => {
  return (
    <div>
              <AdminTable title="Recent Races" columns={columns} data={data}/>
        </div>
  )
}

export default RecentRaceTable