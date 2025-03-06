// const Listing = require("../models/listing")

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// }
// module.exports.renderNewListingForm = async (req, res) => {
//     res.render("listings/new.ejs");
// }
// module.exports.creatNewListingRoute = async (req, res, next) => {
//     const newListing = new Listing(req.body.listing)
//     const url_location = `https://nominatim.openstreetmap.org/search?format=json&q=${newListing.location}`;

//       const response = await fetch(url_location);
//       const data = await response.json();
//     //   if (data.length > 0) {
//         const location = data[0];
//         const geometry = {
//              type: "Point",
//              coordinates : [location.lat, location.lon]
//         }
//     //  } 

//     let url = req.file.path;
//     let filename = req.file.filename;
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };    
//      newListing.geometry = geometry;
//     let saved = await newListing.save();
//      console.log(saved);
//     req.flash("success", "New Listing Added!!!");
//     res.redirect("/listings")
// }

// module.exports.editListingForm = async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing You Requested Dosn't Exsit!!!");
//         res.redirect("/listings");
//     }
//     req.flash("success", "Edited Your Listing!!!");
//     res.render("listings/edit.ejs", { listing });
// }
// module.exports.editListingRoute = async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     if (typeof req.file !== "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }
//     req.flash("success", "Updated Your Listing!!!");
//     res.redirect(`/listings/${id}`);
// }
// module.exports.listingDeleteRoute = async (req, res) => {
//     let { id } = req.params;
//     let deletListing = await Listing.findByIdAndDelete(id);
//     console.log(deletListing);
//     req.flash("success", "Deleted Your Listing!!!");
//     res.redirect("/listings");

// }
// module.exports.showAllListingRoute = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate({
//         path: "reviews",
//         populate: {
//             path: "author",
//         },
//     }).populate("owner");
//     if (!listing) {
//         req.flash("error", "Listing You Requested Dosn't Exsit!!!");
//         res.redirect("/listings");
//     }
//     res.render("listings/show.ejs", { listing })
// }













const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.creatNewListingRoute = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);

        // Geocoding using OpenStreetMap
        const url_location = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            newListing.location
        )}`;
        const response = await fetch(url_location);
        const data = await response.json();

        if (data.length === 0) {
            req.flash("error", "Invalid location provided.");
            return res.redirect("/listings/new");
        }

        const location = data[0];
        const geometry = {
            type: "Point",
            coordinates: [parseFloat(location.lon), parseFloat(location.lat)],
        };

        // Add image and owner details
        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }
        newListing.geometry = geometry;
        newListing.owner = req.user._id;

        const savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Added!");
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while creating the listing.");
        res.redirect("/listings/new");
    }
};

module.exports.editListingForm = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing you requested doesn't exist!");
            return res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load the listing edit form.");
        res.redirect("/listings");
    }
};

module.exports.editListingRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        // Update image if a new file is uploaded
        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
            await listing.save();
        }

        req.flash("success", "Updated Your Listing!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while updating the listing.");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.listingDeleteRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            req.flash("error", "Listing doesn't exist!");
        } else {
            req.flash("success", "Deleted Your Listing!");
        }
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to delete the listing.");
        res.redirect("/listings");
    }
};

module.exports.showAllListingRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing you requested doesn't exist!");
            return res.redirect("/listings");
        }

        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load the listing details.");
        res.redirect("/listings");
    }
};
