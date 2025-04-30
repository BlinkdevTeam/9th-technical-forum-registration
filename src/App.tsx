import { useState } from "react";
import supabase from "../lib/supabaseClient";
import emailjs from "@emailjs/browser";

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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded space-y-3"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Medical Professional Registration
      </h2>

      <input
        name="email_address"
        type="email"
        required
        placeholder="Email address"
        value={formData.email_address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="first_name"
        required
        placeholder="First name"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="middle_name"
        placeholder="Middle name"
        value={formData.middle_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="last_name"
        required
        placeholder="Last name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="clinic"
        placeholder="Name of Clinic/Hospital"
        value={formData.clinic}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="mobile_number"
        required
        placeholder="Mobile number"
        value={formData.mobile_number}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="prc_license"
        required
        placeholder="PRC License"
        value={formData.prc_license}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="prc_expiration"
        type="date"
        required
        placeholder="PRC Card Expiration"
        value={formData.prc_expiration}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Submitting..." : "Register"}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
