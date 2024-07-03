import React, { useState } from 'react'
import { router } from '@inertiajs/react'

interface TalkFormProps {
  onSubmit: (formData: TalkFormData) => void
}

interface TalkFormData {
  title: string
  description: string
  start_date_time: string
  end_date_time: string
  location: string
  event_id: string
  collaborator_ids: string
}

const TalkForm: React.FC<TalkFormProps> = () => {
  const [formData, setFormData] = useState<Partial<TalkFormData>>({
    title: '',
    description: '',
    start_date_time: '',
    end_date_time: '',
    location: '',
    event_id: '',
    collaborator_ids: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.post('/talks', {
      ...formData,
      collaborator_ids: formData.collaborator_ids?.split(' '),
    })
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="start_date_time">Start Date And Time:</label>
        <input
          type="datetime-local"
          id="start_date_time"
          name="start_date_time"
          value={formData.start_date_time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="end_date_time">End Date and Time:</label>
        <input
          type="datetime-local"
          id="end_date_time"
          name="end_date_time"
          value={formData.end_date_time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="event_id">Event ID:</label>
        <input
          type="text"
          id="event_id"
          name="event_id"
          value={formData.event_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="collaborator_ids">Collaborator IDs:</label>
        <input
          type="text"
          id="collaborator_ids"
          name="collaborator_ids"
          value={formData.collaborator_ids}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default TalkForm
