import { z } from "zod";
import { serviceOptions } from "@/data/services";

export const budgetOptions = [
  "Not defined yet",
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name." })
    .max(80, { message: "That name is a little too long." }),
  email: z
    .email({ message: "Please enter a valid email address." })
    .max(160, { message: "That email is a little too long." }),
  phone: z
    .string()
    .trim()
    .max(32, { message: "That phone number is a little too long." })
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, { message: "That company name is a little too long." })
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, { message: "Please choose a service." }),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, { message: "Please tell us a little more (at least 20 characters)." })
    .max(4000, { message: "Please keep this under 4,000 characters." }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept the privacy notice to continue.",
  }),
  // Spam protection: hidden field + time trap. Never shown to real visitors.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export const serviceInterestOptions = serviceOptions;
