import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { requireUser } from '@/lib/hooks';
import React from 'react'

export default async function page() {
    const session = await requireUser() 
  return (
    <div>
      <form
        className="w-full"
        action={async () => {
            "use server";
            await signOut();
        }}
      >
        <button className="w-full text-left">Log out</button>
      </form>
    </div>
  )
}
