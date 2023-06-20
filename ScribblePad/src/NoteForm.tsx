import { FormEvent, useEffect, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"
import axios from 'axios'

type NoteFormProps = {
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
  edit: boolean
} & Partial<NoteData>

export function NoteForm({
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
  edit
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()



  useEffect(() => {
    axios.get('/api/validSession' )
    .then(response => {
      if(response.data.validSession !== true){
        navigate('/')
      }
    })
  },[])
  

  function handleSubmit(e: FormEvent, edit:boolean = false) {
    e.preventDefault()

    if(edit === false){

    axios.post('/api/addNote', {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    }).then(response => {
      console.log(response.data)
    })
  } else {
    axios.post('/api/editNote', {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    }).then(response => {
      console.log(response.data)
    })

  }
    navigate("/create",)
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e,edit)}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="/create">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
