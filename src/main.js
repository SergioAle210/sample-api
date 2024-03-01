import express from 'express'
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from './db.js'

const app = express()
const port = 3000
const address = '127.0.0.1'

app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/posts', async (req, res) => {
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
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const post = await getPostById(postId)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/posts/:postId', async (req, res) => {
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

    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const result = await deletePost(postId)
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
