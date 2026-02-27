import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/hooks";
import EmptyState from "@/components/dashboard/EmptyState";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";

async function getCompanies(userId: string) {
    const data = await prisma.company.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            city: true,
            icon: true,
            annualRevenue: true,
            createdAt: true,
            domain: true,
            industry: true,
            linkedinPage: true,
            phone: true,
            type: true,
            owner: true,
        },

        orderBy: {
            createdAt: 'desc',
        }
    });

    return data;
}

export default async function CompanyList() {
  const session = await requireUser();
  const data = await getCompanies(session.user?.id as string)

  return (
    <>
        {data.length === 0 ? (
            <EmptyState
                title="No company found"
                description="Create your first company to get started"
                buttontext="Create company"
                href="/dashboard/company/create"
            />
        ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Create Date</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((company) => (
                        <TableRow key={company.id}>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                }).format(new Date(company.createdAt))}
                            </TableCell>
                            <TableCell>{company.phone ?? "NOT AVAILABLE"}</TableCell>
                            <TableCell>{company.city}</TableCell>
                            <TableCell>{company.industry}</TableCell>
                            <TableCell className="text-right">
                                {/* <ContactActions id={contact.id} /> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </>
  )
}
