export type FindUserById = (
  id: string
) => Promise<{ id: string; nickname: string }>;

export type GetUsers = () => Promise<{ id: string; nickname: string }[]>;

export type UseUsersServices = () => {
  findUserById: FindUserById;
  getUsers: GetUsers;
};
