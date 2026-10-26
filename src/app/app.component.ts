import { Component } from '@angular/core';

// user Defined Components
import { NotesComponent } from './component/notes/NotesComponent';

@Component({
  selector: 'app-root',
  imports: [NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
