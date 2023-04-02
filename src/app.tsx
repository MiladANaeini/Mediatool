import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Container,
  Box,
  IconButton,
  VStack,
  HStack,
  H1,
  H2,
  Icon,
} from "@northlight/ui";
import { PlusSolid } from "@northlight/icons";
import { useToast } from "@chakra-ui/react";
import { ExcelDropzone, ExcelRow } from "./components/excel-dropzone.js";
import usersList from "./data/users";
import scoresList from "./data/scores";
import { sortUsers, getUserDetails } from "./helpers/helpers.js";
import "./index.css";
import AddUserForm from "./components/AddUserForm.js";
import UserList from "./components/UserList.js";
import {
  ScoreType,
  UserType,
  UserScoreType,
  FormValuesType,
  MergedUserScoreType,
} from "./interfaces/interfaces.js";

export default function App() {
  const toast = useToast();
  const [allUserData, setAllUserData] = useState<MergedUserScoreType[]>([]);
  const [userScores, setUserScores] = useState<UserScoreType | null>(null);
  const [userListData, setUserListData] = useState<UserType[]>([...usersList]);
  const [scoresData, setScoresData] = useState<ScoreType[]>([...scoresList]);
  const [addUser, setAddUser] = useState<boolean>(false);

  const handleSheetData = (data: ExcelRow[]) => {
    const allUsers = [...userListData];
    const allScoresData = [...scoresData];
    for (let i: number = 0; i < data.length; i++) {
      const newUser = createNewUser(data[i].name);
      allUsers.push(newUser);
      allScoresData.push({ userId: newUser._id, score: data[i].score });
      allUsers.push(newUser);
    }
    setUserListData(allUsers);
    setScoresData(allScoresData);
    const sortedUsers = sortUsers(allUsers, allScoresData);
    setAllUserData(sortedUsers);
  };

  const createNewUser = (name: string) => {
    const newUser = {
      name,
      _id: Math.floor(Math.random() * 1000),
    };
    return newUser;
  };
  useEffect(() => {
    const sortedUsers = sortUsers(usersList, scoresList);
    setAllUserData(sortedUsers);
  }, []);

  const handleAddUser = () => {
    setAddUser(true);
  };

  const onSubmit = (values: FormValuesType) => {
    let user = allUserData.find(
      (element) => element.name.toLowerCase() === values.name.toLowerCase()
    );
    const allUsers = [...userListData];
    const allScoresData = [...scoresData];
    if (user) {
      //the user already exists
      allScoresData.push({ userId: user._id, score: Number(values.score) });
      toast({
        position: "top",
        variant: "solid",
        status: "success",
        title: "Score Updated!",
        description: `The scores of "${values.name}" were updated!`,
      });
    } else {
      //a new ueser is added
      createNewUser(values.name);
      const newUser = createNewUser(values.name);
      allScoresData.push({ userId: newUser._id, score: values.score });
      allUsers.push(newUser);
      toast({
        position: "top",
        variant: "solid",
        status: "success",
        title: "User Added",
        description: `The new user "${values.name}" was added!`,
      });
    }
    setUserListData(allUsers);
    setScoresData(allScoresData);
    const sortedUsers = sortUsers(allUsers, allScoresData);
    setAllUserData(sortedUsers);
    setUserScores(null);
    setAddUser(false);
  };

  const handleUserScores = (userId: number) => {
    setUserScores(getUserDetails(userId, allUserData));
  };
  return (
    <ChakraProvider>
      <Container maxW="6xl" padding="4">
        <H1 marginBottom="4">Mediatool exercise</H1>
        <HStack spacing={10} align="flex-start">
          <ExcelDropzone
            onSheetDrop={handleSheetData}
            label="Import excel file here"
          />
          <VStack align="left">
            <Box>
              <H2>
                List of Users{" "}
                <IconButton
                  onClick={handleAddUser}
                  isRound={true}
                  aria-label="create"
                  variant="success"
                  icon={<Icon as={PlusSolid} />}
                />
              </H2>
              <UserList
                allUserData={allUserData}
                handleUserScores={handleUserScores}
                userScores={userScores}
              />
              {addUser && <AddUserForm onSubmit={onSubmit} />}
            </Box>
          </VStack>
        </HStack>
      </Container>
    </ChakraProvider>
  );
}
