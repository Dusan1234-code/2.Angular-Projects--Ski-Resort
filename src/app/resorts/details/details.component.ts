import { SkiPass } from './../../models/skipass.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { Weather } from 'src/app/models/weather.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  active = 1;

  @Input()
  track: Track[] = [];

  @Input()
  weather: Weather[] = [];

  @Input()
  skipass: SkiPass[] = [];

  @Output()
  emmiter: EventEmitter<string> = new EventEmitter();

  formGroup: FormGroup;

  constructor(private builder: FormBuilder) {
    this.formGroup = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  sortTracks(event: Event) {
    const newSort = (event.target as HTMLSelectElement).value;
    this.emmiter.emit(newSort);
  }

  onSubmit(): void {
    this.formGroup.reset();
  }
}
