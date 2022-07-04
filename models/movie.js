const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (link) => validator.isURL(link),
            message: 'Неправильная ссылка',
        },
    },
    trailerLink: {
        type: String,
        required: true,
        validate: {
            validator: (link) => validator.isURL(link),
            message: 'Неправильная ссылка',
        },
    },
    thumbnail: {
        type: String,
        required: true,
        validate: {
            validator: (link) => validator.isURL(link),
            message: 'Неправильная ссылка',
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    movieId: {
        type: Number,
        required: true,
    },
    nameRU: {
        type: String,
        required: true,
    },
    nameEN: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('movie', movieSchema);