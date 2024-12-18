'use client';

import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";

type Props = {
  fullName: string
  email: string
  avatar: string
}

const Sidebar = ({ fullName, email, avatar }: Props) => {
  const pathName = usePathname()
  return (
    <aside className='sidebar'>
      <Link href="/">
        <div className='hidden h-auto items-center gap-2 lg:flex'>
          <Image
            src="/assets/icons/logo-brand.svg"
            alt='Logo'
            width={52}
            height={52}
            className='hidden h-auto lg:block'
          />
          <span className='text-2xl font-semibold text-brand-600'>Kloud Atlas</span>
        </div>
        <Image
          src="/assets/icons/logo-brand.svg"
          alt='Logo'
          width={52}
          height={52}
          className='lg:hidden'
        />
      </Link>

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ icon, name, url }) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li className={cn(
                'sidebar-nav-item',
                pathName === url && 'shad-active'
              )}>
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn('nav-icon', pathName === url && 'nav-icon-active')}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src='/assets/images/files.png'
        alt='Files'
        width={506}
        height={418}
        className='w-full'
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar ?? avatarPlaceholderUrl}
          alt='Avatar'
          width={44}
          height={44}
          className='sidebar-user-avatar'
        />

        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar