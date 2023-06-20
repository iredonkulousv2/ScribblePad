import { NoteData, Tag } from "./App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditNote({  onAddTag, availableTags }: EditNoteProps) {
  const note = useNote()
  
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onAddTag={onAddTag}
        availableTags={availableTags}
        edit={true}
      />
    </>
  )
}
