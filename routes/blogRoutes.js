import express from 'express';
import { createPost, deletePostById, getAllPosts, getPostById, updatePostById } from '../controllers/blogController.js';

const router = express.Router();

// get all blog posts
router.get('/blogs', getAllPosts);

// create a new blog post
router.post('/blogs', createPost); 

// get a specific blog post by id
router.get('/blogs/:id', getPostById);

// update a specific blog post by id
router.put('/blogs/:id', updatePostById);

// delete a specific blog post by id
router.delete('/blogs/:id', deletePostById);

export default router;