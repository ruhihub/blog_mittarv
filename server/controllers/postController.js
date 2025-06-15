const Post = require('../models/Post');

// exports.createPost = async (req, res) => {
//   try {
//     const post = await Post.create({ ...req.body, author: req.user.id });
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const image = req.file?.path; // Cloudinary URL

    const post = new Post({
      title,
      content,
      tags: tags?.split(",").map(t => t.trim()) || [],
      image,
      author: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.updatePost = async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   if (!post || post.author.toString() !== req.user)
//     return res.status(403).json({ message: "Not authorized" });

//   const { title, content, tags } = req.body;
//   if (req.file) post.image = req.file.path; // Cloudinary URL

//   post.title = title;
//   post.content = content;
//   post.tags = tags?.split(",").map(t => t.trim()) || [];

//   await post.save();
//   res.json(post);
// };

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user)
    return res.status(403).json({ message: "Not authorized" });

  const { title, content, tags } = req.body;
  if (req.file) post.image = req.file.path; // Cloudinary URL

  post.title = title;
  post.content = content;
  post.tags = tags?.split(",").map(t => t.trim()) || [];

  await post.save();
  res.json(post);
};



exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


// controllers/postController.js
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id; // assuming `req.user` is added by auth middleware
    const posts = await Post.find({ author: userId }).populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
};
