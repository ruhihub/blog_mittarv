// const API_URL = "http://localhost:5000/api/posts";
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/api/posts";
// const API_URL = "http://localhost:8000/api/posts"; // Example URL, adjust as needed
// export const fetchPosts = async (search = "") => {
//   const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`);
//   if (!res.ok) throw new Error("Failed to fetch posts");
//   return res.json();
// };

export const fetchAllPosts = async()=>{
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch all posts");
    // console.log(res)
    return res.json();
}
// export const fetchPostById = async (id) => {
//   const res = await fetch(`${API_URL}/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch post");
//   return res.json();
// };

export const createPost = async (postData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

// Add updatePost, deletePost similarly...
