export interface Club {
  _id?: string;
  category?: string;
  description?: string;
  events?: object;
  managers?: object;
  members?: {
    email: string;
    name: string;
    status: string;
    _id: string;
  };
  name?: string;
  status?: boolean;
}
