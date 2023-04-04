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
import { sortInitialUsers, sortUsers } from "./helpers/helpers.js";
import "./index.css";
import AddUserForm from "./components/AddUserForm.js";
import UserList from "./components/UserList.js";
import {
  FormValuesType,
  MergedUserScoreType,
} from "./interfaces/interfaces.js";

export default function App() {
  const toast = useToast();
  const [allUserData, setAllUserData] = useState<MergedUserScoreType[]>([]);
  const [addUser, setAddUser] = useState<boolean>(false);

  const handleSheetData = (data: ExcelRow[]) => {
    if (!data || !data.length) {
      toast({
        position: "top",
        variant: "solid",
        status: "error",
        title: "Empty file",
        description: `The excel file you uploaded does not have any data!`,
      });
      return;
    }
    let newUserData = [...allUserData];
    data.map((item) => {
      newUserData = sortUsers(newUserData, item.name, item.score);
    });
    setAllUserData(newUserData);
  };

  useEffect(() => {
    const sortedUsers = sortInitialUsers(usersList, scoresList);
    setAllUserData(sortedUsers);
  }, []);

  const handleAddUser = () => {
    setAddUser(true);
  };

  const onSubmit = (values: FormValuesType) => {
    toast({
      position: "top",
      variant: "solid",
      status: "success",
      title: "Score Updated!",
      description: "User list successfully updated!",
    });
    setAllUserData(sortUsers(allUserData, values.name, values.score));
    setAddUser(false);
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
              <UserList allUserData={allUserData} />
              {addUser && <AddUserForm onSubmit={onSubmit} />}
            </Box>
          </VStack>
        </HStack>
      </Container>
    </ChakraProvider>
  );
}
