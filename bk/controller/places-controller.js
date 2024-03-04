const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");
const getCoordsForAddress = require("../Util/location");
const Place = require("../model/place");
const User = require("../model/user");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "empire state building",
    description: "one of the most famous sky scrapers in the world",
    location: {
      lat: 40.0903,
      lng: 50.9098,
    },
    address: "20W 34th st, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please reload again.",
      500
    );
    return next(error);
  }
  //findById() works directly on the constructor, it doesnot work n an instance
  if (!place || place.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided Id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const UserId = req.params.uid;
  let places;
  try {
     places = await Place.find({ creator: UserId });
  } catch (err) {
   const error = new HttpError('Fetching Places Failed, Please try Again',500);
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find place for the provided Id.", 404)
    );
  }
  res.json({ places: places.map(place => place.toObject({getters: true})) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs!", 422));
  }
  const { title, description, address, creator } = req.body;
  //const title = rea.title;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    image: "https://images.app.goo.gl/GdB4SRwJqtp19TvG6",
    address,
    creator,
  });
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating places file failed, please reload",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs!", 422));;
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try{
    place = await Place.findById(placeId)

  }catch(err){
    const error = new HttpError("Something went wrong could, not update place", 500);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try{
    await place.save();
  }catch(err){
    const error = new HttpError("Could not save updated place", 500);
    return next(error)
  }


  res.status(200).json({ place: place.toObject({getters: true}) });
};
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try{
    place = await Place.findById(placeId);
  }catch(err){
    const error = new HttpError("could not find place", 500);
    return next(error);
  }

  try{
    await place.deleteOne();
  }catch(err){
    const error = new HttpError("something went wrong", 500);
    return next(error);
  }
  res.status(200).json({ message: "Place Succesfully Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlaceById = updatePlaceById;
