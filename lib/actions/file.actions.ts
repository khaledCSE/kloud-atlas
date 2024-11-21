'use server';

import { getCurrentUser, handleError } from "@/lib/actions/user.actions";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appWriteConfig } from "@/lib/appwrite/config";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { DeleteFileProps, FileType, GetFilesProps, RenameFileProps, UpdateFileUsersProps, UploadFileProps } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};

export const getFiles = async ({ types, searchText = '', sort = '$createdAt-desc', limit }: GetFilesProps) => {
  const { databases } = await createAdminClient()

  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      console.error('No user found')
      return redirect('/sign-in')
    }

    const queries = createQueries(currentUser, types, searchText, sort, limit)

    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      queries
    )

    return parseStringify(files)
  } catch (error) {
    handleError(error, 'Failed to get files')
  }
}

export const renameFile = async ({ name, path, fileId, extension }: RenameFileProps) => {
  const { databases } = await createAdminClient()

  try {
    const newName = `${name}.${extension}`
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        name: newName
      }
    )

    revalidatePath(path)
    return parseStringify(updatedFile)
  } catch (error) {
    handleError(error, 'Failed to rename the file')
  }
}

export const updateFileUsers = async ({ path, fileId, emails, }: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient()

  try {
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      {
        users: emails
      }
    )

    revalidatePath(path)
    return parseStringify(updatedFile)
  } catch (error) {
    handleError(error, 'Failed to rename the file')
  }
}

export const deleteFile = async ({ path, fileId, bucketFileId }: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient()

  try {
    const deletedFile = await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId
    )

    if (deletedFile) {
      await storage.deleteFile(appWriteConfig.bucketId, bucketFileId)
    }

    revalidatePath(path)
    return parseStringify({ status: 'success' })
  } catch (error) {
    handleError(error, 'Failed to rename the file')
  }
}

// * Dashboard-specific
export async function getTotalSpaceUsed() {
  try {
    const databases = (await createSessionClient())?.databases;
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User is not authenticated.");

    if (!databases) throw new Error("Could not find databases.");

    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      [Query.equal("owner", [currentUser.$id])],
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };

    files.documents.forEach((file: Models.Document) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return parseStringify(totalSpace);
  } catch (error) {
    handleError(error, "Error calculating total space used:, ");
    redirect('/sign-in')
  }
}