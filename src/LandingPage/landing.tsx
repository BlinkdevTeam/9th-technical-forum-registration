import TechnicalForum from "../assets/BI_9thCATF_LOGO.png";
import BILogo from "../assets/BI_LOGO_NEONGREEN.png";

export default function Home() {
  return (
    <main className="w-screen">
      <div className="bg-[#08312A] text-white w-full min-h-screen flex flex-col justify-center items-center px-4 py-12">
        <div className="flex flex-col justify-center items-center max-w-screen-lg w-full gap-16">
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
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
              MAY 28, 2025 | 9:00 - 4:00 PM
              <br />
              Crimson Hotel, Alabang, Muntinlupa City
            </h3>
          </div>
          <div>
            <p className="text-[#00E47C] text-2xl md:text-3xl font-bold italic">
              Life Forward
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
