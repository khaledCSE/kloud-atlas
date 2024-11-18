import { cn, getFileIcon } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
  type: string,
  extension: string
  url?: string,
  imageClassName?: string,
  className?: string
}

const Thumbnail = ({ type, url, extension, className, imageClassName }: Props) => {
  const isImage = type === 'image' && extension !== 'svg'
  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? String(url) : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
      />
    </figure>
  )
}

export default Thumbnail