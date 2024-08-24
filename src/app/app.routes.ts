import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './course/course.resolver';
import { LessonsResolver } from './course/lessons.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    resolve: {
      course: courseResolver,
      lessons: LessonsResolver,
    },
  },
];
