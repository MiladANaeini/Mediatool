export interface ScoreType {
  userId: number;
  score: number;
}

export interface UserType {
  _id: number;
  name: string;
}

export interface UserScoreType {
  name: string;
  scores: number[];
}

export interface FormValuesType {
  name: string;
  score: number;
}

export interface MergedUserScoreType {
  name: string;
  _id: number;
  scores: number[];
}
