import express from 'express'
import cors from 'cors'
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from './db.js'
import {
  logError,
  request,
  response,
} from './log.js'

const app = express()
app.use(cors())
const port = 21122
const address = '127.0.0.1'

app.use(express.json())

app.get('/posts', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('GET /posts')
  request('GET', '/posts', '')
  try {
    const posts = await getAllPosts()
    response('GET', '/posts', posts)
    res.json(posts)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: error.message })
  }
})

app.post('/posts', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('POST /posts')
  const {
    title,
    content,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    imageUrl,
  } = req.body

  // Verificar si todos los campos requeridos están presentes
  if (!title
    || !content
    || !homeTeam
    || !awayTeam
    || homeScore === undefined
    || awayScore === undefined
    || !imageUrl) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  request('POST', '/posts', req.body)
  try {
    const result = await createPost(
      title,
      content,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      imageUrl,
    )
    response('POST', '/posts', result)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.get('/posts/:postId', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('GET /posts/:postId')
  request('GET', '/posts/:postId', '')
  try {
    const { postId } = req.params
    const post = await getPostById(postId)
    if (post) {
      response('GET', '/posts/:postId', post)
      res.json(post)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/posts/:postId', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('PUT /posts/:postId')
  const { postId } = req.params
  const {
    title,
    content,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    imageUrl,
  } = req.body

  if (!title
    || !content
    || !homeTeam
    || !awayTeam
    || homeScore === undefined
    || awayScore === undefined
    || !imageUrl) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  request('PUT', '/posts/:postId', req.body)
  try {
    const result = await updatePost(
      postId,
      title,
      content,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      imageUrl,
    )

    if (result.affectedRows === 0) {
      // Si no se encontró el post para actualizar, devuelve un código 404
      return res.status(404).json({ message: 'Post not found' })
    }

    response('PUT', '/posts/:postId', result)
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log('DELETE /posts/:postId')
  request('DELETE', '/posts/:postId', '')
  try {
    const { postId } = req.params
    const result = await deletePost(postId)
    response('DELETE', '/posts/:postId', result)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.use((req, res) => {
  res.status(501).json({ message: 'Method not implemented' })
})

app.listen(port, address, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
