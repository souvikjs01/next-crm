'use client'
import { editContact } from '@/actions/contact'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { 
    CHANNELS, 
    contactSchema, 
    FAVOURITECONTENT, 
    LEADSTATUS 
} from '@/lib/zodSchemas'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { Prisma } from '@prisma/client'
import { useActionState } from 'react'
import SubmitButton from '../loader/submitButton'


interface iAppProps {
    data: Prisma.ContactGetPayload<{}>
}

export default function EditContact( { data } : iAppProps ) {
    const [lastResult, action] = useActionState(editContact, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
        return parseWithZod(formData, {
            schema: contactSchema,
        });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

  return (
    <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
            <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
              <input type="hidden" name="id" value={data.id} />
              
              <div className="flex flex-col gap-1 w-fit mb-6">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">Update Lead</Badge>
                  <Input
                    name={fields.contactName.name}
                    key={fields.contactName.key}
                    defaultValue={data.name}
                    placeholder="Lead Name"
                  />
                </div>
                <p className="text-sm text-red-500">{fields.contactName.errors}</p>
              </div>
    
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    id={fields.email.id}
                    name={fields.email.name}
                    key={fields.email.key}
                    defaultValue={data.email}
                    placeholder="lead@example.com"
                    type="email"
                  />
                  <p className="text-sm text-red-500">{fields.email.errors}</p>
                </div>
    
                <div className="space-y-2">
                  <Label>Phone <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input
                    id={fields.phone.id}
                    name={fields.phone.name}
                    key={fields.phone.key}
                    defaultValue={data.phone!}
                    placeholder="+1 555 000 0000"
                    type="tel"
                  />
                  <p className="text-sm text-red-500">{fields.phone.errors}</p>
                </div>
              </div>
    
    
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label>Lead Status</Label>
                  <Select
                    name={fields.leadStatus.name}
                    key={fields.leadStatus.key}
                    defaultValue={data.leadStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={LEADSTATUS.NEW}>New</SelectItem>
                      <SelectItem value={LEADSTATUS.CONNECTED}>Connected</SelectItem>
                      <SelectItem value={LEADSTATUS.UNQUALIFIED}>Unqualified</SelectItem>
                      <SelectItem value={LEADSTATUS.OPEN}>Open</SelectItem>
                      <SelectItem value={LEADSTATUS.PROGRESS}>Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">{fields.leadStatus.errors}</p>
                </div>
    
                <div className="space-y-2">
                  <Label>Preferred Channel</Label>
                  <Select
                    name={fields.preferredChanel.name}
                    key={fields.preferredChanel.key}
                    defaultValue={data.preferredChanel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CHANNELS.EMAIL}>Email</SelectItem>
                      <SelectItem value={CHANNELS.LINKEDIN}>Linkedin</SelectItem>
                      <SelectItem value={CHANNELS.SMS}>SMS</SelectItem>
                      <SelectItem value={CHANNELS.INSTAGRAM}>Instagram</SelectItem>
                      <SelectItem value={CHANNELS.BLOG}>Blog</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">{fields.preferredChanel.errors}</p>
                </div>
              </div>
    
              <div className="mb-6">
                <div className="space-y-2">
                  <Label>Favorite Content Type</Label>
                  <Select
                    name={fields.favoriteContent.name}
                    key={fields.favoriteContent.key}
                    defaultValue={data.favoriteContent}
                  >
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={FAVOURITECONTENT.STRATEGY}>Strategy</SelectItem>
                      <SelectItem value={FAVOURITECONTENT.FINANCIAL}>Financial</SelectItem>
                      <SelectItem value={FAVOURITECONTENT.HR}>HR</SelectItem>
                      <SelectItem value={FAVOURITECONTENT.IT}>IT</SelectItem>
                      <SelectItem value={FAVOURITECONTENT.OPERATIONAL}>Operational</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">{fields.favoriteContent.errors}</p>
                </div>
              </div>
    
              <div className="flex items-center justify-end mt-6">
                <SubmitButton text="Update Contact" />
              </div>
            </form>
          </CardContent>
        </Card>
  )
}
