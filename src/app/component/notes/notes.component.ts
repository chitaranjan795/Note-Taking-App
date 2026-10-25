import { Component, signal } from '@angular/core';

import { NoteWritingAreaComponent } from '../note/note_writing_area.component';

interface note {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-notes',
  imports: [NoteWritingAreaComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  notes = signal<note[]>([
    { id: Date.now(), title: 'HTML', content: 'Mark-up Language!' },
  ]);

  addItem() {
    const newNote = {
      id: Date.now(),
      title: 'JavaScript',
      content: 'scripting language!',
    };
    this.notes.update((currNote) => [...currNote, newNote]);
  }

  isOpenContent = signal(false);
  selectedNote = signal<note | null>(null);

  openContent(note: note) {
    this.selectedNote.set(note);
    this.isOpenContent.set(true);
  }
}
