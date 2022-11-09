const mongoose = require('mongoose')
const visit=require("./visit")
function isValidIsraeliID(id) {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
}
const PatientsSchema = mongoose.Schema({

    tz: {
        type: String,
        require,
        minlength: '8',
        maxlength: '9',
        validate:{
            validator: function (v) {
                return isValidIsraeliID(v);
            },
            message: props => `${props.value} is not a valid TZ`
        }
    },

    tz_pic: {
        type: String,
    },

    fname: {
        type: String,
        require,
        // validate: {
        //     // validator: function (v) {
        //     //     return /^[a-z\u0590-\u05fe]+$/.test(v);
        //     // },
        //     message: props => `${props.value} letters only`
        // }
    },

    lname: {
        type: String,
        require,
        // validate: {
        //     validator: function (v) {
        //         return /^[a-z\u0590-\u05fe]+$/.test(v);
        //     },
        //     message: props => `${props.value} letters only`
        // }
    },
    password: {
        type: String,
        minlength: '4',
        maxlength: '9',
        trim: true,//(remove spaces)
        // validate: {
        //     validator: function (v) {
        //         return /^[0-9]\w{7,14}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password`
        // }
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

    address: {
        type: String
    },
     
    visits: {
        type: [visit]
    }
})
module.exports = mongoose.model('patients', PatientsSchema, 'patients')