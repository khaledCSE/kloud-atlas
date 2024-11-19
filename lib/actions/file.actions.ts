'use server';

import { getCurrentUser, handleError } from "@/lib/actions/user.actions";
import { createAdminClient } from "@/lib/appwrite";
import { appWriteConfig } from "@/lib/appwrite/config";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { UploadFileProps } from "@/types";
import { revalidatePath } from "next/cache";
import { ID, Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient()

  try {
    const inputFile = InputFile.fromBuffer(file, file.name)

    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile
    )

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      ID.unique(),
      fileDocument
    ).catch(async (error) => {
      await storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id)
      handleError(error, 'Error creating file')
    })

    revalidatePath(path)
    return parseStringify(newFile)
  } catch (error) {
    handleError(error, 'Failed to upload file')
  }
}

const createQueries = (
  currentUser: Models.Document,
  // types: string[],
  // searchText: string,
  // sort: string,
  // limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  // if (types.length > 0) queries.push(Query.equal("type", types));
  // if (searchText) queries.push(Query.contains("name", searchText));
  // if (limit) queries.push(Query.limit(limit));

  // if (sort) {
  //   const [sortBy, orderBy] = sort.split("-");

  //   queries.push(
  //     orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
  //   );
  // }

  return queries;
};

export const getFiles = async () => {
  const { databases } = await createAdminClient()

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new Error('No user found')
    }

    const queries = createQueries(currentUser)

    console.log({ currentUser, queries });


    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      queries
    )

    console.log({ files });


    return parseStringify(files)
  } catch (error) {
    handleError(error, 'Failed to get files')
  }
}