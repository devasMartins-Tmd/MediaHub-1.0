import mongoose from 'mongoose';
const model = mongoose.model;

const following = new mongoose.Schema(
  {
    all: {
      type: [{ type: mongoose.Schema.Types.String }],
    },
  },
  { timestamps: true }
);

//friends
const friends = new mongoose.Schema(
  {
    frndId: mongoose.Schema.Types.String,
    frndName: mongoose.Schema.Types.String,
    userId: mongoose.Schema.Types.String,
  },
  { timestamps: true }
);
//

const feed = new mongoose.Schema(
  {
    all: {
      type: [{ type: mongoose.Schema.Types.String }],
    },
  },
  { timestamps: true }
);

const all = {
  following: model('following', following),
  friends: model('friends', friends),
  feed: model('feed', feed),
};
export default all;
