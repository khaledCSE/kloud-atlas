import FileUploader from '@/components/dashboard/FileUploader'
import Search from '@/components/dashboard/Search'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='header'>
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form>
          <Button type="submit" className='sign-out-button'>
            <Image
              src='/assets/icons/logout.svg'
              alt='Logout'
              width={24}
              height={24}
              className='w-6'
            />
          </Button>
        </form>
      </div>
    </header>
  )
}

export default Header