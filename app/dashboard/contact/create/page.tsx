
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/hooks';
import CreateContact from './_components/CreateContact';

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  return data;
}

export default async function page() {
  const session = await requireUser()
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateContact />
  );
}
