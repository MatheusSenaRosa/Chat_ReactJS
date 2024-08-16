export type SignIn = (body: {
  nickname: string;
}) => Promise<{ id: string; nickname: string }>;

export type UseAuthServices = () => {
  signIn: SignIn;
};
