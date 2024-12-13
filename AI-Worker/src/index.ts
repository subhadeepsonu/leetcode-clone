import { Hono } from 'hono'
export interface Env {
  AI: Ai;
}
const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({
    sucess: true,
    message: 'Hello World'
  })
})
app.post('/ai/summary', async (c) => {
  const body = await c.req.json()
  if (!body.text) {
    return c.json({
      success: false,
      message: 'Text is required'
    })
  }
  try {
    const summary = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {
      prompt: body.text,
    })
    return c.json({
      success: true,
      data: summary
    })
  } catch (error: any) {
    return c.json({
      success: false,
      message: error.message
    })
  }
})

export default app
