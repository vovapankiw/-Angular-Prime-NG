import { Component, inject, input, output } from '@angular/core';
import { Course } from '../models/course.model';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import {
  EditCourseDialogComponent,
  openEditCourseDialog,
} from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-course-card-list',
  standalone: true,
  imports: [RouterLink, ImageModule, ButtonModule],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss',
  providers: [DialogService],
})
export class CourseCardListComponent {
  dialogService = inject(DialogService);
  courses = input.required<Course[]>();
  courseUpdated = output<Course>();

  onCourseDeleted(_t1: Course) {
    throw new Error('Method not implemented.');
  }

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(this.dialogService, {
      mode: 'update',
      course,
    });

    if (!newCourse) {
      return;
    }

    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  }
}
