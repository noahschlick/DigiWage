import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import {SubmitHandler, useForm} from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'
import { useRecoilState } from 'recoil'
import { postIdState } from '../../atoms/postAtom'

type FormData = {
  comment: String
}

function PostPage() {
    const [postId, setPostId] = useRecoilState(postIdState)
    const router = useRouter()
    const { data: session } = useSession()
    const [addComment] = useMutation(ADD_COMMENT, {
      refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
    })

    console.log("This is the post ID", postId)

    const { data } = useQuery(GET_POST_BY_POST_ID,{
        variables: {
            //post_id: router.query.postId,
            post_id: postId
        },
    })

    console.log("Router number is: ", router.query.postId)
    console.log("Data is: ", data)
    
    const post: Post = data?.getPostListByPostId
    

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
      // Post comment here
      const notification = toast.loading("Post your comment...")
      await addComment({
        variables: {
          post_id: router.query.postId,
          username: session?.user?.name,
          text: data.comment,

        }
      })

      console.log(post)

      setValue('comment', '')
      toast.dismiss(notification)
      toast.success('Comment Sicsessfully Posted!', {
        id: notification,
      })
    }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300
      bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span>{session?.user?.name}</span>
        </p>

        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2">
          <textarea
            {...register('comment')}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 
            pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please login to comment"
            }
          />

        <button 
          disabled={!session}
          type="submit" 
          className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
        >
          Comment
        </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300
            bg-white py-5 px-10">
        
        {post?.comments?.map((comment) => (
          <div
            className="relative flex items-center space-x-2 space-y-5"
            key={comment.id}
          >
            <hr className="absolute top-10 left-7 z-0 h-16 border"/>
            <div className="z-50">
              <Avatar />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600"> {comment.username} </span> {' '}
                <TimeAgo date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
