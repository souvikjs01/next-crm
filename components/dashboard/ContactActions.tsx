'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
// import { toast } from "sonner";


export default function ContactActions({id}: {id: string}) {
  const handleSendReminder = () => {
    // toast.promise(
    //   fetch(`/api/email/${id}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    //   {
    //     loading: "Sending reminder email...",
    //     success: "Reminder email sent successfully",
    //     error: "Failed to send reminder email",
    //   }
    // );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/contact/${id}`}>
            <Pencil className="size-4 mr-2" /> Edit Contact
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href={`/api/contact/${id}`} target="_blank">
            <DownloadCloudIcon className="size-4 mr-2" /> Download Contact
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/contact/${id}/delete`}>
            <Trash className="size-4 mr-2" /> Delete Contact
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
