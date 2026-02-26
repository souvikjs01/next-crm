import ContactList from '@/components/dashboard/ContactList'
import { buttonVariants } from '@/components/ui/button'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default function page() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
            <CardDescription>Manage your contacts right here</CardDescription>
          </div>
          <Link href="/dashboard/contact/create" className={buttonVariants()}>
            <PlusIcon /> Create Contact
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ContactList />
      </CardContent>
    </Card>
  )
}
