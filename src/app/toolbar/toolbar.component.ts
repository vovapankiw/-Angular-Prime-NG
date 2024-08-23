import { SidebarService } from './../sidebar/sidebar.service';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  siderbarService = inject(SidebarService);

  openSideBar() {
    this.siderbarService.open();
  }
}
