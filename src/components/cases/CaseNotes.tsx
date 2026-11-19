import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Case, Note } from '../../types';
import { FileEdit, Plus, Trash2, Edit3, Check, Clock } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

interface CaseNotesProps {
  currentCase: Case;
  notes: Note[];
}

export const CaseNotes: React.FC<CaseNotesProps> = ({ currentCase, notes }) => {
  const { addNote, updateNote, deleteNote } = useApp();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const caseNotes = notes.filter(n => n.case_id === currentCase.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addNote(currentCase.id, newNoteContent.trim());
    setNewNoteContent('');
  };

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editContent.trim()) return;
    updateNote(noteId, editContent.trim());
    setEditingNoteId(null);
  };

  return (
    <div className="bg-[#10131A] rounded-2xl border border-[#252B38] p-6 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center gap-2">
          <FileEdit className="w-4 h-4 text-violet-400" />
          <h3 className="text-base font-bold text-[#F8FAFC]">
            Private Workspace Notes
          </h3>
        </div>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Internal recollections, agent names, phone call observations, or personal strategies.
        </p>
      </div>

      {/* Note input */}
      <form onSubmit={handleAddNote} className="space-y-2">
        <textarea
          rows={3}
          value={newNoteContent}
          onChange={e => setNewNoteContent(e.target.value)}
          placeholder="Type an internal note, phone call summary, or personal observation..."
          className="w-full p-3 bg-[#171B25] border border-[#252B38] rounded-xl text-xs text-[#F8FAFC] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newNoteContent.trim()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Save Private Note</span>
          </button>
        </div>
      </form>

      {/* Notes list */}
      {caseNotes.length === 0 ? (
        <div className="py-6 text-center text-xs text-zinc-500 italic">
          No private notes logged for this case.
        </div>
      ) : (
        <div className="space-y-3">
          {caseNotes.map(note => {
            const isEditing = editingNoteId === note.id;

            return (
              <div
                key={note.id}
                className="p-4 rounded-xl bg-[#171B25] border border-[#252B38] space-y-2"
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full p-2.5 bg-[#10131A] border border-[#252B38] rounded-lg text-xs text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-3 py-1 bg-[#10131A] text-zinc-400 rounded-lg text-xs font-semibold hover:bg-[#252B38] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(note.id)}
                        className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="pt-2 border-t border-[#252B38] flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDateTime(note.updated_at || note.created_at)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="hover:text-zinc-300 transition-colors"
                          title="Edit note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="hover:text-rose-400 transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
