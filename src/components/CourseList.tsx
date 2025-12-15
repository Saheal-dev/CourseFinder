import CourseCard from "./CourseCard";

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
}

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
}

const CourseList = ({ courses, searchQuery }: CourseListProps) => {
  if (courses.length === 0) {
    return (
      <div className="no-courses">
        <p>No courses found matching "{searchQuery}"</p>
        <span>Try adjusting your search terms</span>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
