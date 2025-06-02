import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private ruta: Router) { }

  ngOnInit(): void {
  }
  openDropdowns: { [key: string]: boolean } = {};

  toggleDropdown(id: string): void {
    this.openDropdowns[id] = !this.openDropdowns[id];
  }

  isOpen(id: string): boolean {
    return this.openDropdowns[id];
  }

}
