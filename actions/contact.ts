"use server"

import { requireUser } from "@/lib/hooks";
import { parseWithZod } from "@conform-to/zod"
import { contactSchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createContact(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: contactSchema
    })

    if(submission.status !== 'success') {
        return submission.reply()
    }

    await prisma.contact.create({
        data: {
            email: submission.value.email,
            name: submission.value.contactName,
            favoriteContent: submission.value.favoriteContent,
            leadStatus: submission.value.leadStatus,
            preferredChanel: submission.value.preferredChanel,
            phone: submission.value.phone,
            userId: session.user?.id!
        }
    })

    redirect("/dashboard/contact")
}

export async function DeleteContact(contactId: string) {
    const session = await requireUser();

    await prisma.contact.delete({
        where: {
            userId: session.user?.id,
            id: contactId,
        },
    });

    return redirect("/dashboard/contact");
}

export async function editContact(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: contactSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.contact.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id,
        },
        data: {
            name: submission.value.contactName,
            email: submission.value.email,
            phone: submission.value.phone,
            leadStatus: submission.value.leadStatus,
            preferredChanel: submission.value.preferredChanel,
            favoriteContent: submission.value.favoriteContent,
        },
    });

    return redirect("/dashboard/contact");
}
