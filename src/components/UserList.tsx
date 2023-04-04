import React, { useState, useEffect } from "react";
import { Grid, GridItem, Card } from "@chakra-ui/react";
import { Button } from "@northlight/ui";
import UserScoresList from "./UserScoresList";
import { MergedUserScoreType } from "../interfaces/interfaces";

interface PropTypes {
  allUserData: MergedUserScoreType[];
}

const UserList = ({ allUserData }: PropTypes) => {
  const [userScores, setUserScores] = useState<MergedUserScoreType | null>(
    null
  );
  useEffect(() => {
    setUserScores(null);
  }, [allUserData]);

  const handleUserScores = (item: MergedUserScoreType) => {
    // clicked user information
    setUserScores(item);
  };
  return (
    <Card className="mt-1 mb-1">
      <div className="p-1">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {allUserData.map((item, i) => (
            <GridItem key={i} w="100%" h="10">
              <Button
                variant="brand"
                onClick={() => {
                  handleUserScores(item);
                }}
              >
                {i + 1}. {item.name} - {item.maxScore}
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
