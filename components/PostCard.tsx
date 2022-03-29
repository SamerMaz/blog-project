import React from 'react'

type Props = {
  post: any
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.except}
    </div>
  )
}

export default PostCard
