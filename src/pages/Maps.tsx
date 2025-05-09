import DestinationSlider from "@/components/Maps/DestinationSlider";

export default function Maps() {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <section className="w-full md:w-2/3 h-[300px] md:h-screen order-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.33876397018!2d112.54938048525975!3d-7.978467194606789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1746750755154!5m2!1sen!2sid"
          className="w-full h-full border-0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      <section className="w-full md:w-1/3 order-2">
        <DestinationSlider />
      </section>
    </div>
  );
}
