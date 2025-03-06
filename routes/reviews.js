const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Reviews = require("../models/reviews.js");
const {isLoggedIn, isOwner ,isReviewsAuthor, validateReviews} = require("../meddelware.js")
const reviewsController = require("../controllers/reviewsController.js")




//Reviews route
router.post("/",validateReviews, isLoggedIn,wrapAsync(reviewsController.addReviewsRoute))

// Delete Reviews Route 
router.delete("/:reviewId", isLoggedIn,isReviewsAuthor,wrapAsync(reviewsController.distroyReviewsRoute))

module.exports = router;
