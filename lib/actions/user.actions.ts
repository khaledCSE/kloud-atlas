'use server';

import { createAdminClient } from "@/lib/appwrite";
import { appWriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

type CreateAccountParams = { fullName: string, email: string }
type CreateSecretParams = { accountId: string, password: string }

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient()
  const result = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    [Query.equal('email', [email])]
  )

  return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
  console.error(error);
  throw new Error(message)
}

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient()
  try {
    const session = await account.createEmailToken(ID.unique(), email)

    return session.userId
  } catch (error) {
    handleError(error, 'Error sending email OTP')
  }
}

export const createAccount = async ({ fullName, email }: CreateAccountParams) => {
  const existingUser = await getUserByEmail(email)

  const accountId = await sendEmailOTP({ email })

  if (!accountId) {
    throw new Error('Failed to send an OTP')
  }

  if (!existingUser) {
    const { databases } = await createAdminClient()

    await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
        accountId,
      }
    )

    return parseStringify({ accountId })
  }
}

export const verifySecret = async ({ accountId, password }: CreateSecretParams) => {
  try {
    const { account } = await createAdminClient()

    const session = await account.createSession(accountId, password);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    return parseStringify({ sessionId: session.$id })
  } catch (error) {
    handleError(error, 'Failed to verify OTP')
  }
}