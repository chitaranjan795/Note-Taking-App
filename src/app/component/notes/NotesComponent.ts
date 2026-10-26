import { Component, computed, effect, signal } from '@angular/core';
import { Note } from '../note/note.model';
// import { NoteEditorComponent } from '../note/note-editor.component';

import { NoteEditorComponent } from '../note/NoteEditorComponent';

const STORAGE_KEY = 'notes';

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed as Note[];
      }
    }
  } catch {
    // storage blocked or data corrupted: start empty
  }
  return [];
}

@Component({
  selector: 'app-notes',
  imports: [NoteEditorComponent],
  templateUrl: './notesComponent.html',
  styleUrl: './notesComponent.scss',
})
export class NotesComponent {
  // ---- State ----
  notes = signal<Note[]>(loadNotes());
  searchText = signal('');
  selectedId = signal<number | null>(null);

  // ---- Derived state ----
  filteredNotes = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    return this.notes().filter(
      (n) =>
        n.title.toLowerCase().includes(search) ||
        n.content.toLowerCase().includes(search),
    );
  });

  selectedNote = computed(
    () => this.notes().find((n) => n.id === this.selectedId()) ?? null,
  );

  constructor() {
    // Saves to localStorage every time `notes` changes (every keystroke)
    effect(() => {
      const data = JSON.stringify(this.notes());
      try {
        localStorage.setItem(STORAGE_KEY, data);
      } catch {
        // storage full or blocked: ignore
      }
    });
  }

  // ---- Actions ----
  addItem() {
    this.removeSelectedIfEmpty();

    const newNote: Note = { id: Date.now(), title: '', content: '' };
    this.searchText.set('');
    this.notes.update((list) => [newNote, ...list]);
    this.selectedId.set(newNote.id);
  }

  openContent(id: number) {
    if (id === this.selectedId()) return;
    this.removeSelectedIfEmpty();
    this.selectedId.set(id);
  }

  updateNote(changes: Partial<Note>) {
    const id = this.selectedId();
    this.notes.update((list) =>
      list.map((n) => (n.id === id ? { ...n, ...changes } : n)),
    );
  }

  deleteNote(id: number) {
    this.notes.update((list) => list.filter((n) => n.id !== id));
    if (this.selectedId() === id) {
      this.selectedId.set(null);
    }
  }

  // Removes a completely blank note when the user leaves it
  private removeSelectedIfEmpty() {
    const current = this.selectedNote();
    if (current && !current.title.trim() && !current.content.trim()) {
      this.notes.update((list) => list.filter((n) => n.id !== current.id));
    }
  }
}
