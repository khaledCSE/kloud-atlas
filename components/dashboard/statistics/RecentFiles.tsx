import ActionsDropdown from "@/components/dashboard/ActionsDropdown"
import FormattedDateTime from "@/components/dashboard/FormattedDateTime"
import Thumbnail from "@/components/dashboard/Thumbnail"
import Link from "next/link"
import { Models } from "node-appwrite"

type Props = {
  files: Models.DocumentList<Models.Document>
}

const RecentFiles = ({ files }: Props) => {
  return (
    <section className="dashboard-recent-files flex-1">
      <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
      {files.documents.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-5">
          {files.documents.map((file: Models.Document) => (
            <Link
              href={file.url}
              target="_blank"
              className="flex items-center gap-3"
              key={file.$id}
            >
              <Thumbnail
                type={file.type}
                extension={file.extension}
                url={file.url}
              />

              <div className="recent-file-details">
                <div className="flex flex-col gap-1">
                  <p className="recent-file-name">{file.name}</p>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption"
                  />
                </div>
                <ActionsDropdown file={file} />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </section>
  )
}

export default RecentFiles