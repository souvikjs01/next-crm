
import EditContact from '@/components/dashboard/EditContact';
import { requireUser } from '@/lib/hooks';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getData(companyId: string, userId: string) {
    const data = await prisma.company.findUnique({
        where: {
            id: companyId,
            userId: userId,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ companyId: string }>;

export default async function page({ params }: {params: Params}) {
  const { companyId } = await params;
  const session = await requireUser()
  const data = await getData(companyId, session.user?.id as string)
  
  return (
    <></>
    // <EditContact
    //     data={data}
    // />
  )
}
