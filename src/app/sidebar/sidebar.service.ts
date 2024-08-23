import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  #sidebarVisible = signal<boolean>(false);
  sidebarVisible = this.#sidebarVisible.asReadonly();

  open() {
    this.#sidebarVisible.set(true);
  }

  close() {
    this.#sidebarVisible.set(false);
  }
}
