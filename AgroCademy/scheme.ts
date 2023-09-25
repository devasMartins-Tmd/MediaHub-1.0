type userSchema = {
  name: string;
  email: string;
  joinAs: string;
  password: string;
  userId: string;
};

type userPostSchema = {
  postImage: string;
  postText: string;
  postOwnerImage: string;
  postHeader: string;
  postId: string;
  postLikeNo: string;
  postCommentNo: string;
  posterUserAs: string;
  postUserId: string;
  postTime: string;
};

type userNotification = {
  notificationType: string;
  notificationHeader: string;
  notificationSummary: string;
  notificationUser: string;
  notificationId: string;
  notificationDate: string;
  userId: string;
};

type userHistorySchema = {
  time: string;
  historyText: string;
  userId: string;
};

type userFriends = {
  friendName: string;
  friendTag: string;
  friendJoinDate: string;
};

type userFollowing = {
  userTag: string;
  userName: string;
  userId: string;
};

type userFavouritePost = {
  postId: string;
};
