// main routes
const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });

  } catch (error) {
    console.log(error);
  }

});
// routes
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express and MongoDB"
    }
    let perPage = 10;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextpage: hasNextPage ? nextPage : null
    });
  } catch (error) {
    console.log(error);
  }
});
// // routes
// router.get('', async (req, res) => {
//     const locals = {
//         title: "NodeJs Blog",
//         description: "Simple blog created with NodeJs, Express and MongoDB"
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }


// });

// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "BUilding a Blog",
//             body: "This is a body text"
//         },
//         {
//             title: "BUilding a Blog 2",
//             body: "This is a body text 2"
//         },
//         {
//             title: "BUilding a Blog 3",
//             body: "This is a body text 3"
//         }
//     ])
// }
// insertPostData();



// post route
router.get('/post/:id', async (req, res) => {
  try {

    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple blog created with NodeJs, Express and MongoDB"
    }

    res.render('post', { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// search rout
router.get('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple blog created with NodeJs, Express and MongoDB"
    }
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
    const data = await Post.find({
      $or: [
        {
          title: { $regex: new RegExp(searchNoSpecialChar, 'i') }
        },
        {
          body: { $regex: new RegExp(searchNoSpecialChar, 'i') }
        }
      ]
    });

    res.render("search", {
      data,
      locals
    });
  } catch (error) {
    console.log(error);
  }
});


router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;