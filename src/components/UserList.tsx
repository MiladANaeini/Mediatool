import React from "react";
import { Grid, GridItem, Card } from "@chakra-ui/react";
import { Button } from "@northlight/ui";
import UserScoresList from "./UserScoresList";
import { UserScoreType, MergedUserScoreType } from "../interfaces/interfaces";

interface PropTypes {
  userScores: UserScoreType;
  handleUserScores: (name: string) => void;
  allUserData: MergedUserScoreType[];
}
const UserList = ({ allUserData, handleUserScores, userScores }: PropTypes) => {
  return (
    <Card className="mt-1 mb-1">
      <div className="p-1">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {allUserData.map((item, i) => (
            <GridItem key={i} w="100%" h="10">
              <Button
                variant="brand"
                onClick={() => {
                  handleUserScores(item.name);
                }}
              >
                {i + 1}. {item.name} - {item.scores[0]}
              </Button>
            </GridItem>
          ))}
        </Grid>
        <UserScoresList userScores={userScores} />
      </div>
    </Card>
  );
};

export default UserList;
