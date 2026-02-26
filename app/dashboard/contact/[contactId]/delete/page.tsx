import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import WarningGif from "@/public/warning-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/hooks";
import SubmitButton from "@/components/loader/submitButton";
import { DeleteContact } from "@/actions/contact";


async function Authorize(contactId: string, userId: string) {
    const data = await prisma.contact.findUnique({
        where: {
        id: contactId,
        userId: userId,
        },
    });

    if (!data) {
        return redirect("/dashboard/contact");
    }
}

type Params = Promise<{ contactId: string }>;

export default async function page({params}: {params: Params}) {
  const session = await requireUser();
  const { contactId } = await params;
  await Authorize(contactId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-125">
        <CardHeader>
          <CardTitle>Delete Contact</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this Contact?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="Warning Gif" className="rounded-lg" />
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/contact"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await DeleteContact(contactId);
            }}
          >
            <SubmitButton text="Delete Contact" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
