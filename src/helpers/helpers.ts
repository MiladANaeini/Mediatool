import { MergedUserScoreType, ScoreType, UserType } from "../interfaces/interfaces";

const findEachUsersScores = (userId: number, scoresList: ScoreType[]) => {
    let scores:number[] = [];
    scoresList.map((item) => {
      if (item.userId === userId) {
        scores.push(item.score);
      }
    });
    return scores.sort((a, b) => b - a);
  };

  export const sortInitialUsers = (usersList: UserType[], scoresList: ScoreType[]) => {
    let usersData = usersList.map((user) => ({
      ...user,
      scores: findEachUsersScores(user._id,scoresList),
      maxScore:findEachUsersScores(user._id,scoresList)[0],
    }));
    const sortedUsers = usersData.sort((a, b) => b.maxScore - a.maxScore);
    return sortedUsers;
  };

  export const getUserDetails = (name: string, userListData: MergedUserScoreType[]) => {
   return  userListData.find((element) => element.name.toLocaleLowerCase() === name.toLocaleLowerCase()) || null
  };


  export const sortUsers = (allUserData: MergedUserScoreType[], name: string, score: number) =>{
    let user = getUserDetails(name, allUserData);
    let newUserData: MergedUserScoreType[] = []
    if (user) {
      //the user already exists
      let existingUser = { ...user };
      existingUser.scores.push(score);
      if(score > existingUser.maxScore){
        existingUser.maxScore= score
      }
      existingUser.scores = existingUser.scores.sort((a, b) => b - a);
       newUserData = allUserData.map((item) => {
        if (item._id === existingUser._id) {
          return existingUser;
        } else {
          return item;
        }
      });
    } else {
      //adding new user
      newUserData = [...allUserData];
      const createdUser = createNewUser(name, score);
      newUserData.push(createdUser);
    }
    return newUserData.sort((a, b) => b.maxScore - a.maxScore);
  }


  export const createNewUser = (name: string,score: number) => {
    return {
        name,
        _id: Math.floor(Math.random() * 1000),
        scores:[score],
        maxScore:score
      };
  };

  

  