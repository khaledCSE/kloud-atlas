'use server';

import { appWriteConfig } from "@/lib/appwrite/config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appWriteConfig.endpointUrl)
    .setProject(appWriteConfig.projectId)

  const session = (await cookies()).get('appwrite-session')

  if (!session?.value) {
    console.error('No Session')
    return redirect('/sign-in')
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    }
  }
}

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appWriteConfig.endpointUrl)
    .setProject(appWriteConfig.projectId)
    .setKey(appWriteConfig.secretKey)


  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    get avatars() {
      return new Avatars(client)
    },
  }
}