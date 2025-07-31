// src/index.ts
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('*', cors())

const DB_URL = 'https://zylos-test-default-rtdb.firebaseio.com'

// تقديم الملفات الثابتة من مجلد public (مثل index.html, style.css, script.js)
app.use('/static/*', serveStatic({ root: './public' }))

// تقديم صفحة index.html عند زيارة /
app.get('/', serveStatic({ path: './public/index.html' }))

// مسار إنشاء حساب جديد
app.post('/signup', async (c) => {
  const { username, password } = await c.req.json()
  const res = await fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  const data = await res.json()
  return c.json({ success: true, id: data.name })
})

// مسار تسجيل الدخول
app.post('/login', async (c) => {
  const { username, password } = await c.req.json()
  const res = await fetch(`${DB_URL}/users.json`)
  const users = await res.json()

  const found = Object.values(users || {}).find(
    (user: any) => user.username === username && user.password === password
  )

  if (found) {
    return c.json({ success: true })
  } else {
    return c.json({ success: false, message: 'Invalid credentials' })
  }
})

export default app
