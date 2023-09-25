/**
 * @desc file for PUT requests
 * @route /function/put/'*'
 */

import { Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import userModel from '../models/user';
import post from '../models/post';
import { userT } from '../type';
import all from '../models/misc';

export const updatePostLike = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  if (user && user.id) {
    let [userId, postId]: string[] = [req.params.userId, req.params.id];
    let postExist = await post.findById(postId);
    let isExist = postExist?.likeUserId.includes(userId);
    if (postExist) {
      if (!isExist) {
        await postExist.updateOne({ $inc: { likes: +1 }, $push: { likeUserId: userId } });
        res.status(200).json({ done: true, message: 'Like Incremented!' });
      } else {
        await postExist.updateOne({ $inc: { likes: -1 }, $pull: { likeUserId: userId } });
        res.status(200).json({ done: true, message: 'Like Incremented!' });
      }
    } else res.status(400).json({ done: false, message: 'Post not found!' });
  }
};

export const updateFriends = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  let newFriend = await userModel.findById(req.body.id);
  if (user && newFriend) {
    let isdone = await all.friends.create({
      userId: tokenId,
      frndId: newFriend.id,
      frndName: newFriend.name,
    });
    console.log(isdone);
    res.status(200).json({ done: true, message: `${newFriend.name} has become a friend!` });
  } else {
    res.status(400).json({ done: true, message: `Error making friends with ${newFriend?.name}` });
  }
};
