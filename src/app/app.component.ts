import { Component } from '@angular/core';

// user Defined Components
import { NotesComponent } from './Components/notes/notes.component';
import { WorkingAreaComponent } from './Components/working-area/working-area.component';

@Component({
  selector: 'app-root',
  imports: [NotesComponent, WorkingAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
