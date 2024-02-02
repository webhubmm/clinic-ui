import Banner from "@/components/common/banner/Banner";
import NavBar from "@/components/common/navbar/Navbar";
import BookAppointment from "@/components/user-home-page/book-appointment/BookAppointment";
import Hero from "@/components/user-home-page/hero/Hero";

export default function Home() {
  return (
    <>
      <Banner
        left="2359 Still StreetKenton, OH 43326"
        right="Working hours: Mon - Fri - 09:00 am - 06:00 pm
            "
      ></Banner>
      <NavBar />
      <main>
        <Hero />
        <BookAppointment />
      </main>
    </>
  );
}
