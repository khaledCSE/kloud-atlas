'use client';

import { DeleteConfirmation, FileDetails, ShareInput } from "@/components/dashboard/ActionsModalContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { actionsDropdownItems } from "@/constants";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/file.actions";
import { constructDownloadUrl } from "@/lib/utils";
import { ActionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useState } from "react"

type Props = {
  file: Models.Document
}

const ActionsDropdown = ({ file }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [action, setAction] = useState<ActionType | null>(null)
  const [name, setName] = useState(file.name)
  const [isLoading, setIsLoading] = useState(false)
  const [emails, setEmails] = useState<string[]>([])

  const path = usePathname()

  const closeAllModals = () => {
    setIsModalOpen(false)
    setIsDropdownOpen(false)
    setAction(null)
    // setEmails([])
  }

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () => renameFile({ name, fileId: file.$id, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () => deleteFile({ path, fileId: file.$id, bucketFileId: file.bucketFileId })
    }

    success = await actions[action.value as keyof typeof actions]()

    if (success) {
      closeAllModals()
    }

    setIsLoading(false)
  }

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((em) => em !== email)
    const success = await updateFileUsers({ path, fileId: file.$id, emails: updatedEmails })

    if (success) {
      setEmails(updatedEmails)
    }

    closeAllModals()
  }

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action

    return (
      <DialogContent className="shad-dialog button bg-white">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">{label}</DialogTitle>
          {value === 'rename' && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {value === 'details' && (
            <FileDetails file={file} />
          )}

          {value === 'share' && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}

          {value === 'delete' && (
            <DeleteConfirmation file={file} />
          )}

        </DialogHeader>
        {['rename', 'share', 'delete'].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button className="modal-cancel-button" onClick={closeAllModals}>Cancel</Button>
            <Button className="modal-submit-button text-white" onClick={handleAction}>
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src='/assets/icons/loader.svg'
                  alt="Loading"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src='/assets/icons/dots.svg'
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem)

                if (['rename', 'share', 'delete', 'details'].includes(actionItem.value)) {
                  setIsModalOpen(true)
                }
              }}
            >
              {actionItem.value === 'download' ?
                (<Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />
                    {actionItem.label}
                  </div>
                )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>

  )
}

export default ActionsDropdown