import { prisma } from "@/lib/prisma";
import { 
    Table,
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "../ui/table";
import { requireUser } from "@/lib/hooks";
import ContactActions from "./ContactActions";



async function getContacts(userId: string) {
    const data = await prisma.contact.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            favoriteContent: true,
            leadStatus: true,
            preferredChanel: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    return data;
}

export default async function ContactList() {
  const session = await requireUser();
  const data = await getContacts(session.user?.id as string)

  return (
    <>
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Lead Status</TableHead>
                    <TableHead>Favorite Content</TableHead>
                    <TableHead>Preferred Channel</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.leadStatus}</TableCell>
                            <TableCell>{contact.favoriteContent}</TableCell>
                            <TableCell>{contact.preferredChanel}</TableCell>
                            <TableCell>
                            {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "medium",
                            }).format(contact.createdAt)}
                            </TableCell>
                            <TableCell>
                            {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "medium",
                            }).format(contact.updatedAt)}
                            </TableCell>
                            <TableCell className="text-right">
                                <ContactActions id={contact.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
  )
}
