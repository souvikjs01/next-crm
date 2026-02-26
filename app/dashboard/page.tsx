import { requireUser } from '@/lib/hooks';

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      dashbordpage
    </>
  )
}
