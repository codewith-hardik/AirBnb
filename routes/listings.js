const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../meddelware.js")
const listingController = require("../controllers/listingCont.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

// All Listing Data...Index router..
router.get("/", wrapAsync(listingController.index));
// new ListAdd router
router.get("/new", isLoggedIn,
    wrapAsync(listingController.renderNewListingForm) );
// Create router...
    router.post("/new", 
    upload.single("listing[image]"),
    // validateListing, 
    wrapAsync(listingController.creatNewListingRoute),
);
// Edit router...
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.editListingForm));
// update router...
router.put("/:id/edit", isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.editListingRoute));
// detete router....
router.delete("/:id/delete", isLoggedIn,isOwner,wrapAsync(listingController.listingDeleteRoute));
// Show router...
router.get("/:id", wrapAsync(listingController.showAllListingRoute));



module.exports = router;


