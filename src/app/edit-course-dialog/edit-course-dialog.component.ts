import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CourseCategory } from '../models/course-category.model';
import { EditCourseDialogData } from './edit-course.type';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
  providers: [DialogService],
})
export class EditCourseDialogComponent implements OnInit {
  fb = inject(FormBuilder);
  public dialogref = inject(DynamicDialogRef);
  private dialogService = inject(DialogService);
  public config = inject(DynamicDialogConfig);
  coursesService = inject(CoursesService);

  editData!: EditCourseDialogData;

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    courseCategory: [''],
    iconUrl: [''],
  });

  category = signal<CourseCategory>('BEGINNER');

  ngOnInit(): void {
    this.editData = this.config.data;
    this.form.patchValue({
      title: this.editData?.course?.title,
      longDescription: this.editData?.course?.longDescription,
      iconUrl: this.editData.course?.iconUrl,
    });
    this.category.set(this.editData?.course?.category ?? 'BEGINNER');
  }

  onClose() {
    this.dialogref.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    console.log(this.editData);
    if (this.editData?.mode === 'update') {
      await this.saveCourse(this.editData?.course!.id, courseProps);
    } else if (this.editData?.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.coursesService.saveCourse(
        courseId,
        changes
      );
      this.dialogref.close(updatedCourse);
    } catch (e) {
      console.log(e);
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const updatedCourse = await this.coursesService.createCourse(course);
      this.dialogref.close(updatedCourse);
    } catch (e) {
      console.log(e);
    }
  }
}

export async function openEditCourseDialog(
  dialog: DialogService,
  data: EditCourseDialogData
) {
  const config = new DynamicDialogConfig();
  config.width = '400px';
  config.data = data;

  const closed$ = dialog.open(EditCourseDialogComponent, config).onClose;

  return firstValueFrom(closed$);
}
