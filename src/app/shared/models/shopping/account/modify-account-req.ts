export interface ModifyAccountReq {
  username: string;
  password: string;
  cellphone: string | null;
  email: string | null;
  address: string | null;
}
