//flowerModel.js

var mongoose = require("mongoose");

var moment = require('moment'); //moment used to conveniently parse dates

var flowerSchema = new mongoose.Schema({
  name: { type: String, required: true }, //only  Model required field
  water: { type: String, required: false },
  description: { type: String, required: false },
  season: { type: String, required: false },
  height: { type: String, required: false },
  imagePath: { type: String, required: false },
  imageOriginalName: { type: String, required: false },
  mimetype: { type: String, required: false },
  imageSize: { type: String, required: false },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },

}); //end Schema



//pre hook used for createdAt and updatedAt, used later for a virtual 'time ago' property,
flowerSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date;
  } else { //if there already is a createdAt, make updatedAt
    this.updatedAt = new Date;
  }
  next();

}); //end pre save


//used to create virtual objects
flowerSchema.set('toObject', { virtuals: true });
flowerSchema.set('toJSON', { virtuals: true });

//format createdAt with moment() for use in app
flowerSchema.virtual('createdAtString').get(function() {
  if (this.createdAt) {
    const createdAtString = moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    return createdAtString;
  }
}); //end virtual createdAt

//calculate virtual 'how long ago last update was' app
flowerSchema.virtual('lastTimeUpdated').get(function() {

  //only runs if there has been an update to calculate with
  if (this.updatedAt) {

    let updated = moment(this.updatedAt);
    let now = moment();

    let diff = now.diff(updated);

    //express as a duration
    const lastTimeUpdated = moment.duration(diff);

    //moment offers these different properties on its lastTimeUpdated object, this if/else will return the longest period, ie if its been months and then return
    if (lastTimeUpdated.months() != 0) {
      return lastTimeUpdated.months() + " months";
    } else if (lastTimeUpdated.days() != 0) {
      return lastTimeUpdated.days() + " days";
    } else if (lastTimeUpdated.minutes() != 0) {
      return lastTimeUpdated.minutes() + " minutes";
    } else if (lastTimeUpdated.seconds() != 0) {
      return lastTimeUpdated.seconds() + " seconds";
    } else {
      return undefined; //if it doesnt exist the html if won't run, this is just extra for safety given it shouldnt get here
    }

  }; //end if statement

}); //end virtual property last time updated



module.exports = mongoose.model('Flower', flowerSchema);