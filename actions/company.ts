"use server"

import { requireUser } from "@/lib/hooks";
import { parseWithZod } from "@conform-to/zod"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { companySchema } from "@/lib/zodSchemas";

export async function createCompany(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: companySchema
    })

    if(submission.status !== 'success') {
        return submission.reply()
    }

    await prisma.company.create({
        data: {
            icon: submission.value.icon,
            name: submission.value.name,
            phone: submission.value.phone,
            owner: submission.value.owner,
            domain: submission.value.domain,
            industry: submission.value.industry,
            city: submission.value.city,
            type: submission.value.type,
            annualRevenue: submission.value.annualRevenue,
            linkedinPage: submission.value.linkedinPage,
            userId: session.user?.id!
        }
    })

    redirect("/dashboard/companies")
}

export async function DeleteCompany(companyId: string) {
    const session = await requireUser();

    await prisma.company.delete({
        where: {
            userId: session.user?.id,
            id: companyId,
        },
    });

    return redirect("/dashboard/companies");
}