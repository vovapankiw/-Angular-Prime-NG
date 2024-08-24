import { LoadingService } from './loading.service';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);

  loading = this.loadingService.loading;
}
