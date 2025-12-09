import { useMemo, useState } from 'react'

type Priority = 'low' | 'medium' | 'high'

type FormState = {
  title: string
  description: string
  dueDate: string
  priority: Priority
  tags: string
}

type Submission = Omit<FormState, 'tags'> & { tags: string[] }

const emptyForm: FormState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  tags: '',
}

function Todo() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null)

  const tagList = useMemo(
    () =>
      form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  )

  const handleChange =
    (key: keyof FormState) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const payload: Submission = { ...form, tags: tagList }
    setLastSubmission(payload)
    console.log('New task', payload)
  }

  const resetForm = () => setForm(emptyForm)

  return (
    <main className="app-shell">
      <section className="form-card">
        <header className="form-header">
          <p className="eyebrow">Create task</p>
          <h1>Plan a todo</h1>
          <p className="hint">
            Capture the essentials: title, when it is due, and how important it
            is. Tags help with grouping.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Title</span>
            <input
              required
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title')(e.target.value)}
              placeholder="Ship the UI refresh"
            />
          </label>

          <label>
            <span>Description (optional)</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description')(e.target.value)}
              placeholder="What needs to happen? Add links or notes here."
            />
          </label>

          <div className="field-grid">
            <label>
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange('dueDate')(e.target.value)}
              />
            </label>

            <label>
              <span>Priority</span>
              <select
                value={form.priority}
                onChange={(e) =>
                  handleChange('priority')(e.target.value as Priority)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <label>
            <span>Tags (comma separated)</span>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => handleChange('tags')(e.target.value)}
              placeholder="frontend, qa, release"
            />
            <p className="hint">Use commas to add multiple tags.</p>
          </label>

          <div className="form-actions">
            <button type="submit">Save task</button>
            <button type="button" className="ghost" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>

        <footer className="preview">
          <div>
            <h2>Live preview</h2>
            <p className="hint">
              This mirrors what will be saved. Submit to log the payload.
            </p>
          </div>

          <div className="preview-card">
            <h3>{form.title || 'Untitled task'}</h3>
            <p className="muted">
              {form.description || 'Add a short description to give context.'}
            </p>
            <div className="meta">
              <span className={`pill pill-${form.priority}`}>
                Priority: {form.priority}
              </span>
              <span className="pill">
                Due: {form.dueDate || 'No date set'}
              </span>
            </div>
            <div className="tags">
              {tagList.length ? (
                tagList.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="muted">No tags yet</span>
              )}
            </div>
          </div>

          {lastSubmission && (
            <div className="submitted">
              <p className="eyebrow">Last saved</p>
              <p className="muted">
                Logged to console with {lastSubmission.tags.length} tag
                {lastSubmission.tags.length === 1 ? '' : 's'}.
              </p>
            </div>
          )}
        </footer>
      </section>
    </main>
  )
}

export default Todo

