import { requireUser } from '@/lib/hooks';
import CreateCompany from '../_components/CreateCompany';

export default async function page() {
  const session = await requireUser()

  return (
    <CreateCompany />
  );
}
