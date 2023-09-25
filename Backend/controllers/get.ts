/**
 * @desc GET route
 * @route /function/post/'*'/get
 */
import jsonWebToken from 'jsonwebtoken';
import { Response, Request } from 'express';
import { userT } from '../type';
import userModel from '../models/user';
import post from '../models/post';
import all from '../models/misc';

export const getUserPersonalPosts = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  if (user && user.id) {
    let user_posts = await post.find({ userId: user.id });
    user_posts = user_posts.map((item: any) => {
      let newItem = item;
      newItem['name'] = user?.name;
      return newItem;
    });
    if (user_posts) res.status(200).json({ done: true, data: user_posts });
    else res.status(500).json({ done: false, data: [] });
  }
};

export const getPostComment = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  if (user && user.id) {
    let postId: string = req.params.id;
    let postExist = await post.findById(postId);
    if (postExist) {
      let comments: any = postExist.comment ?? [],
        likees = postExist.likeUserId ?? [];
      if (comments) res.status(200).json({ done: true, comments, likees });
      else if (comments.length === 0) res.status(200).json({ done: true, comments: [] });
      else res.status(404).json({ done: false, message: 'comment not found' });
    } else res.status(404).json({ done: true, message: 'Post not found!' });
  }
};

export const getWelcomeRoute = async (req: Request, res: Response) => {
  const all_user = await userModel.find({});
  res.status(200).json({ done: true, all: all_user });
};

export const getExploreUsers = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  let friends = await all.friends.find(
    { userId: user?.id },
    { frndId: 1, frndName: 1, _id: 0, userId: 1 }
  );
  let friendsId = friends.map((item) => item.frndId).filter((item: any) => item !== '');
  console.log(friendsId);
  if (user) {
    let allUsers = await userModel.find(
      {
        _id: { $ne: user.id, $nin: friendsId },
      },
      { name: 1, _id: 1, tag: 1, profileImg: 1 }
    );

    if (allUsers) {
      res.status(200).json({ done: true, explore: allUsers });
    } else {
      res.status(400).json({ done: true, message: 'Lookup error' });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findOne(
    { _id: tokenId },
    {
      name: 1,
      tag: 1,
      profileImg: 1,
    }
  );
  if (user) {
    res.status(200).json({ done: true, user });
  } else {
    res.status(400).json({ done: false });
  }
};
