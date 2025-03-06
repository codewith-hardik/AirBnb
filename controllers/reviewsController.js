
const Reviews = require("../models/reviews");
const Listing = require("../models/listing")

module.exports.addReviewsRoute = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("Review saved")
    req.flash("success", "Added Your Review!!!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.distroyReviewsRoute = async (req,res)=>{
    let { id , reviewId} = req.params;
     console.log("ReviewId",reviewId);
     console.log("currUser",res.locals.currUser._id);
     let review = await Reviews.findById(reviewId);
     console.log(review.author);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted Your Review!!!");
    res.redirect(`/listings/${id}`)
 }