'use client';

import FileUploader from "@/components/dashboard/FileUploader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/constants";
import { signOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react"

type Props = {
  fullName: string
  email: string
  avatar: string
  ownerId: string
  accountId: string
}

const MobileNavigation = ({ fullName, email, avatar, ownerId, accountId }: Props) => {
  const [open, setOpen] = useState(false)

  const pathName = usePathname()

  return (
    <header className="mobile-header">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/icons/logo-brand.svg"
          alt='Logo'
          width={32}
          height={32}
          className='h-auto lg:hidden'
        />
        <span className='text-2xl font-semibold text-brand-600'>Kloud Atlas</span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src='/assets/icons/menu.svg'
            alt="menu"
            width={30}
            height={30}
            className="h-auto"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen bg-white px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathName === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathName === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>

        </SheetContent>
      </Sheet>

    </header>
  )
}

export default MobileNavigation