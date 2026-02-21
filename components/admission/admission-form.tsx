"use client";

import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { submitAdmissionAction } from "@/app/(public)/admission/actions";
import { admissionSchema, type AdmissionInput } from "@/lib/validations/admission";

const defaultValues: AdmissionInput = {
  surname: "",
  foreName: "",
  dateOfBirth: "",
  religiousBelief: "",
  previousSchools: [
    { name: "", since: "", to: "" },
    { name: "", since: "", to: "" },
    { name: "", since: "", to: "" }
  ],
  vaccinationPolio: false,
  vaccinationTyphoid: false,
  vaccinationMeasles: false,
  healthOthers: "",
  parentName: "",
  residence: "",
  email: "",
  telHome: "",
  telOffice: "",
  occupation: "",
  nin: "",
  nextOfKin: "",
  declarationAccepted: true,
  digitalSignature: "",
  signedDate: new Date().toISOString().split("T")[0]
};

export function AdmissionForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<AdmissionInput>({
    resolver: zodResolver(admissionSchema),
    defaultValues
  });

  const schools = useFieldArray({ control, name: "previousSchools" });

  const onSubmit = (values: AdmissionInput, event?: React.BaseSyntheticEvent) => {
    const formElement = event?.target as HTMLFormElement | undefined;
    const passportInput = formElement?.elements.namedItem("passportPhoto") as HTMLInputElement | null;
    const passportFile = passportInput?.files?.[0];

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "previousSchools") {
          formData.append("previousSchools", JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
      if (passportFile) {
        formData.append("passportPhoto", passportFile);
      }

      const result = await submitAdmissionAction(formData);

      if (!result.success) {
        setError("root", { type: "manual", message: result.error });
        return;
      }

      reset(defaultValues);
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 rounded-3xl bg-white p-6 shadow-card md:p-10"
    >
      <section>
        <h2 className="text-xl font-bold text-brand-navy">Pupil&apos;s Record</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input label="Surname" error={errors.surname?.message} {...register("surname")} />
          <Input label="Fore Name" error={errors.foreName?.message} {...register("foreName")} />
          <Input label="Date of Birth" type="date" error={errors.dateOfBirth?.message} {...register("dateOfBirth")} />
          <Input label="Religious Belief" error={errors.religiousBelief?.message} {...register("religiousBelief")} />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Passport Photo</label>
            <input name="passportPhoto" type="file" accept="image/*" className="w-full rounded-xl border border-slate-300 p-3 text-sm" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy">Previous Schools (Up to 3)</h2>
        <div className="mt-5 space-y-4">
          {schools.fields.map((field, index) => (
            <div key={field.id} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-3">
              <Input label={`School ${index + 1} Name`} error={errors.previousSchools?.[index]?.name?.message} {...register(`previousSchools.${index}.name`)} />
              <Input label="Since" error={errors.previousSchools?.[index]?.since?.message} {...register(`previousSchools.${index}.since`)} />
              <Input label="To" error={errors.previousSchools?.[index]?.to?.message} {...register(`previousSchools.${index}.to`)} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy">Health Record</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Checkbox label="Polio" {...register("vaccinationPolio")} />
          <Checkbox label="Typhoid" {...register("vaccinationTyphoid")} />
          <Checkbox label="Measles" {...register("vaccinationMeasles")} />
          <Input label="Other Health Information" error={errors.healthOthers?.message} {...register("healthOthers")} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy">Parental / Guardian Record</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input label="Name" error={errors.parentName?.message} {...register("parentName")} />
          <Input label="Residence" error={errors.residence?.message} {...register("residence")} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input label="Tel (Home)" error={errors.telHome?.message} {...register("telHome")} />
          <Input label="Tel (Office)" error={errors.telOffice?.message} {...register("telOffice")} />
          <Input label="Occupation" error={errors.occupation?.message} {...register("occupation")} />
          <Input label="NIN" error={errors.nin?.message} {...register("nin")} />
          <Input label="Next of Kin" error={errors.nextOfKin?.message} {...register("nextOfKin")} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy">Declaration</h2>
        <div className="mt-5 space-y-4">
          <Checkbox label="I declare that the information provided is correct." {...register("declarationAccepted")} />
          <Input label="Digital Signature" error={errors.digitalSignature?.message} {...register("digitalSignature")} />
          <Input label="Date" type="date" error={errors.signedDate?.message} {...register("signedDate")} />
          {errors.root?.message ? <p className="text-sm text-red-600">{errors.root.message}</p> : null}
          {isSubmitSuccessful ? <p className="text-sm text-green-700">Application submitted successfully.</p> : null}
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/90 disabled:opacity-70"
      >
        {isPending ? "Submitting..." : "Submit Admission"}
      </button>
    </motion.form>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input {...props} className="w-full rounded-xl border border-slate-300 p-3 text-sm" />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
      <input type="checkbox" {...props} className="h-4 w-4 rounded border-slate-400" />
      {label}
    </label>
  );
}
