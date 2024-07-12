import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { PostableStatus } from '#posts/enums/postable_status'
import { PostableType } from '#posts/enums/postable_type'

interface AnswerFormProps {
  onSubmit: (questionData: AnswerFormData) => void
}

interface AnswerFormData {
  content: string
  status: PostableStatus
  postableId: string
  postableType: PostableType
}

const AnswerForm: React.FC<AnswerFormProps> = () => {
  const [questionData, setFormData] = useState<Partial<AnswerFormData>>({
    content: '',
    status: PostableStatus.DRAFT,
    postableId: '',
    postableType: PostableType.QUESTION,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    questionData.postableType = PostableType.ANSWER
    e.preventDefault()
    router.post('/answers', questionData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={questionData.content}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          value={questionData.status}
          id="status"
          name="status"
          onChange={handleChange}
          required
        >
          <option value={PostableStatus.DRAFT}>Draft</option>
          <option value={PostableStatus.PUBLISHED}>Published</option>
        </select>
      </div>
      <div>
        <label htmlFor="postableId">postableId:</label>
        <input
          type="text"
          id="postableId"
          name="postableId"
          value={questionData.postableId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AnswerForm
