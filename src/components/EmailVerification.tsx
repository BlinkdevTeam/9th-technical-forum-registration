import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import supabase from "../../lib/supabaseClient";
import "../RegistrationPage/style.css";
import TechnicalForum from "../assets/BI_9thCATF_LOGO.png";
import BILogo from "../assets/BI_LOGO_NEONGREEN.png";
import BIDog from "../assets/Boehringer_AnimalCare_Dog_WalkingtheDog-01_CMYK_002 copy.jpg";

interface EmailVerificationPageProps {
  onVerified: (email: string) => void;
}

const SERVICE_ID = "service_1qkyi2i";
const TEMPLATE_ID = "template_wa8jkbd";
const USER_ID = "sOTpCYbD5KllwgbCD";

const Modal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-[8px] shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4">Notice</h2>
      <p className="text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="mt-6 bg-[#08312A] text-white py-2 px-4 rounded hover:bg-[#0a443a]"
      >
        Close
      </button>
    </div>
  </div>
);

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
  onVerified,
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const sendVerificationCode = async () => {
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    setLoading(true);

    // ✅ Check email existence in Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from("medical_professionals")
      .select("email_address")
      .eq("email_address", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking email existence:", fetchError.message);
      setModalMessage(
        "Something went wrong while checking the email. Please try again."
      );
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

    const generatedCode = generateCode();
    setSentCode(generatedCode);

    const templateParams = {
      email,
      code: generatedCode,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setStep(2);
    } catch (err) {
      console.error("Failed to send verification code:", err);
      setModalMessage("Failed to send verification code. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = () => {
    if (code === sentCode) {
      onVerified(email);
    } else {
      setModalMessage("Invalid verification code. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <main className="w-screen min-h-screen lg:max-h-screen overflow-hidden">
      <section className="grid grid-cols-1 lg:grid-cols-[40%_60%]">
        {/* Left Column */}
        <div className="bg-[#08312A] w-full min-h-screen grid grid-rows-[65%_35%] justify-start">
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

        {/* Right Column */}
        <div className="bg-[#F6F5F3] text-black flex flex-col justify-center">
          <div className="w-auto h-auto flex flex-col justify-center px-8 md:px-20 lg:px-24 py-12 rounded space-y-6 text-start">
            <div className="p-4 max-w-lg mx-auto w-full flex flex-col gap-4">
              <div>
                <h2 className="sub-bi-heading text-[#878787]">
                  LET’S GET YOU STARTED
                </h2>
                <h2 className="bi-heading text-[#08312A]">Register</h2>
              </div>
              {step === 1 && (
                <>
                  <div className="flex flex-col">
                    <h2 className="sub-bi-heading">Enter your email</h2>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="border p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#08312A]"
                    />
                    <p className="italic text-red-700 mt-4">
                      Note: Each email address can only be used once.
                    </p>
                    <button
                      onClick={sendVerificationCode}
                      disabled={loading}
                      className="py-3 submit mt-4 w-[148px] h-[60px]"
                    >
                      {loading ? "Sending..." : "Send Code"}
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-col">
                    <h2 className="sub-bi-heading">
                      Enter the code sent to {email}
                    </h2>
                    <input
                      type="text"
                      placeholder="6-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="border p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#08312A]"
                      maxLength={6}
                    />
                    <button
                      onClick={verifyCode}
                      disabled={code.length !== 6}
                      className="py-3 submit mt-4 w-[148px] h-[60px]"
                    >
                      Verify
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
};

export default EmailVerificationPage;
