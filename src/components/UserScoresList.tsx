import React from "react";
import { Grid } from "@chakra-ui/react";
import { H5 } from "@northlight/ui";
import { UserScoreType } from "../interfaces/interfaces";

interface PropTypes {
  userScores: UserScoreType | null;
}

const UserScoresList = ({ userScores }: PropTypes) => {
  return (
    <>
      {userScores && (
        <div className="mt-2">
          <H5 className="mb-1 mt-1">User Name: {userScores.name}</H5>
          {userScores.scores.map((item, index) => (
            <Grid>
              {index + 1}) {item}
            </Grid>
          ))}
        </div>
      )}
    </>
  );
};

export default UserScoresList;
