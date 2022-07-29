const mongoose = require('mongoose')

const statSchema = require('./stat')

const { Schema, model } = mongoose

const unitSchema = new mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Cost: {
			type: String,
			required: true,
		},
		Tier: {
			type: Number,
			required: true,
		},
		Produced: {
			type: String,
			required: true,
		},
		Targets: {
			type: String,
			required: true,
		},
		Alive: {
			type: Boolean,
			required: true,
			default: true
		},
		Status: {
			type: String,
			enum: [
				'In-combat',
				'Idle'
			],
			default: 'Idle'
		},
		stats: [statSchema],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

unitSchema.virtual('unitInfo').get(function () {
    // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
    // fullTitle is going to combine the name and type to build a title
    return `${this.Name} is a ${this.Tier} tier unit, produced from the ${this.Produced}.`
})

unitSchema.virtual('isAlive').get(function () {
    if (this.Alive === true  && this.Status === 'In-combat') {
        return 'Your warriors are under attack!'
    } else if (this.Alive === true) {
        return `${this.Name} standing by and awaiting orders.`
    } else {
        return `Rest in peace ${this.Name}`
    }
})

module.exports = model('Unit', unitSchema)
