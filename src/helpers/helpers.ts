import { MergedUserScoreType, ScoreType, UserType } from "../interfaces/interfaces";

const findEachUsersScores = (userId: number,scoresList:ScoreType[]) => {
    let scores:number[] = [];
    scoresList.map((item) => {
      if (item.userId === userId) {
        scores.push(item.score);
      }
    });
    return scores.sort((a, b) => b - a);
  };

  export const sortUsers = (usersList:UserType[],scoresList:ScoreType[]) => {
    let usersData = usersList.map((user, i) => ({
      ...user,
      scores: findEachUsersScores(user._id,scoresList),
    }));
    const sortedUsers = usersData.sort((a, b) => b.scores[0] - a.scores[0]);
    return sortedUsers;
  };

  export const getUserDetails = (userId:number,userListData:MergedUserScoreType[]) => {
    const user = userListData.find((element) => element._id === userId);
    if (!user) {
      return(null);
    } else{
        return(user);

    }
  };