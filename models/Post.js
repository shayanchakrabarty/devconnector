const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create POST Schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		refs: 'users'
	},
	text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				refs: 'users'
			}
		}
	],
	commments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				refs: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}

		}
	],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);