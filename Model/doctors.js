const mongoose = require('mongoose')

const DoctorsSchema = mongoose.Schema({
    
    doctor_id: {
        type: Number,
        require
    },

    fname: {
        type: String,
        require,
        validate: {
            validator: function (v) {
                return /^[a-z\u0590-\u05fe]+$/.test(v);
            },
            message: props => `${props.value} letters only`
        }
    },

    lname: {
        type: String,
        require,
        validate: {
            validator: function (v) {
                return /^[a-z\u0590-\u05fe]+$/.test(v);
            },
            message: props => `${props.value} letters only`
        }
    },


    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone`
        }
    },

    profession_id: {
        type: Number
    },

})

module.exports = mongoose.model('doctors',DoctorsSchema,'doctors')