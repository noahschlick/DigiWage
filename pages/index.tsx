import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>reddit-clone</title>
      </Head>

      {/* PostBox */}
      <PostBox/>

      <div className="flex">
        {/* Feed */}
      </div>
      
    </div>
  )
}

export default Home
