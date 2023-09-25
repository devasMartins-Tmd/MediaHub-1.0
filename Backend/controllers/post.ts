/**
 * @desc POST route
 * @route /function/post/'*'/post
 */
import { Response, Request } from 'express';
import { uniqueID } from '../__util__/util1';
import jsonWebToken from 'jsonwebtoken';
import userModel from '../models/user';
import { userT } from '../type';
import { fileExist } from '../__util__/util1';
import * as path from 'fs';
import * as cloudinary from 'cloudinary';
import post from '../models/post';
import all from '../models/misc';
import { JWToken, verifyCredentials } from '../__util__/util1';
import { authBody } from '../type';

export const makeAPostFunction = async (req: Request, res: Response) => {
  req.body['postId'] = uniqueID();
  let id: any = jsonWebToken.decode(req.headers.authorization || '');
  id = id['id'];
  let user: userT | null = await userModel.findById(id);
  if (id && user) {
    if (req.body.img) {
      let buffer: Buffer = Buffer.from(req.body.img.split(';base64,')[1], 'base64');
      let fileName = `IMG/${user.name}.${Math.floor(Math.random() * 100)}.profile.webp`.replace(
        ' ',
        ''
      );
      path.writeFileSync(fileName, buffer);
      let isDone = fileExist(fileName);
      if (isDone) {
        let pubId = 'M0M' + Math.floor(Math.random() * 1000);
        cloudinary.v2.uploader.upload(
          `./${fileName}`,
          {
            folder: 'FarmHub_User_Post_Img',
            public_id: pubId,
          },
          async (err, response) => {
            if (err) return console.log(err);
            if (response && response.type === 'upload') {
              req.body = {
                ...req.body,
                img: response?.url,
                name: user?.name,
                tag: user?.tag,
                userId: id,
                publicId: pubId,
                likeUserId: [],
              };
              const createPost = await post.create(req.body);
              if (createPost) {
                res.status(200).json({ done: true, message: 'sent!' });
              } else {
                res.status(500).json({ done: false, message: 'Post not created!' });
              }
            }
          }
        );
      }
    } else {
      req.body = {
        ...req.body,
        img: '',
        name: user?.name,
        tag: user?.tag,
        userId: id,
        publicId: '',
      };
      const createPost = await post.create(req.body);
      if (createPost) {
        res.status(200).json({ done: true, message: 'sent!' });
      } else {
        res.status(500).json({ done: false, message: 'Post not created!' });
      }
    }
  }
};

export const postAPostComment = async (req: Request, res: Response) => {
  let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
  tokenId = tokenId['id'];
  let user: userT | null = await userModel.findById(tokenId);
  if (user && user.id) {
    let { postId, comment } = req.body;
    if (postId && comment) {
      let postExist = await post.findById(postId);
      if (postExist) {
        await postExist.updateOne({ $push: { comment: [{ text: comment, name: user.name }] } });
        res.status(200).json({ done: true, message: 'comment posted!✅' });
      } else {
        res.status(404).json({ done: false, message: 'post not found!❌' });
      }
    }
  }
};

export const postAuthToSignUp = async (req: Request, res: Response) => {
  let token, uniqueId, createUser;

  const { email, password, tag, name }: authBody = req.body;

  console.log(req.body);

  const isAuth = verifyCredentials(req.body, 'Signup');

  uniqueId = uniqueID();

  console.log(isAuth);

  if (isAuth) {
    createUser = await userModel.create({
      name,
      password,
      email,
      tag: tag ? 'Farmer' : 'customer',
      uniqueId,
      profileImg: '',
    });
  }

  console.log(createUser);

  if (createUser?.id) {
    let id = createUser?._id.toString();

    token = JWToken(id);

    await all.friends.create({
      userId: id,
      frndId: '',
    });

    res.status(200).json({ done: true, token, user: createUser });
  } else {
    res.status(404).json({ done: false, errMsg: "couldn't create user!" });
  }
};

export const postAuthToLogin = async (req: Request, res: Response) => {
  let token: any;
  const { email, password }: authBody = req.body;
  const userExistObject = await userModel.findOne({
    email,
    password,
  });
  if (userExistObject) {
    token = JWToken(userExistObject.id);
    res.status(200).json({ done: true, token });
  } else {
    res.status(404).json({ done: false, errMsg: 'User not found!' });
  }
};