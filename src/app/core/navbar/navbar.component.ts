import { Mountain } from './../../models/mountain.model';
import { ResortsService } from './../../service/resorts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  mountains: Mountain[] = [];

  constructor(private service: ResortsService) {}

  ngOnInit(): void {
    this.service.getMountains().subscribe((mountain: Mountain[]) => {
      this.mountains = mountain;
    });
  }
}
