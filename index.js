import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const titleArr = [];
const blogArr = [];

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/edit", (req,res) => {
    // console.log(Object.keys(req.body)[0]);
    const index = Object.keys(req.body)[0];
    res.render("edit.ejs", {index: index, titles: titleArr, blogs: blogArr});
})

app.post("/submit", (req,res) => {
    titleArr.push(req.body["title"]);
    blogArr.push(req.body["blog"]);

    res.render("index.ejs", {titles: titleArr, blogs: blogArr});
})



app.put("/blogs/:id", (req,res) => {
    const index = req.params.id;
    console.log(index);

    if(req.body["title"] != ""){
        titleArr[index] = req.body["title"];
    }
    if(req.body["blog"] != ""){
        blogArr[index] = req.body["blog"];
    }

    res.render("index.ejs", {titles: titleArr, blogs: blogArr});
    
})




app.delete("/blogs/:id", (req, res) => {
    //code for deleting
    const index = req.params.id;

    if (index !== -1) {
        // Remove the blog post from the array
        blogArr.splice(index, 1);
        titleArr.splice(index,1);
        // res.sendStatus(204); // No content, successful deletion
        // res.redirect('/');
        res.render("index.ejs", {titles: titleArr, blogs: blogArr});
    } else {
        res.sendStatus(404); // Not found
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})