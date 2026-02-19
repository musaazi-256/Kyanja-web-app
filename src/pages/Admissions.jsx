import { useState } from "react";

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border rounded-md transition-all duration-200 outline-none
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-900"
          }
          ${
            error
              ? "border-red-500 ring-2 ring-red-100 focus:border-red-600 focus:ring-red-200"
              : "border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
          }
        `}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

const Admissions = () => {
  const [formData, setFormData] = useState({
    surname: "",
    forename: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    religious_belief: "",
    previous_school_1: "",
    previous_school_1_since: "",
    previous_school_1_to: "",
    previous_school_2: "",
    previous_school_2_since: "",
    previous_school_2_to: "",
    previous_school_3: "",
    previous_school_3_since: "",
    previous_school_3_to: "",
    vaccination_polio: false,
    vaccination_typhoid: false,
    vaccination_measles: false,
    health_others: "",
    parent_name: "",
    residence: "",
    email: "",
    tel_home: "",
    tel_office: "",
    occupation: "",
    nin: "",
    next_of_kin: "",
    signed_by: "",
    sign_date: "",
  });

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = null;
    if (
      [
        "surname",
        "forename",
        "parent_name",
        "email",
        "signed_by",
        "sign_date",
      ].includes(name) &&
      !value
    ) {
      error = "This field is required";
    }
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      error = "Please enter a valid email";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error on change if it exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPassportPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (passportPhoto) {
      data.append("passport_photo", passportPhoto);
    }
    data.append("_subject", "New Admission Submission - Kyanja Junior School");
    data.append("_template", "table");
    data.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/musaaziignatius@gmail.com",
        {
          method: "POST",
          body: data,
        },
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          surname: "",
          forename: "",
          dob_day: "",
          dob_month: "",
          dob_year: "",
          religious_belief: "",
          previous_school_1: "",
          previous_school_1_since: "",
          previous_school_1_to: "",
          previous_school_2: "",
          previous_school_2_since: "",
          previous_school_2_to: "",
          previous_school_3: "",
          previous_school_3_since: "",
          previous_school_3_to: "",
          vaccination_polio: false,
          vaccination_typhoid: false,
          vaccination_measles: false,
          health_others: "",
          parent_name: "",
          residence: "",
          email: "",
          tel_home: "",
          tel_office: "",
          occupation: "",
          nin: "",
          next_of_kin: "",
          signed_by: "",
          sign_date: "",
        });
        setPassportPhoto(null);
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-12 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-visible border border-gray-200">
        <div className="bg-primary text-white py-6 px-8 rounded-t-lg">
          <h1 className="text-3xl font-bold text-center">
            Pupil's Admission Form
          </h1>
          <p className="text-center text-primary-foreground/80 mt-2">
            Please fill in all details correctly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section A: Pupil's Personal Record */}
          <section>
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary/20 pb-2 mb-6">
              A. Pupil's Personal Record
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Text Fields Column */}
              <div className="md:col-span-2 space-y-5">
                <InputField
                  label="SURNAME:"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter surname"
                  error={errors.surname}
                />
                <InputField
                  label="FORE NAME:"
                  name="forename"
                  value={formData.forename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter fore name"
                  error={errors.forename}
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    DATE OF BIRTH (DD/MM/YY):
                  </label>
                  <div className="flex gap-4 items-center">
                    <InputField
                      name="dob_day"
                      value={formData.dob_day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="DD"
                      className="w-20"
                    />
                    <span className="text-gray-400 text-xl">/</span>
                    <InputField
                      name="dob_month"
                      value={formData.dob_month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="MM"
                      className="w-20"
                    />
                    <span className="text-gray-400 text-xl">/</span>
                    <InputField
                      name="dob_year"
                      value={formData.dob_year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="YYYY"
                      className="w-24"
                    />
                  </div>
                </div>
                <InputField
                  label="RELIGIOUS BELIEF:"
                  name="religious_belief"
                  value={formData.religious_belief}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* Passport Photo Column */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <div className="w-40 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-500 overflow-hidden relative group cursor-pointer hover:border-primary hover:bg-blue-50 transition-all">
                  {passportPhoto ? (
                    <img
                      src={URL.createObjectURL(passportPhoto)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-4xl mb-2">📷</span>
                      <span className="text-xs font-semibold">
                        PASSPORT PHOTO
                      </span>
                      <span className="text-[10px] text-center px-2 mt-1">
                        Click to upload
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center md:text-left w-40">
                  Recent color photo
                </p>
              </div>
            </div>

            {/* Previous Schools */}
            <div className="mt-8">
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Previous School(s) Attended and Dates
              </label>
              <div className="space-y-6 md:space-y-4">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center bg-gray-50 p-4 md:p-0 rounded-lg md:bg-transparent"
                  >
                    <span className="font-bold text-gray-500 w-4 pb-1 md:pb-3 hidden md:block">
                      {num}.
                    </span>
                    <span className="font-bold text-gray-500 text-sm md:hidden mb-1">
                      School {num}
                    </span>
                    <div className="flex-grow">
                      <InputField
                        name={`previous_school_${num}`}
                        value={formData[`previous_school_${num}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="School Name"
                      />
                    </div>
                    <div className="flex gap-4 md:gap-2">
                      <div className="flex gap-2 items-center flex-1 md:flex-none">
                        <span className="text-xs font-semibold text-gray-600 mb-1 whitespace-nowrap">
                          SINCE:
                        </span>
                        <InputField
                          name={`previous_school_${num}_since`}
                          value={formData[`previous_school_${num}_since`]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full md:w-24"
                        />
                      </div>
                      <div className="flex gap-2 items-center flex-1 md:flex-none">
                        <span className="text-xs font-semibold text-gray-600 mb-1 whitespace-nowrap">
                          TO:
                        </span>
                        <InputField
                          name={`previous_school_${num}_to`}
                          value={formData[`previous_school_${num}_to`]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full md:w-24"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Record */}
            <div className="mt-8">
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Pupil's Health Record
              </label>
              <div className="flex flex-wrap gap-8 items-center mb-6">
                <span className="text-sm font-semibold text-gray-700">
                  VACCINATION:
                </span>
                <label className="inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="vaccination_polio"
                    checked={formData.vaccination_polio}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-primary transition-colors">
                    POLIO
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="vaccination_typhoid"
                    checked={formData.vaccination_typhoid}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-primary transition-colors">
                    TYPHOID
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="vaccination_measles"
                    checked={formData.vaccination_measles}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700 group-hover:text-primary transition-colors">
                    MEASLES
                  </span>
                </label>
              </div>
              <InputField
                label="OTHERS (SPECIFY):"
                name="health_others"
                value={formData.health_others}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </section>

          {/* Section B: Parental/Guardian Record */}
          <section className="pt-4">
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary/20 pb-2 mb-6">
              B. Parental/Guardian Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <InputField
                  label="FATHER'S/MOTHER'S/GUARDIAN'S NAME:"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.parent_name}
                />
              </div>
              <InputField
                label="RESIDENCE:"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputField
                label="E-MAIL:"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.email}
              />
              <InputField
                label="TEL (HOME):"
                name="tel_home"
                type="tel"
                value={formData.tel_home}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputField
                label="TEL (OFFICE):"
                name="tel_office"
                type="tel"
                value={formData.tel_office}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="md:col-span-2">
                <InputField
                  label="OCCUPATION:"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="NIN:"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="NEXT OF KIN:"
                  name="next_of_kin"
                  value={formData.next_of_kin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </section>

          {/* Declaration */}
          <section className="bg-gray-100 p-6 rounded-lg mt-8 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              PARENT'S / GUARDIAN'S DECLARATION
            </h3>
            <p className="text-sm text-gray-700 italic mb-6 leading-relaxed">
              I declare that the information given above is true and correct to
              the best of my knowledge. I promise to co-operate with the
              school's administration in all matters concerning my child's
              school fees and health. I promise to abide with all the school
              rules and regulations.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex-grow">
                <InputField
                  label="SIGNED BY:"
                  name="signed_by"
                  value={formData.signed_by}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Type name as signature"
                  error={errors.signed_by}
                />
              </div>
              <div className="w-full md:w-1/3">
                <InputField
                  label="DATE:"
                  type="date"
                  name="sign_date"
                  value={formData.sign_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.sign_date}
                />
              </div>
            </div>
          </section>

          {/* Submit Button & Status */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary hover:shadow-xl"}`}
            >
              {isSubmitting
                ? "Submitting Application..."
                : "SUBMIT APPLICATION"}
            </button>

            {submitStatus === "success" && (
              <div className="text-green-600 font-semibold text-center bg-green-50 p-4 rounded-lg border border-green-200 w-full">
                Application submitted successfully! <br /> We will contact you
                shortly via email.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 font-semibold text-center bg-red-50 p-4 rounded-lg border border-red-200 w-full">
                Something went wrong. Please try again.
              </div>
            )}
            <p className="text-xs text-gray-400 text-center">
              This form is securely sent to musaaziignatius@gmail.com
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admissions;
