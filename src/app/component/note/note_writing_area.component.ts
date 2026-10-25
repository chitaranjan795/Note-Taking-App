import { Component, input } from '@angular/core';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note_writing_area.component.html',
  styleUrl: './note_writing_area.component.scss',
})
export class NoteWritingAreaComponent {
  id = input<number>();
  title = input<string>();
  content = input<string>();
}
