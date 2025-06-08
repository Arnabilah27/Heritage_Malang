import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-2">
        {/* Contact Us */}
        <div className="flex flex-col flex-1 gap-2 pt-8 pb-4 md:pt-12 md:pb-15">
          <div className="flex flex-col gap-2 text-center">
            <h3 className="text-xl text-white font-semibold mb-4">
              Contact Us
            </h3>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 justify-center items-center">
            <div className="flex flex-col text-center">
              <button className="w-[300px] px-4 py-2 text-[#343A40] border border-[#343A40] rounded-full bg-transparent">
                +6287893850867
              </button>
            </div>
            <div className="flex flex-col text-center">
              <button className="w-[300px] px-4 py-2 text-[#343A40] border border-[#343A40] rounded-full bg-transparent">
                5016211114@Student.its.ac.id
              </button>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col flex-1 gap-2 pt-8 pb-4 md:pt-12 md:pb-15">
          <div className="flex flex-col gap-2 text-center">
            <h3 className="text-xl text-white font-semibold mb-3">Address</h3>
          </div>
          <div className="flex flex-col gap-2 text-center md:flex-row">
            <div className="flex flex-col flex-1">
              <p>Departemen Teknik Geomatika - ITS,</p>
              <p>Jl. Despro, Surabaya.</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col flex-1 gap-1 pt-8 pb-6 md:pt-12 md:pb-15">
          <div className="flex flex-col gap-2 text-center">
            <h3 className="text-xl text-white font-semibold mb-3">
              Social Media
            </h3>
          </div>
          <div className="flex flex-row gap-2 text-center justify-center">
            <Link to="https://www.instagram.com/arnabila_">
              <img
                src="/instagram.webp"
                alt="Instagram"
                className="w-12 h-12"
              />
            </Link>
            <Link to="https://wa.me/6287893850867">
              <img src="/whatsapp.webp" alt="WhatsApp" className="w-11 h-11" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
