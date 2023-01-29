export class Post{
  comment: string;
  userId: string;
  timestamp: Date;

  constructor() {
    this.comment = '';
    this.userId = '';
    this.timestamp = new Date();
  }
}
