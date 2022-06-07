import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POST_BY_TOPIC } from '../graphql/queries'
import Post from './Post';

type Props = {
  topic?: string
}

function Feed({topic}: Props) {
  const {data, error} = !topic 
    ? useQuery(GET_ALL_POSTS) 
    : useQuery(GET_ALL_POST_BY_TOPIC, {
      variables: {
        topic: topic,
      },
    })
  console.log(error)
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic
  console.log("This is data", data)

  return (
    <div className="mt-5 space-y-4 w-full">
      
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
