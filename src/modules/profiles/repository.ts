import { select } from "../../utils/functions";

const find = select<{
  id: string;
  name: string;
  avatar_url?: string | null;
  username: string;
  followers: number;
  following: number;
}>("v_profile");

export const ProfilesRepository = { find };
