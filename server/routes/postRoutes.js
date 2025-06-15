// const express = require('express');
// const {
//   createPost,
//   getAllPosts,
//   getPostById,
//   updatePost,
//   deletePost,
//   getMyPosts,
// } = require('../controllers/postController');

// // const auth = require('../middlewares/authMiddleeares');
// const auth = require('../middlewares/authMiddleware'); // ✅ correct spelling
// const upload=require('../middlewares/cloudinaryUpload');

// const router = express.Router();

// router.get('/', getAllPosts);
// // router.post('/create',auth, createPost);
// router.post("/create", auth, upload.single("image"), createPost);
// // routes/postRoutes.js
// router.get('/my-posts', auth, getMyPosts); // 'protect' middleware validates JWT

// router.get('/:id', getPostById);

// router.put('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);

// module.exports = router;
const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');

const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/cloudinaryUpload'); // ✅ Cloudinary middleware

const router = express.Router();

// CREATE a post with optional image upload
router.post("/create", auth, upload.single("image"), createPost);

// UPDATE a post (and optionally replace image)
router.put("/:id", auth, upload.single("image"), updatePost);

// DELETE a post
router.delete("/:id", auth, deletePost);

// GET all posts (public)
router.get('/', getAllPosts);

// GET logged-in user's posts
router.get('/my-posts', auth, getMyPosts);

// GET single post by ID
router.get('/:id', getPostById);

module.exports = router;
