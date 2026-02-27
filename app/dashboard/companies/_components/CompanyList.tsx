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
import CompanyActions from "./CompanyActions";
import Link from "next/link";

async function getCompanies(userId: string) {
    const data = await prisma.company.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            phone: true,
            city: true,
            industry: true
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
                            <TableCell>
                                <Link href={`/dashboard/companies/${company.id}`}>
                                    {company.name}
                                </Link>
                            </TableCell>
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
                                <CompanyActions id={company.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </>
  )
}
