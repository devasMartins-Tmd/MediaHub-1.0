/**
 * @desc file for delete routes
 * @route /function/delete/'*'
 */
import { Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import userModel from '../models/user';
import post from '../models/post';
import { userT } from '../type';
import * as cloudinary from 'cloudinary';

export const deleteAPost = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  if (user && user.id) {
    let postId = req.params.id;
    let postExist = await post.findById(postId);
    if (postExist?.userId?.equals(tokenId)) {
      await postExist.deleteOne();
      if (postExist && postExist.img) {
        cloudinary.v2.uploader.destroy(
          `FarmHub_User_Post_Img/${postExist.publicId}` || '',
          {
            invalidate: true,
          },
          (err, result) => {
            if (err) return console.log(err);
            else console.log(result);
          }
        );
        res.status(200).json({ done: true, message: 'One Item deleted!' });
      } else {
        res.status(400).json({ done: true, message: 'Error occured delete post!' });
      }
    } else res.status(200).json({ done: false });
  }
};
