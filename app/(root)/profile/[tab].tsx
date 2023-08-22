import React from "react"
import axios from "axios"

import DesignList from "../../components/DesignList"
import { shotData } from "../../types/shotType"
import Layout from "./Layout"

const tab = ({ shots }: { shots: shotData[] }) => {
  return (
    <Layout>
      {shots.length > 0 ? (
        <DesignList shots={shots} />
      ) : (
        <p className="text-center text-gray">Nothing to show!</p>
      )}
    </Layout>
  )
}

export default tab

export async function getServerSideProps(context: any) {
  let result = { shots: [] }

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/vendor/${context.params.tab}`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    )
    if (data?.data) {
      result.shots = data.data
    }
  } catch (error) {}

  return {
    props: result,
  }
}
