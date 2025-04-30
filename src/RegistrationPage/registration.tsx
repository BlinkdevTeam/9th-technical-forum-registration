import { useState } from "react";
import supabase from "../../lib/supabaseClient";
import emailjs from "@emailjs/browser";
import "./style.css";
import TechnicalForum from "../assets/BI_9thCATF_LOGO.png";
import BILogo from "../assets/BI_LOGO_NEONGREEN.png";
import BIDog from "../assets/Boehringer_AnimalCare_Dog_WalkingtheDog-01_CMYK_002 copy.jpg";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setMessage("");

    const { error } = await supabase
      .from("medical_professionals")
      .insert([formData]);

    if (error) {
      console.error("Error inserting record:", error.message);
      setMessage("Registration failed. Please try again.");
    } else {
      sendConfirmationEmail(); // ✅ Send email on success
      setMessage("Registration successful!");
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

    setLoading(false);
  };

  return (
    <>
      <main className="w-screen overflow-x-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-[40%_60%]">
          <div className="bg-[#08312A] w-full min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col overflow-hidden px-4">
              <div className="flex flex-col justify-start items-start max-w-screen-lg w-full gap-16 px-4">
                <div>
                  <img
                    src={BILogo}
                    alt="Boehringer Ingelheim"
                    className="mx-auto h-10 md:h-14"
                  />
                </div>
                <div>
                  <img
                    src={TechnicalForum}
                    alt="Technical Forum Logo"
                    className="mx-auto h-40 md:h-64"
                  />
                </div>
                <div>
                  <h3 className="font-bold sub-bi-heading text-start">
                    Join us for a day of insightful discussions and updates in
                    companion animal health — May 28, 2025 at Crimson Hotel,
                    Alabang, Muntinlupa City. Secure your spot today!
                  </h3>
                </div>
              </div>
            </div>

            {/* Absolute "Life Forward" over dog image */}
            <div className="w-full relative">
              <div className="flex justify-center items-center">
                <img
                  src={BIDog}
                  alt="Dog"
                  className="mx-auto w-full object-cover"
                />
              </div>
              <p className="absolute bottom-4 right-8 text-white sub-bi-paragraph z-10">
                Life Forward
              </p>
            </div>
          </div>

          <div className="bg-[#F6F5F3] text-black">
            <form
              onSubmit={handleSubmit}
              className="max-w-full p-4 rounded space-y-3 text-start"
            >
              <p className="text-[16px]">LET’S GET YOU STARTED</p>
              <h2>Register</h2>
              <div className="flex flex-col">
                <p className="text-[16px]">Your email</p>
                <input
                  name="email_address"
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email_address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <p className="text-[16px]">First Name</p>
                  <input
                    name="first_name"
                    required
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[16px]">Middle Name</p>
                  <input
                    name="middle_name"
                    placeholder="Middle name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <p className="text-[16px]">Last Name</p>
                  <input
                    name="last_name"
                    required
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[16px]">Name of Clinic / Hospital</p>
                  <input
                    name="clinic"
                    placeholder="Name of Clinic/Hospital"
                    value={formData.clinic}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <p className="text-[16px]">Address</p>
                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[16px]">Mobile Number</p>
                  <input
                    name="mobile_number"
                    required
                    placeholder="Mobile number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <p className="text-[16px]">PRC License</p>
                  <input
                    name="prc_license"
                    required
                    placeholder="PRC License"
                    value={formData.prc_license}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[16px]">PRC Card Expiration</p>
                  <input
                    name="prc_expiration"
                    type="date"
                    required
                    placeholder="PRC Card Expiration"
                    value={formData.prc_expiration}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              {message && <p className="text-center mt-2">{message}</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
