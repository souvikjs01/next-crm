'use client'
import SubmitButton from '@/components/loader/submitButton'
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
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useActionState } from 'react'
import { editCompany } from '@/actions/company'
import { companySchema } from '@/lib/zodSchemas'
import { Prisma } from '@prisma/client'

interface iAppProps {
    data: Prisma.CompanyGetPayload<{}>
}

export default function EditCompany({ data }: iAppProps) {
  const [lastResult, action] = useActionState(editCompany, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
        return parseWithZod(formData, {
            schema: companySchema
        })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  });


  return (
    <Card className="w-full max-w-4xl mx-auto rounded-sm">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input type="hidden" name="id" value={data.id} />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Update Company</Badge>
              <Input
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={data.name}
                placeholder="Company Name"
              />
            </div>
            <p className="text-sm text-red-500">{fields.name.errors}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>
                Icon URL{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id={fields.icon.id}
                name={fields.icon.name}
                defaultValue={data.icon!}
                key={fields.icon.key}
                placeholder="https://example.com/logo.png"
                type="url"
              />
              <p className="text-sm text-red-500">{fields.icon.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>LinkedIn Page</Label>
              <Input
                id={fields.linkedinPage.id}
                name={fields.linkedinPage.name}
                defaultValue={data.linkedinPage}
                key={fields.linkedinPage.key}
                placeholder="https://linkedin.com/company/example"
                type="url"
              />
              <p className="text-sm text-red-500">{fields.linkedinPage.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Domain</Label>
              <Input
                id={fields.domain.id}
                name={fields.domain.name}
                key={fields.domain.key}
                defaultValue={data.domain}
                placeholder="example.com"
              />
              <p className="text-sm text-red-500">{fields.domain.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>
                Owner{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id={fields.owner.id}
                name={fields.owner.name}
                key={fields.owner.key}
                defaultValue={data.owner!}
                placeholder="Owner name or ID"
              />
              <p className="text-sm text-red-500">{fields.owner.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                id={fields.industry.id}
                name={fields.industry.name}
                key={fields.industry.key}
                defaultValue={data.industry}
                placeholder="e.g. SaaS, Healthcare, Finance"
              />
              <p className="text-sm text-red-500">{fields.industry.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>Company Type</Label>
              <Select
                name={fields.type.name}
                key={fields.type.key}
                defaultValue={data.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Reseller">Reseller</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.type.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                id={fields.city.id}
                name={fields.city.name}
                key={fields.city.key}
                defaultValue={data.city}
                placeholder="San Francisco"
              />
              <p className="text-sm text-red-500">{fields.city.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>Annual Revenue</Label>
              <Input
                id={fields.annualRevenue.id}
                name={fields.annualRevenue.name}
                key={fields.annualRevenue.key}
                defaultValue={data.annualRevenue}
                placeholder="e.g. $5,000,000"
              />
              <p className="text-sm text-red-500">{fields.annualRevenue.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="flex items-center justify-end mt-6">
            <SubmitButton text="Create Company" />
          </div>

        </form>
      </CardContent>
    </Card>
  )
}
