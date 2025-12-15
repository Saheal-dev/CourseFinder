import { Clock, BookOpen } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className="course-card">
      <div className="course-card-badge">{course.category}</div>
      <h3 className="course-card-title">{course.title}</h3>
      <div className="course-card-meta">
        <span className="course-card-duration">
          <Clock size={16} />
          {course.duration}
        </span>
        <span className="course-card-icon">
          <BookOpen size={16} />
        </span>
      </div>
    </article>
  );
};

export default CourseCard;
