import Image from 'next/image'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src='/assets/icons/logo-full.svg'
            alt='Logo'
            width={224}
            height={82}
            className='h-auto'
          />

          <div className='space-y-5 text-white'>
            <h1 className='h1'>Manage Your Files the Best Way</h1>
            <p className="body-1">
              This is where you can store all your files.
            </p>
          </div>
          <Image
            src='/assets/images/files.png'
            alt='Files'
            className='transition-all hover:rotate-2 hover:scale-105'
            width={342}
            height={342}
          />
        </div>
      </section>

      <section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
        <div className="mb-16 lg:hidden">
          <Image
            width={224}
            height={82}
            src='/assets/icons/logo-full-brand.svg'
            alt='logo'
            className='h-auto w-[200px] lg:w-[250px]'
          />
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout