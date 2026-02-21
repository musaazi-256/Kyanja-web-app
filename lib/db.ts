import { countRows, deleteRows, eqFilter, insertRow, selectRows, updateRows } from "@/lib/supabase/server";

export const mediaSections = ["HERO", "PHILOSOPHY", "TEAM", "SCHOOL_CLUBS", "ADS_BANNER"] as const;
export type MediaSection = (typeof mediaSections)[number];

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  passwordHash: string;
  role: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  altText: string;
  createdAt: string;
};

export type ManagedImage = {
  id: string;
  section: MediaSection;
  imageUrl: string | null;
  mobileImageUrl: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
};

export type AdmissionStatus = "pending" | "approved" | "rejected";

export type PreviousSchool = {
  name: string;
  since: string;
  to: string;
};

export type AdmissionApplication = {
  id: string;
  surname: string;
  foreName: string;
  dateOfBirth: string;
  religiousBelief: string;
  passportPhotoUrl: string | null;
  previousSchools: PreviousSchool[];
  vaccinationPolio: boolean;
  vaccinationTyphoid: boolean;
  vaccinationMeasles: boolean;
  healthOthers: string | null;
  parentName: string;
  residence: string;
  email: string;
  telHome: string;
  telOffice: string | null;
  occupation: string;
  nin: string;
  nextOfKin: string;
  declarationAccepted: boolean;
  digitalSignature: string;
  signedDate: string;
  status: AdmissionStatus;
  createdAt: string;
  updatedAt: string;
};

type AdminUserRow = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  password_hash: string;
  role: string;
};

type GalleryImageRow = {
  id: string;
  image_url: string;
  alt_text: string;
  created_at: string;
};

type ManagedImageRow = {
  id: string;
  section: MediaSection;
  image_url: string | null;
  mobile_image_url: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

type AdmissionApplicationRow = {
  id: string;
  surname: string;
  fore_name: string;
  date_of_birth: string;
  religious_belief: string;
  passport_photo_url: string | null;
  previous_schools: unknown;
  vaccination_polio: boolean;
  vaccination_typhoid: boolean;
  vaccination_measles: boolean;
  health_others: string | null;
  parent_name: string;
  residence: string;
  email: string;
  tel_home: string;
  tel_office: string | null;
  occupation: string;
  nin: string;
  next_of_kin: string;
  declaration_accepted: boolean;
  digital_signature: string;
  signed_date: string;
  status: AdmissionStatus;
  created_at: string;
  updated_at: string;
};

function mapAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    image: row.image,
    passwordHash: row.password_hash,
    role: row.role
  };
}

function mapGalleryImage(row: GalleryImageRow): GalleryImage {
  return {
    id: row.id,
    imageUrl: row.image_url,
    altText: row.alt_text,
    createdAt: row.created_at
  };
}

function mapManagedImage(row: ManagedImageRow): ManagedImage {
  return {
    id: row.id,
    section: row.section,
    imageUrl: row.image_url,
    mobileImageUrl: row.mobile_image_url,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    sortOrder: row.sort_order,
    isActive: row.is_active,
    createdAt: row.created_at
  };
}

function mapPreviousSchools(raw: unknown): PreviousSchool[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const data = item as Partial<PreviousSchool>;
    return [
      {
        name: data.name ?? "",
        since: data.since ?? "",
        to: data.to ?? ""
      }
    ];
  });
}

function mapAdmission(row: AdmissionApplicationRow): AdmissionApplication {
  return {
    id: row.id,
    surname: row.surname,
    foreName: row.fore_name,
    dateOfBirth: row.date_of_birth,
    religiousBelief: row.religious_belief,
    passportPhotoUrl: row.passport_photo_url,
    previousSchools: mapPreviousSchools(row.previous_schools),
    vaccinationPolio: row.vaccination_polio,
    vaccinationTyphoid: row.vaccination_typhoid,
    vaccinationMeasles: row.vaccination_measles,
    healthOthers: row.health_others,
    parentName: row.parent_name,
    residence: row.residence,
    email: row.email,
    telHome: row.tel_home,
    telOffice: row.tel_office,
    occupation: row.occupation,
    nin: row.nin,
    nextOfKin: row.next_of_kin,
    declarationAccepted: row.declaration_accepted,
    digitalSignature: row.digital_signature,
    signedDate: row.signed_date,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const params = new URLSearchParams();
  params.set("select", "id,email,name,image,password_hash,role");
  params.set(...eqFilter("email", email));
  params.set("limit", "1");
  const rows = await selectRows<AdminUserRow>("admin_users", { params });
  const row = rows[0];
  return row ? mapAdminUser(row) : null;
}

export async function countAdmissions(status?: AdmissionStatus): Promise<number> {
  const params = new URLSearchParams();
  if (status) {
    params.set(...eqFilter("status", status));
  }
  return countRows("admission_applications", { params });
}

export async function countGalleryImages(): Promise<number> {
  return countRows("gallery_images");
}

export async function listAdmissions(status?: string): Promise<AdmissionApplication[]> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "created_at.desc");
  params.set("limit", "50");
  if (status && status !== "all") {
    params.set(...eqFilter("status", status));
  }

  const rows = await selectRows<AdmissionApplicationRow>("admission_applications", { params });
  return rows.map(mapAdmission);
}

export async function getAdmissionById(id: string): Promise<AdmissionApplication | null> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set(...eqFilter("id", id));
  params.set("limit", "1");
  const rows = await selectRows<AdmissionApplicationRow>("admission_applications", { params });
  const row = rows[0];
  return row ? mapAdmission(row) : null;
}

type CreateAdmissionInput = Omit<AdmissionApplication, "id" | "status" | "createdAt" | "updatedAt">;

export async function createAdmission(input: CreateAdmissionInput): Promise<void> {
  await insertRow("admission_applications", {
    surname: input.surname,
    fore_name: input.foreName,
    date_of_birth: input.dateOfBirth,
    religious_belief: input.religiousBelief,
    passport_photo_url: input.passportPhotoUrl,
    previous_schools: input.previousSchools,
    vaccination_polio: input.vaccinationPolio,
    vaccination_typhoid: input.vaccinationTyphoid,
    vaccination_measles: input.vaccinationMeasles,
    health_others: input.healthOthers,
    parent_name: input.parentName,
    residence: input.residence,
    email: input.email,
    tel_home: input.telHome,
    tel_office: input.telOffice,
    occupation: input.occupation,
    nin: input.nin,
    next_of_kin: input.nextOfKin,
    declaration_accepted: input.declarationAccepted,
    digital_signature: input.digitalSignature,
    signed_date: input.signedDate
  });
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "created_at.desc");
  const rows = await selectRows<GalleryImageRow>("gallery_images", { params });
  return rows.map(mapGalleryImage);
}

export async function addGalleryImage(input: { imageUrl: string; altText: string }): Promise<void> {
  await insertRow("gallery_images", {
    image_url: input.imageUrl,
    alt_text: input.altText
  });
}

export async function getGalleryImageById(id: string): Promise<GalleryImage | null> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set(...eqFilter("id", id));
  params.set("limit", "1");
  const rows = await selectRows<GalleryImageRow>("gallery_images", { params });
  const row = rows[0];
  return row ? mapGalleryImage(row) : null;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await deleteRows("gallery_images", [eqFilter("id", id)]);
}

export async function listManagedImages(section?: MediaSection): Promise<ManagedImage[]> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "sort_order.asc,created_at.desc");
  if (section) {
    params.set(...eqFilter("section", section));
  }
  const rows = await selectRows<ManagedImageRow>("managed_images", { params });
  return rows.map(mapManagedImage);
}

export async function getManagedImageById(id: string): Promise<ManagedImage | null> {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set(...eqFilter("id", id));
  params.set("limit", "1");
  const rows = await selectRows<ManagedImageRow>("managed_images", { params });
  const row = rows[0];
  return row ? mapManagedImage(row) : null;
}

export async function addManagedImage(input: {
  section: MediaSection;
  imageUrl: string | null;
  mobileImageUrl: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}): Promise<void> {
  await insertRow("managed_images", {
    section: input.section,
    image_url: input.imageUrl,
    mobile_image_url: input.mobileImageUrl,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    sort_order: input.sortOrder,
    is_active: input.isActive
  });
}

export async function updateManagedImage(
  id: string,
  input: {
    section: MediaSection;
    imageUrl: string | null;
    mobileImageUrl: string | null;
    title: string;
    subtitle: string | null;
    description: string | null;
    sortOrder: number;
    isActive: boolean;
  }
): Promise<void> {
  await updateRows(
    "managed_images",
    {
      section: input.section,
      image_url: input.imageUrl,
      mobile_image_url: input.mobileImageUrl,
      title: input.title,
      subtitle: input.subtitle,
      description: input.description,
      sort_order: input.sortOrder,
      is_active: input.isActive
    },
    [eqFilter("id", id)]
  );
}

export async function deleteManagedImage(id: string): Promise<void> {
  await deleteRows("managed_images", [eqFilter("id", id)]);
}

