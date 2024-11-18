type Props = {
  ownerId: string
  accountId: string
}

const FileUploader = ({ accountId, ownerId }: Props) => {
  return (
    <div>FileUploader: Acc - {accountId}, owner - {ownerId}</div>
  )
}

export default FileUploader