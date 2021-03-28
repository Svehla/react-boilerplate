/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ReactionTypeEnum {
  Reaction1 = "Reaction1",
  Reaction2 = "Reaction2",
  Reaction3 = "Reaction3",
  Reaction4 = "Reaction4",
}

export interface addCommentMutation_args_input_arg {
  text?: any | null;
  postId: string;
}

export interface addFollowPublicUser_input_input_arg {
  toFollowId: string;
}

export interface addPostMutation_args_input_arg {
  text?: any | null;
}

export interface deleteFollowPublicUser_input_input_arg {
  followingId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
