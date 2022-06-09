import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'

/**
 * 
 * @param param 
 *  Takes in the seed for the photo icon and wether the image 
 *  should be large or not.
 * @returns 
 *  Return the html display of the avatar. Uses DiceBear Avatars 
 *  for the design of the avatars which are randomly generated from 
 *  a seeed.
 */

type Props = {
  seed?: string
  large?: boolean
}

function Avatar({ seed, large }: Props ) {
  const { data: session } = useSession();
  return (
    <div 
      className={`overflow-hidden relative h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || 'placeholder'
        }.svg`}
      />
    </div>
  )
}

export default Avatar
