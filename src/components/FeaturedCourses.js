import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";

import PreviewCourses from "./PreviewCourses";

export default function FeaturedCourses() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (!data || data.length === 0) return;

        const shuffled = [...data].sort(() => 0.5 - Math.random());

        const selectedCourses = shuffled.slice(0, 4);

        const featured = selectedCourses.map((course) => (
          <PreviewCourses data={course} key={course._id} breakPoint={3} />
        ));

        setPreviews(featured);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Courses</h2>
      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
