import { SidebarService } from './sidebar.service';
import { Component, inject, model, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { LogoComponent } from '../logo/logo.component';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    LogoComponent,
    RippleModule,
    StyleClassModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly sidebarService = inject(SidebarService);

  readonly sidebarVisible = this.sidebarService.sidebarVisible;

  closeCallback() {
    this.sidebarService.close();
  }
}
