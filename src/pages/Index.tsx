import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import CourseList from "@/components/CourseList";
import QuoteBox from "@/components/QuoteBox";
import coursesData from "@/data/courses.json";

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return coursesData as Course[];
    }

    const query = searchQuery.toLowerCase().trim();
    return (coursesData as Course[]).filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1 className="app-title">Course Finder</h1>
        <p className="app-subtitle">Discover your next learning adventure</p>
      </header>

      <QuoteBox />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <p className="results-count">
        {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
      </p>

      <CourseList courses={filteredCourses} searchQuery={searchQuery} />
    </main>
  );
};

export default Index;
