import LandingPage from "./LandingPage/landing";
// import React from "react";
// import {
//   Routes,
//   Route,
//   useNavigate,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import RegistrationPage from "./RegistrationPage/registration";
// import EmailVerificationPage from "./components/EmailVerification";

// function EmailVerificationWrapper() {
//   const navigate = useNavigate();

//   const handleVerified = (email:string) => {
//     navigate("/registration", { state: { email } });
//   };

//   return <EmailVerificationPage onVerified={handleVerified} />;
// }

// function RegistrationWrapper() {
//   const location = useLocation();
//   const email = location.state?.email;

//   // Prevent access if no email is passed
//   if (!email) return <Navigate to="/" />;

//   return <RegistrationPage email={email} />;
// }

export default function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <LandingPage />
        {/* <RegistrationPage /> */}
      </div>
      {/* <div className="flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<EmailVerificationWrapper />} />
          <Route path="/registration" element={<RegistrationWrapper />} />
        </Routes>
      </div> */}
    </>
  );
}
