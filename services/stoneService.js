const Stone = require('../models/Stone');

exports.getAll = () => Stone.find();

exports.getLastThree = () => Stone.find({}).sort({_id: -1}).limit(3);

exports.create = (stoneData) => Stone.create(stoneData);

exports.getOne = (stoneId) => Stone.findById(stoneId);

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.edit = (stoneId, editedData) => Stone.findByIdAndUpdate(stoneId, editedData);

exports.search = (name) => Stone.find({ name: new RegExp(name, 'i') });
