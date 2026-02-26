
import EditContact from '@/components/dashboard/EditContact';
import { requireUser } from '@/lib/hooks';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getData(contactId: string, userId: string) {
    const data = await prisma.contact.findUnique({
        where: {
            id: contactId,
            userId: userId,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ contactId: string }>;

export default async function page({ params }: {params: Params}) {
  const { contactId } = await params;
  const session = await requireUser()
  const data = await getData(contactId, session.user?.id as string)
  
  return (
    <EditContact
        data={data}
    />
  )
}
