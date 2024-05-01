import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const titleArr = [];
const blogArr = [];

app.get("/", (req,res) => {
    const titles = req.query.titles ? JSON.parse(req.query.titles) : [];
    const blogs = req.query.blogs ? JSON.parse(req.query.blogs) : [];
    res.render("index.ejs", { titles: titles, blogs: blogs });
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
    // console.log(index);

    if(req.body["title"] != ""){
        titleArr[index] = req.body["title"];
    }
    if(req.body["blog"] != ""){
        blogArr[index] = req.body["blog"];
    }

    // res.render("index.ejs", {titles: titleArr, blogs: blogArr});
    // res.redirect('/');
    res.redirect(`/?titles=${JSON.stringify(titleArr)}&blogs=${JSON.stringify(blogArr)}`);
    
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
        res.redirect(`/?titles=${JSON.stringify(titleArr)}&blogs=${JSON.stringify(blogArr)}`);
        // res.render("index.ejs", {titles: titleArr, blogs: blogArr});
    } else {
        res.sendStatus(404); // Not found
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})