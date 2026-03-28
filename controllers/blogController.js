import { getDBConnection } from "../config/db.js";

getDBConnection().then((connection) => {
  // You can now use the connection to interact with the database
  console.log("Database connection established in blogController.");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});

// Additional blog controller logic will go here
const getAllPosts = async (req, res) => {
    const connection = await getDBConnection();
    const [rows] = await connection.execute('SELECT * FROM tbl_blogs');
    res.json(rows);
}

// create blog post
const createPost = async (req, res) => {
    const { title, description } = req.body;
    const connection = await getDBConnection();
    const [result] = await connection.execute(
        'INSERT INTO tbl_blogs (title, description) VALUES (?, ?)',
        [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
}

// get blog post by id
const getPostById = async (req, res) => {
    const { id } = req.params;  
    const connection = await getDBConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM tbl_blogs WHERE id = ?',
        [id]
    );
    res.json(rows[0]);  
}

// update blog post by id   
const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const connection = await getDBConnection();
    await connection.execute(
        'UPDATE tbl_blogs SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
    );
    res.json({ message: "Blog post updated successfully" });
}

// delete blog post by id
const deletePostById = async (req, res) => {
    const { id } = req.params;
    const connection = await getDBConnection();
    await connection.execute(
        'DELETE FROM tbl_blogs WHERE id = ?',
        [id]
    );
    res.json({ message: "Blog post deleted successfully" });
}
export {    
    getAllPosts,
    createPost,
    getPostById,
    updatePostById,
    deletePostById
};