import ContactList from '@/components/dashboard/ContactList'
import { buttonVariants } from '@/components/ui/button'
import { 
    Card, 
    CardContent,  
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import CompanyList from './_components/CompanyList'

export default function page() {
  return (
    <Card className=' rounded-sm'>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">My Companies</CardTitle>
          </div>
          <Link href="/dashboard/companies/create" className={buttonVariants()}>
            <PlusIcon /> Create Company
          </Link>
        </div>
      </CardHeader>
      <CardContent>
          <CompanyList />
      </CardContent>
    </Card>
  )
}
