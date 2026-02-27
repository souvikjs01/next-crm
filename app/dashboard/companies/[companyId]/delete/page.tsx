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
import { DeleteCompany } from "@/actions/company";


async function Authorize(contactId: string, userId: string) {
    const data = await prisma.company.findUnique({
        where: {
            id: contactId,
            userId: userId,
        },
    });

    if (!data) {
        return redirect("/dashboard/companies");
    }
}

type Params = Promise<{ companyId: string }>;

export default async function page({params}: {params: Params}) {
  const session = await requireUser();
  const { companyId } = await params;
  await Authorize(companyId, session.user?.id as string);
  
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-125">
        <CardHeader>
          <CardTitle>Delete Company</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this Company?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="Warning Gif" className="rounded-lg" />
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/companies"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await DeleteCompany(companyId)
            }}
          >
            <SubmitButton text="Delete Contact" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
