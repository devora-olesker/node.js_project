const mongoose = require('mongoose')

const ProfessionsSchema = mongoose.Schema({

    id_profession: {
        type: Number,
        require
    },

    profession_name: {
        type: String,
        require
    },


})


module.exports = mongoose.model('professions', ProfessionsSchema, 'professions')