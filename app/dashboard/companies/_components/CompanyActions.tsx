'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";


export default function CompanyActions({id}: {id: string}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/companies/${id}/edit`}>
            <Pencil className="size-4 mr-2" /> Edit Company
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/companies/${id}/delete`}>
            <Trash className="size-4 mr-2" /> Delete Company
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
