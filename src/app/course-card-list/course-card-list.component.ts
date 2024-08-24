import { Component, input } from '@angular/core';
import { Course } from '../models/course.model';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-course-card-list',
  standalone: true,
  imports: [RouterLink, ImageModule, ButtonModule],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss',
})
export class CourseCardListComponent {
  onCourseDeleted(_t1: Course) {
    throw new Error('Method not implemented.');
  }
  onEditCourse(_t1: Course) {
    throw new Error('Method not implemented.');
  }
  courses = input.required<Course[]>();
}
