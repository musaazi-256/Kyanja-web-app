import { z } from "zod";

export const previousSchoolSchema = z.object({
  name: z.string().trim().min(2, "School name is required").max(120),
  since: z.string().min(4, "Start year is required").max(12),
  to: z.string().min(4, "End year is required").max(12)
});

export const admissionSchema = z.object({
  surname: z.string().trim().min(2),
  foreName: z.string().trim().min(2),
  dateOfBirth: z.string().min(1),
  religiousBelief: z.string().trim().min(2),
  previousSchools: z.array(previousSchoolSchema).max(3),
  vaccinationPolio: z.boolean().default(false),
  vaccinationTyphoid: z.boolean().default(false),
  vaccinationMeasles: z.boolean().default(false),
  healthOthers: z.string().optional(),
  parentName: z.string().trim().min(2),
  residence: z.string().trim().min(4),
  email: z.string().email(),
  telHome: z.string().trim().min(7),
  telOffice: z.string().trim().optional(),
  occupation: z.string().trim().min(2),
  nin: z.string().trim().min(8),
  nextOfKin: z.string().trim().min(2),
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the declaration" })
  }),
  digitalSignature: z.string().trim().min(2),
  signedDate: z.string().min(1)
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
