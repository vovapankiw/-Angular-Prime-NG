import { ButtonModule } from 'primeng/button';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CourseCardListComponent } from '../course-card-list/course-card-list.component';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, TabViewModule, CourseCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(() => {
    const courses = this.#courses();

    return courses.filter(({ category }) => category === 'BEGINNER');
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();

    return courses.filter(({ category }) => category === 'ADVANCED');
  });

  ngOnInit(): void {
    this.loadCourses();
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses);
    } catch (error) {
      console.log(`loadCourses => ${error}`);
    }
  }
}
