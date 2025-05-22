import { useState } from "react";
import supabase from "../../lib/supabaseClient";
import emailjs from "@emailjs/browser";
import "../RegistrationPage/style.css";
import TechnicalForum from "../assets/BI_9thCATF_LOGO.png";
import BILogo from "../assets/BI_LOGO_NEONGREEN.png";
import BIDog from "../assets/Boehringer_AnimalCare_Dog_WalkingtheDog-01_CMYK_002 copy.jpg";

interface RegistrationPageProps {
  email: string;
}

export default function ManualRegistrationForm({
  email,
}: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    email_address: email || "", // pre-fill with prop
    first_name: "",
    middle_name: "",
    last_name: "",
    clinic: "",
    address: "",
    mobile_number: "",
    prc_license: "",
    prc_expiration: "",
  });

  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendConfirmationEmail = () => {
    const templateParams = {
      to_name: `${formData.first_name} ${formData.last_name}`,
      email: formData.email_address,
      clinic: formData.clinic,
    };

    emailjs
      .send(
        "service_1qkyi2i", // 🔁 Replace with actual service ID
        "template_ein4wz4", // 🔁 Replace with actual template ID
        templateParams,
        "sOTpCYbD5KllwgbCD" // 🔁 Replace with actual public key
      )
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Email sending error:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);
    setModalMessage("");

    // 🛑 Middle name validation
    if (formData.middle_name && formData.middle_name.trim().length === 1) {
      setModalMessage(
        "Middle name must be at least 2 characters long if provided."
      );
      setShowModal(true);
      setLoading(false);
      return;
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("medical_professionals")
      .select("*")
      .eq("email_address", formData.email_address)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking email existence:", fetchError.message);
      setModalMessage("Something went wrong. Please try again later.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (existingUser) {
      setModalMessage("This email is already registered.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("medical_professionals")
      .insert([formData]);

    if (error) {
      console.error("Error inserting record:", error.message);
      setModalMessage("Registration failed. Please try again.");
    } else {
      // Comment sendConfirmationEmail out to cancel the email verification
      sendConfirmationEmail();
      setModalMessage(
        "Registration successful! \n\nCheck your email to get your ticket to the event."
      );
      setFormData({
        email_address: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        clinic: "",
        address: "",
        mobile_number: "",
        prc_license: "",
        prc_expiration: "",
      });
    }

    setShowModal(true);
    setLoading(false);
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-[#08312A]">Notice</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 bg-[#08312A] text-white rounded hover:bg-[#06291E] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <main className="w-screen min-h-screen overflow-x-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-[40%_60%]">
          <div className="bg-[#08312A] w-full min-h-screen grid grid-rows-[65%_35%]">
            {/* Top 70% */}
            <div className="flex flex-col justify-center items-center overflow-hidden px-4 z-10">
              <div className="flex flex-col justify-start items-start max-w-screen-lg w-full gap-16 px-4">
                <div>
                  <img
                    src={BILogo}
                    alt="Boehringer Ingelheim"
                    className="mx-auto h-8 md:h-12 lg:h-12"
                  />
                </div>
                <div>
                  <img
                    src={TechnicalForum}
                    alt="Technical Forum Logo"
                    className="mx-auto h-32 md:h-48 lg:h-60"
                  />
                </div>
                <div>
                  <h3 className="sub-bi-heading2 text-start text-white">
                    Join us for a day of insightful discussions and updates in
                    companion animal health — May 28, 2025 at Crimson Hotel,
                    Alabang, Muntinlupa City. Secure your spot today!
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom 30% */}
            <div className="relative w-full h-full">
              <div className="flex justify-center items-center overflow-hidden w-full h-full">
                <img
                  src={BIDog}
                  alt="Dog"
                  className="mx-auto w-full h-full object-cover"
                />
              </div>
              <p className="absolute bottom-8 md:bottom-16 lg:bottom-32 right-8 text-white sub-bi-paragraph z-10">
                Life Forward
              </p>
            </div>
          </div>

          {/*FORM REGISTRATION*/}

          <div className="bg-[#F6F5F3] text-black flex flex-col justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-auto h-auto flex flex-col justify-center px-8 md:px-20 lg:px-24 py-12 rounded space-y-6 text-start"
            >
              <h2 className="sub-bi-heading text-[#878787]">
                LET’S GET YOU STARTED
              </h2>
              <h2 className="bi-heading text-[#08312A]">Register</h2>

              <div className="flex flex-col">
                <p className="sub-bi-heading text-[#344054]">Your email</p>
                <input
                  name="email_address"
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email_address}
                  //   readOnly
                  onChange={handleChange}
                  className="w-full p-3 border"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">First Name</p>
                  <input
                    name="first_name"
                    required
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">Middle Name</p>
                  <input
                    name="middle_name"
                    placeholder="Middle name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">Last Name</p>
                  <input
                    name="last_name"
                    required
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">
                    Name of Clinic / Hospital
                  </p>
                  <input
                    name="clinic"
                    placeholder="Name of Clinic/Hospital"
                    value={formData.clinic}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">Address</p>
                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">Mobile Number</p>
                  <input
                    name="mobile_number"
                    required
                    placeholder="Mobile number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">PRC License</p>
                  <input
                    name="prc_license"
                    required
                    placeholder="PRC License"
                    value={formData.prc_license}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="sub-bi-heading text-[#344054]">
                    PRC Card Expiration
                  </p>
                  <input
                    name="prc_expiration"
                    type="date"
                    placeholder="PRC Card Expiration"
                    required
                    value={formData.prc_expiration}
                    onChange={handleChange}
                    className="w-full p-3 border"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="py-3 w-[148px] h-[60px] submit"
              >
                {loading ? "Submitting" : "Submit"}
              </button>

              {/* {message && <p className="text-center mt-2">{message}</p>} */}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
