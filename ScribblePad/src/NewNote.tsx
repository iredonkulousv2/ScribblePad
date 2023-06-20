import { NoteData, Tag } from "./App"
import { NoteForm } from "./NoteForm"

type NewNoteProps = {
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewNote({  onAddTag, availableTags }: NewNoteProps) {
 
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        
        onAddTag={onAddTag}
        availableTags={availableTags}
        edit={false}
      />
    </>
  )
}
