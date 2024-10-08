import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { PostableStatus } from '#posts/enums/postable_status'
import { PostableType } from '#posts/enums/postable_type'

interface QuestionFormProps {
  onSubmit: (questionData: QuestionFormData) => void
}

interface QuestionFormData {
  content: string
  status: PostableStatus
  relativeTo: string
  postableType: PostableType
}

const QuestionForm: React.FC<QuestionFormProps> = () => {
  const [questionData, setFormData] = useState<Partial<QuestionFormData>>({
    content: '',
    status: PostableStatus.DRAFT,
    relativeTo: '',
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
    questionData.postableType = PostableType.QUESTION
    e.preventDefault()
    router.post('/questions', questionData)
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
        <label htmlFor="relativeTo">relativeTo:</label>
        <input
          type="text"
          id="relativeTo"
          name="relativeTo"
          value={questionData.relativeTo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default QuestionForm
