import { SkiPass } from './../models/skipass.model';
import { Weather } from './../models/weather.model';
import { Track } from './../models/track.model';
import { Resort } from './../models/resort.model';
import { ResortsService } from './../service/resorts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resorts',
  templateUrl: './resorts.component.html',
  styleUrls: ['./resorts.component.css'],
})
export class ResortsComponent implements OnInit {
  resortId: number = 0;

  resorts: Resort = new Resort();

  tracks: Track[] = [];

  weathers: Weather[] = [];

  skipasses: SkiPass[] = [];

  params = {
    sort: '',
    sortDirection: '',
  };

  constructor(private service: ResortsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.resortId = params['id'];

      this.getAllResorts();
      this.getAllTracks();
      this.getAllWeather();
      this.getAllSkiPasses();
    });
  }

  getAllResorts(): void {
    this.service.getResorts(this.resortId).subscribe((elem: any) => {
      this.resorts = elem;
    });
  }

  getAllTracks(): void {
    this.service
      .getTracks(this.resortId, this.params)
      .subscribe((elem: Track[]) => {
        this.tracks = elem;
      });
  }

  sortAllTracks(value: string): void {
    this.params.sort = value;
    this.getAllTracks();
  }

  getAllWeather(): void {
    this.service.getWeather(this.resortId).subscribe((elem: Weather[]) => {
      this.weathers = elem;
    });
  }

  getAllSkiPasses(): void {
    this.service.getSkiPass(this.resortId).subscribe((elem: SkiPass[]) => {
      this.skipasses = elem;
    });
  }
}
