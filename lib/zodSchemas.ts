import z from "zod"

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(2, "Address is required"),
});

export const contactSchema = z.object({
    contactName: z.string().min(1, "Invoice Name is required"),
    
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    
    phone: z.string()
    .regex(/^\+?[1-9][\d\s]{6,20}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),

    leadStatus: z.enum(["New", "Progress", "Connected", "Unqualified", "Open"]).default("New"),

    favoriteContent: z.enum(["Strategy", "Operational", "Financial", "IT", "HR"]).default("Strategy"),

    preferredChanel: z.enum(["Linkedin", "Instagram", "SMS", "Email", "Blog"]).default("Email")
});

export enum LEADSTATUS {
  NEW = "New",
  CONNECTED = "Connected",
  PROGRESS = "Progress",
  OPEN = "Open",
  UNQUALIFIED = "Unqualified",
}  
  
export enum FAVOURITECONTENT {
  STRATEGY = "Strategy",
  OPERATIONAL = "Operational",
  FINANCIAL = "Financial",
  IT = "IT",
  HR = "HR",
}

export enum CHANNELS {
  EMAIL = "Email",
  SMS = "SMS",
  LINKEDIN = "Linkedin",
  INSTAGRAM = "Instagram",
  BLOG = "Blog"
}

// Inferred TypeScript type
export type LeadFormData = z.infer<typeof contactSchema>;