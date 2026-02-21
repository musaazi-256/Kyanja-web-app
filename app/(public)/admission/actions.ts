"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { prisma } from "@/lib/prisma";
import { admissionSchema, previousSchoolSchema } from "@/lib/validations/admission";

export async function submitAdmissionAction(formData: FormData) {
  const previousSchoolsRaw = JSON.parse((formData.get("previousSchools") as string) ?? "[]");
  const parsedSchools = previousSchoolSchema.array().max(3).safeParse(previousSchoolsRaw);
  if (!parsedSchools.success) {
    return { success: false, error: "Invalid previous school entries." };
  }

  const parsed = admissionSchema.safeParse({
    surname: formData.get("surname"),
    foreName: formData.get("foreName"),
    dateOfBirth: formData.get("dateOfBirth"),
    religiousBelief: formData.get("religiousBelief"),
    previousSchools: parsedSchools.data,
    vaccinationPolio: formData.get("vaccinationPolio") === "true",
    vaccinationTyphoid: formData.get("vaccinationTyphoid") === "true",
    vaccinationMeasles: formData.get("vaccinationMeasles") === "true",
    healthOthers: formData.get("healthOthers") || "",
    parentName: formData.get("parentName"),
    residence: formData.get("residence"),
    email: formData.get("email"),
    telHome: formData.get("telHome"),
    telOffice: formData.get("telOffice") || "",
    occupation: formData.get("occupation"),
    nin: formData.get("nin"),
    nextOfKin: formData.get("nextOfKin"),
    declarationAccepted: formData.get("declarationAccepted") === "true",
    digitalSignature: formData.get("digitalSignature"),
    signedDate: formData.get("signedDate")
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Please fix the form inputs." };
  }

  let passportPhotoUrl: string | undefined;
  const passportPhoto = formData.get("passportPhoto") as File | null;

  if (passportPhoto && passportPhoto.size > 0) {
    const bytes = await passportPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = passportPhoto.name.split(".").pop() || "jpg";
    const filename = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    passportPhotoUrl = `/uploads/${filename}`;
  }

  await prisma.admissionApplication.create({
    data: {
      surname: parsed.data.surname,
      foreName: parsed.data.foreName,
      dateOfBirth: new Date(parsed.data.dateOfBirth),
      religiousBelief: parsed.data.religiousBelief,
      passportPhotoUrl,
      previousSchools: parsed.data.previousSchools,
      vaccinationPolio: parsed.data.vaccinationPolio,
      vaccinationTyphoid: parsed.data.vaccinationTyphoid,
      vaccinationMeasles: parsed.data.vaccinationMeasles,
      healthOthers: parsed.data.healthOthers,
      parentName: parsed.data.parentName,
      residence: parsed.data.residence,
      email: parsed.data.email,
      telHome: parsed.data.telHome,
      telOffice: parsed.data.telOffice,
      occupation: parsed.data.occupation,
      nin: parsed.data.nin,
      nextOfKin: parsed.data.nextOfKin,
      declarationAccepted: parsed.data.declarationAccepted,
      digitalSignature: parsed.data.digitalSignature,
      signedDate: new Date(parsed.data.signedDate)
    }
  });

  return { success: true };
}
