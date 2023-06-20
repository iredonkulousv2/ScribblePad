import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"
import { Tag } from "./App"

type EditNote = {
  title: string
  markdown: string
  tags: Tag[],
  _id : string,
  userId: string
}

type NoteLayoutProps = {
  notes: EditNote[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  // console.log(useParams())
  // console.log('Note Layout id', id)
  //console.log('clicked Note',notes)
   const note = notes.find(n => n._id === id)

   if (note == null) return <Navigate to="/" replace />
  console.log('clicked Note',note)
  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<EditNote>()
}
