import React, { ReactNode, useState, useEffect } from "react";
import { Link, ChakraProvider } from "@chakra-ui/react";
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
import { palette } from "@northlight/tokens";
import { ExcelDropzone, ExcelRow } from "./excel-dropzone.jsx";
import usersList from "./users";
import scoresList from "./scores";
import { sortUsers, getUserDetails } from "./helpers/helpers.js";
import "./index.css";
import AddUserForm from "./components/AddUserForm.js";
import UserList from "./components/UserList.js";
interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link
    href={href}
    isExternal
    sx={{ color: palette.blue["500"], textDecoration: "underline" }}
  >
    {children}
  </Link>
);

export default function App() {
  interface IshowAllUserScores {
    name: string;
  }
  const toast = useToast();
  const [allUserData, setAllUserData] = useState([]);
  const [userScores, setUserScores] = useState(null);
  const [userListData, setUserListData] = useState([...usersList]);
  const [scoresData, setScoresData] = useState([...scoresList]);
  const [addUser, setAddUser] = useState<boolean>(false);
  function handleSheetData(data: ExcelRow[]) {
    // replace this log with actual handling of the data
    console.log(data);
  }
  useEffect(() => {
    const sortedUsers = sortUsers(usersList, scoresList);
    setAllUserData(sortedUsers);
  }, []);

  const handleAddUser = () => {
    setAddUser(true);
  };

  const onSubmit = (values) => {
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
        description: `The scores of ${values.name} were updated!`,
      });
    } else {
      //a new ueser is added
      const newUser = {
        name: values.name,
        _id: Math.floor(Math.random() * 1000),
      };
      allScoresData.push({ userId: newUser._id, score: values.score });
      allUsers.push(newUser);
      toast({
        position: "top",
        variant: "solid",
        status: "success",
        title: "User Added",
        description: `The new user ${values.name} was added!`,
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
