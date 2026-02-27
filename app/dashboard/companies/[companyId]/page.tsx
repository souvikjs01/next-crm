import { requireUser } from "@/lib/hooks";
import CompanyDetail from "../_components/CompanyDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getCompany(companyId: string, userId: string) {
    const data = await prisma.company.findUnique({
        where: {
            id: companyId,
            userId,
        },
        select: {
            id: true,
            name: true,
            annualRevenue: true,
            city: true,
            createdAt: true,
            domain: true,
            icon: true,
            industry: true,
            linkedinPage: true,
            phone: true,
            type: true,
            owner: true, 
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ companyId: string }>;

export default async function page({params}: {params: Params}) {
    const { companyId } = await params
    const session = await requireUser()
    const data = await getCompany(companyId, session.user?.id as string)
    return (
        <CompanyDetail company={data}/>
    )
}
