import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('*', cors())

const DB_URL = 'https://zylos-test-default-rtdb.firebaseio.com'

app.use('/static/*', serveStatic({ root: './public' }))
app.get('/', serveStatic({ path: './public/index.html' }))

app.post('/signup', async (c) => {
  const { username, password } = await c.req.json()
  const res = await fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  const data = await res.json()
  return c.json({ success: true, id: data.name })
})

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