import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo, useState } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"
import { Login } from "./Login"
import {Signup} from "./Signup"
import axios from "axios"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
  _id: string
}

export type Tag = {
  id: string
  label: string
}

function App() {
 
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const [retrievedNotes,setRetrievedNotes] = useState([])


  function onDeleteNote(id: string, title: string) {
 
    axios.post('/api/deleteNote', {title})
    .then(response => {
      console.log(response.data)
    })

  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
          <Login/>
        }
        />
        <Route
          path="/signup"
          element={
          <Signup/>
        }
        />
        <Route
          path="/create"
          element={
            <NoteList
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
              retrievedNotes={retrievedNotes}
              setRetrievedNotes={setRetrievedNotes}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id" element={<NoteLayout notes={retrievedNotes} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
