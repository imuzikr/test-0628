export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}

export interface Question {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  title: string;
  content: string;
  subject: string;
  answerCount: number;
  createdAt: any; // Firestore Timestamp
}

export interface Answer {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  helpfulCount: number;
  createdAt: any; // Firestore Timestamp
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: any; // Firestore Timestamp
}
