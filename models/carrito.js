

const {Schema, model} = require('mongoose')

const CarritoSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    cantidad:{
        type: Number,
    },
    subTotal:{
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})



CarritoSchema.methods.toJSON = function (){

    const {__v,  ...data } = this.toObject();

   
    return data
}
module.exports = model('Carrito', CarritoSchema)