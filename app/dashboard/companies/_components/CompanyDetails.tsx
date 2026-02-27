import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Globe,
  Linkedin,
  MapPin,
  DollarSign,
  Building2,
  User,
  Phone,
  Mail,
  MoreHorizontal,
  Plus,
  ExternalLink,
  TrendingUp,
  Users,
  Calendar,
  Tag,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Prisma } from "@prisma/client";

type CompanyType = "Prospect" | "Partner" | "Reseller" | "Vendor" | "Other";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string | null;
  avatar?: string | null;
  createdAt: Date;
}

interface Company {
  id: string;
  name: string;
  icon?: string | null;
  domain: string;
  industry: string;
  type: CompanyType;
  city: string;
  annualRevenue: string;
  linkedinPage: string;
  owner?: string | null;
  phone?: string | null;
  createdAt: Date;
  contacts?: Contact[];
}

const TYPE_STYLES: Record<CompanyType, string> = {
  Prospect:  "bg-blue-50   text-blue-700   border-blue-200",
  Partner:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  Reseller:  "bg-violet-50  text-violet-700  border-violet-200",
  Vendor:    "bg-amber-50   text-amber-700   border-amber-200",
  Other:     "bg-slate-50   text-slate-600   border-slate-200",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}


function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card className="border border-border/60 shadow-none">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground font-medium truncate">{label}</p>
          <p className="text-sm font-semibold text-foreground truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-sm text-muted-foreground shrink-0 w-32">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline underline-offset-2 flex items-center gap-1 min-w-0 truncate"
        >
          {value}
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      ) : (
        <span className="text-sm font-medium text-foreground text-right min-w-0 truncate">
          {value}
        </span>
      )}
    </div>
  );
}


export default function CompanyDetail({ company }: {company: Company}) {
  const contacts : any = [];
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/60 bg-background/95 backdrop-blur sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
              <Link href="/dashboard/companies">
                <ArrowLeft className="h-4 w-4" />
                Companies
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link href={`/dashboard/companies/${company.id}/edit`}>
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-destructive focus:text-destructive gap-2">
                    <Link href={`/dashboard/companies/${company.id}/delete`} className=" flex justify-between items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete company
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 rounded-2xl border border-border shadow-sm shrink-0">
              <AvatarImage src={company.icon ?? undefined} alt={company.name} />
              <AvatarFallback className="rounded-2xl text-2xl font-bold bg-muted text-muted-foreground">
                {initials(company.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
                  {company.name}
                </h1>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${TYPE_STYLES[company.type]}`}
                >
                  {company.type}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {company.industry}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.city}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  {company.domain}
                </span>
              </div>
            </div>

            {/* Quick action links */}
            <div className="flex items-center gap-2 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Visit website</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <a href={company.linkedinPage} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>LinkedIn page</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={DollarSign} label="Annual Revenue"  value={company.annualRevenue} />
            <StatCard icon={Users}      label="Contacts"        value={String(contacts.length)} />
            <StatCard icon={Tag}        label="Type"            value={company.type} />
            <StatCard
              icon={Calendar}
              label="Member Since"
              value={new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                new Date(company.createdAt)
              )}
            />
          </div>

          {/* ── Main grid ── */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left column — details */}
            <div className="lg:col-span-1 space-y-6">

              {/* Company info */}
              <Card className="border border-border/60 shadow-none">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="divide-y divide-border/50">
                    <InfoRow label="Domain"     value={company.domain}      href={`https://${company.domain}`} />
                    <InfoRow label="Industry"   value={company.industry} />
                    <InfoRow label="City"       value={company.city} />
                    <InfoRow label="Revenue"    value={company.annualRevenue} />
                    <InfoRow label="LinkedIn"   value="View profile"         href={company.linkedinPage} />
                    <InfoRow label="Owner"      value={company.owner ?? "—"} />
                    <InfoRow label="Phone"      value={company.phone ?? "—"} />
                    <InfoRow
                      label="Created"
                      value={new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                        new Date(company.createdAt)
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Revenue trend placeholder */}
              <Card className="border border-border/60 shadow-none">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="h-28 rounded-lg bg-muted/50 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Revenue chart coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column — contacts */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border border-border/60 shadow-none">
                <CardHeader className="pt-5 px-5 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-foreground">
                      Contacts
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {contacts.length} contact{contacts.length !== 1 ? "s" : ""} associated
                    </p>
                  </div>
                  <Button size="sm" className="gap-2 h-8" asChild>
                    <Link href={`/dashboard/company/${company.id}/contacts/create`}>
                      <Plus className="h-3.5 w-3.5" />
                      Add contact
                    </Link>
                  </Button>
                </CardHeader>

                <Separator className="opacity-60" />

                {contacts.length === 0 ? (
                  <CardContent className="px-5 py-12 flex flex-col items-center justify-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">No contacts yet</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Add your first contact to start managing relationships.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2 mt-1" asChild>
                      <Link href={`/dashboard/company/${company.id}/contacts/create`}>
                        <Plus className="h-3.5 w-3.5" />
                        Add contact
                      </Link>
                    </Button>
                  </CardContent>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-5">Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="pr-5 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        contacts
                      {/* {contacts.map((contact) => (
                        <TableRow key={contact.id} className="group">
                          <TableCell className="pl-5">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage src={contact.avatar ?? undefined} />
                                <AvatarFallback className="text-xs font-semibold bg-muted">
                                  {initials(contact.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-foreground">
                                {contact.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {contact.role ?? "—"}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    <Mail className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>{contact.email}</TooltipContent>
                              </Tooltip>
                              {contact.phone && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={`tel:${contact.phone}`}
                                      className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <Phone className="h-4 w-4" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>{contact.phone}</TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="text-xs text-muted-foreground">
                              {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                                new Date(contact.createdAt)
                              )}
                            </span>
                          </TableCell>

                          <TableCell className="pr-5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/contacts/${contact.id}`} className="gap-2">
                                    <User className="h-4 w-4" />
                                    View contact
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/contacts/${contact.id}/edit`} className="gap-2">
                                    <Pencil className="h-4 w-4" />
                                    Edit contact
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive gap-2">
                                  <Trash2 className="h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))} */}
                    </TableBody>
                  </Table>
                )}
              </Card>

              {/* Activity feed placeholder */}
              <Card className="border border-border/60 shadow-none">
                <CardHeader className="pt-5 px-5 pb-4">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <Separator className="opacity-60" />
                <CardContent className="px-5 py-8 flex flex-col items-center text-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No activity yet</p>
                  <p className="text-xs text-muted-foreground">
                    Activity and interactions will appear here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}