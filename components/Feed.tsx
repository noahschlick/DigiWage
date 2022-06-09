import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POST_BY_TOPIC } from '../graphql/queries'
import Post from './Post';

/**
 * Renders the post on the main page and on the subreddit page.
 * If there is a sunreddit topic, then the subreddit post 
 * will be rendered. If there is no topic, then all of the post 
 * will be rendered.
 */

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
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic

  return (
    <div className="mt-5 space-y-4 w-full">
      
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
