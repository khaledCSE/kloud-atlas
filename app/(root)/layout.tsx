import Header from '@/components/dashboard/Header'
import MobileNavigation from '@/components/dashboard/MobileNavigation'
import Sidebar from '@/components/dashboard/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const dynamic = "force-dynamic";

const Layout = async ({ children }: Props) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return redirect('/sign-in');

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className='flex h-full flex-1 flex-col'>
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  )
}

export default Layout