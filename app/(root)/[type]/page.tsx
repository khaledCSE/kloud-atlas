import Card from '@/components/dashboard/Card'
import Sort from '@/components/dashboard/Sort'
import { getFiles } from '@/lib/actions/file.actions'
import { convertFileSize, getFileTypesParams } from '@/lib/utils'
import { FileType, SearchParamProps } from '@/types'
import { Models } from 'node-appwrite'
import React from 'react'

const Page = async ({ params, searchParams }: SearchParamProps) => {
  const type = ((await params)?.type as string) ?? ''
  const searchText = ((await searchParams)?.query as string) ?? ''
  const sort = ((await searchParams)?.sort as string) ?? ''

  const types = getFileTypesParams(type) as FileType[]

  const files = await getFiles({ types, searchText, sort })

  const totalFileSize = (files.documents as Models.Document[]).reduce((acc, curr) => (acc + curr.size), 0)

  return (
    <div>
      <section className='w-full'>
        <h1 className='h1 capitalize'>{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total Size: <span className='h5'>{convertFileSize(totalFileSize)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort By:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className='file-list'>
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files found</p>
      )}
    </div>
  )
}

export default Page