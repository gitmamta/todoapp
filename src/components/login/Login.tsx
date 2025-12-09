import { type FormEvent, useMemo, useState } from 'react'

type Mode = 'login' | 'register'

type FormState = {
  name: string
  email: string
  password: string
  confirm: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

function Login() {
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState<FormState>(emptyForm)
  const isRegister = mode === 'register'

  const title = useMemo(
    () => (isRegister ? 'Create an account' : 'Welcome back'),
    [isRegister],
  )

  const handleChange = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    const payload = isRegister
      ? { name: form.name, email: form.email, password: form.password }
      : { email: form.email, password: form.password }

    
    console.log(`${mode.toUpperCase()} payload`, payload)
  }

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode)
    setForm(emptyForm)
  }

  return (
    <main className="app-shell">
      <section className="auth-card">
        <header>
          <p className="eyebrow">{isRegister ? 'Register' : 'Login'}</p>
          <h1>{title}</h1>
          
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              <span>Full name</span>
              <input
                required
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => handleChange('name')(e.target.value)}
                placeholder="Jane Doe"
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange('email')(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              required
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={(e) => handleChange('password')(e.target.value)}
              placeholder="********"
              minLength={6}
            />
          </label>

          {isRegister && (
            <label>
              <span>Confirm password</span>
              <input
                required
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                onChange={(e) => handleChange('confirm')(e.target.value)}
                placeholder="********"
                minLength={6}
              />
            </label>
          )}

          <button type="submit">
            {isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <footer className="switcher">
          {isRegister ? (
            <>
              <span>Already have an account?</span>
              <button type="button" onClick={() => switchMode('login')}>
                Log in
              </button>
            </>
          ) : (
            <>
              <span>New here?</span>
              <button type="button" onClick={() => switchMode('register')}>
                Create new account
              </button>
            </>
          )}
        </footer>
      </section>
    </main>
  )
}

export default Login;