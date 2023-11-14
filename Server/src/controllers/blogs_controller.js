const blogsModel = require('../models/blog_model');

class BlogController {
    async getAllBlogs(req, res) {
        const data = await blogsModel.find();
        res.json({ blogs: data });
    }
    async getBlog(req, res) {
        const blogId = req.params.id;
        const user = await req.user;
        const blog = await blogsModel.findById(blogId);
        res.json({blog,user});
    }
    async createBlog(req, res) {
        const { title, snippet, body } = req.body;
        const user = await req.user;
        if (!user) {
            res.status(401).json({ error: "Please login before creating blog" });
        }
        try {
            const blogUser = {
                userId: user._id,
                userName: user.username,
            }
            await blogsModel.create({ title, snippet, body, user:blogUser });
            res.json({ mssg: "Blog has been created" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async editBlog(req, res){
        const blogId = req.params.id;
        const data = req.body;
        try{
            await blogsModel.findByIdAndUpdate(blogId,data);
            res.status(200).json({mggs:"Blog updated successfully"});
        }
        catch(err){
            res.status(406).json({ error: err.message });
        }
    }
    async removeBlog(req, res){
        const blogId = req.params.id;
        try{
            await blogsModel.findByIdAndRemove(blogId);
            res.status(200).json({ mssg: "Blog has been deleted" });
        }
        catch(err){
            res.status(406).json({ error: err.message });
        }
    }
}

module.exports = new BlogController;