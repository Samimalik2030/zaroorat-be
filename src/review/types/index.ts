import { User } from "src/user/user.mongo";


export interface IFile {
  url: string;
  fileId: string;
}

export interface IReview {
  comment: string;
  stars: number;
  photos?: IFile[];
  user: User;
  businessId?: string;
}
