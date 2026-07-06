import Banner from "../components/Banner";
import FeaturedCourses from "../components/FeaturedCourses";
import Highlights from "../components/Highlights";

export default function Home() {
  const data = {
    title: "Just pure learning anytime, anywhere",
    content:
      "Your ultimate companion for discovering and upskilling. Book interactive classes and meet a community of friendly and passionate minds who love to learn just as much as you do.",
    destination: "/courses",
    buttonLabel: "Browse Our Courses",
  };

  return (
    <>
      <Banner data={data} />
      <Highlights />
      <FeaturedCourses />
    </>
  );
}
