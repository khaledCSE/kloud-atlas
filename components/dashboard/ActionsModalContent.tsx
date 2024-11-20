import FormattedDateTime from '@/components/dashboard/FormattedDateTime'
import Thumbnail from '@/components/dashboard/Thumbnail'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import { Models } from 'node-appwrite'
import { Dispatch, SetStateAction } from "react"

type ShareInputProps = {
  file: Models.Document,
  onInputChange: Dispatch<SetStateAction<string[]>>,
  onRemove: (email: string) => Promise<void>
}

type DeleteConfirmationProps = {
  file: Models.Document
}

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return <div className='file-details-thumbnail'>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="subtitle-2 mb-1">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className='caption' />
    </div>
  </div>
}

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex">
    <div className="file-details-label text-left">{label}</div>
    <div className="file-details-value text-left">{value}</div>
  </div>
)

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className='space-y-4 px-2 pt-2'>
        <DetailRow label='Format:' value={file.extension} />
        <DetailRow label='Size:' value={convertFileSize(file.size)} />
        <DetailRow label='Owner:' value={file.owner.fullName} />
        <DetailRow label='Last Modified:' value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  )
}

export const ShareInput = ({ file, onInputChange, onRemove }: ShareInputProps) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">Share file with others</p>
        <Input
          type='email'
          placeholder='Enter email address'
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className='share-input-field border-none'
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">{file.users.length} Users</p>
          </div>
        </div>

        <ul className="pt-2">
          {file.users.map((email: string) => (
            <li
              key={email}
              className="flex items-center justify-between gap-2"
            >
              <p className="subtitle-2">{email}</p>
              <Button
                onClick={() => onRemove(email)}
                className="share-remove-user"
              >
                <Image
                  src='/assets/icons/close-dark.svg'
                  alt='close'
                  className='remove-icon'
                  width={24}
                  height={24}
                />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const DeleteConfirmation = ({ file }: DeleteConfirmationProps) => (
  <p className="delete-confirmation">
    This action cannot be reverted. Are you sure you want to delete{` `}
    <span className='delete-file-name'>{file.name}</span>?
  </p>
)