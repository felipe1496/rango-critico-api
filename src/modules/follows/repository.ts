import { $count, $delete, insert, select } from "../../utils/functions";

const save = insert<
  {
    id: string;
    follower_id: string;
    followed_id: string;
    created_at: string;
  },
  {
    id: string;
    follower_id: string;
    followed_id: string;
  }
>("follows");

const find = select<{
  id: string;
  follower_id: string;
  followed_id: string;
  created_at: string;
}>("follows");

export const remove = $delete("follows");

export const count = $count("follows");

export const FollowsRepository = {
  save,
  find,
  remove,
  count,
};
