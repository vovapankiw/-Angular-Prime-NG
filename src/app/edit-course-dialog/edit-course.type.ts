import { Course } from '../models/course.model';

export type EditCourseDialogData = {
  mode: 'create' | 'update';
  course?: Course;
};
