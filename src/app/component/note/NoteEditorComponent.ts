import { Component, input, output } from '@angular/core';
import { Note } from './note.model';

@Component({
  selector: 'app-note-editor',
  templateUrl: './NoteEditorComponent.html',
  styleUrl: './NoteEditorComponent.scss',
})
export class NoteEditorComponent {
  note = input.required<Note>();
  changed = output<Partial<Note>>();
}
