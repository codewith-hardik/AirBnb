const mongoose = require("mongoose");
const Reviews = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        // type: String,
        // default: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8VmlsbGFzJTIwYXZlYyUyMHBpc2NpbmV8ZW58MHx8MHx8&w=1000&q=80",
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8VmlsbGFzJTIwYXZlYyUyMHBpc2NpbmV8ZW58MHx8MHx8&w=1000&q=80" : v,

        filename: String,
        url:String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type : Schema.Types.ObjectId,
        ref: "Review"
    } ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

});

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Reviews.deleteMany({_id: {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;