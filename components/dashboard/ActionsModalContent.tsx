import FormattedDateTime from '@/components/dashboard/FormattedDateTime'
import Thumbnail from '@/components/dashboard/Thumbnail'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import { Models } from 'node-appwrite'

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
