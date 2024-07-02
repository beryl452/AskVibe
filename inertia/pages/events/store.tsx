import React, { useState } from 'react'
import { router } from '@inertiajs/react'

interface EventFormProps {
  onSubmit: (formData: EventFormData) => void
}

interface EventFormData {
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  cover: File
  is_public: boolean
  organizer_id: string
}

const EventForm: React.FC<EventFormProps> = () => {
  const [formData, setFormData] = useState<Partial<EventFormData>>({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    is_public: false,
    organizer_id: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]:
        // @ts-ignore
          (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files.length > 0
            ? // @ts-ignore
              (e.target as HTMLInputElement).files[0]
            : null,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log(formData)
    e.preventDefault()
    // @ts-ignore
    router.post('/events', formData)
  }

  return (
    <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
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
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="datetime-local"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="end_date">End Date:</label>
        <input
          type="datetime-local"
          id="end_date"
          name="end_date"
          value={formData.end_date}
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
        <label htmlFor="cover">Cover:</label>
        <input type="file" id="cover" name="cover" onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="is_public">Is Public:</label>
        <input
          type="checkbox"
          id="is_public"
          name="is_public"
          checked={formData.is_public}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizer_id">Organizer ID:</label>
        <input
          type="text"
          id="organizer_id"
          name="organizer_id"
          value={formData.organizer_id}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default EventForm
