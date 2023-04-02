import React, { ReactNode, useState, useEffect } from "react";
import { Link, ChakraProvider, Grid, GridItem, Card } from "@chakra-ui/react";
import {
  Container,
  Box,
  P,
  VStack,
  HStack,
  H1,
  H2,
  Form,
  Button,
  TextField,
} from "@northlight/ui";
import { useToast } from "@chakra-ui/react";
import { palette } from "@northlight/tokens";
import { ExcelDropzone, ExcelRow } from "./excel-dropzone.jsx";
import usersList from "./users";
import scoresList from "./scores";
import { sortUsers, getUserDetails } from "./helpers/helpers.js";

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
  function handleSheetData(data: ExcelRow[]) {
    // replace this log with actual handling of the data
    console.log(data);
  }
  useEffect(() => {
    const sortedUsers = sortUsers(usersList, scoresList);
    setAllUserData(sortedUsers);
  }, []);

  // ======================= From ============================
  const validation = (values: any) => {
    const errors: any = {};
    if (values.firstName === "admin") {
      errors.firstName = {
        message: "Nice try",
      };
    }
    if (values.score === "") {
      errors.score = {
        message: "Nice try",
      };
    }
    return errors;
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
  };

  const handleUserScores = (userId) => {
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
              <H2>List of Users</H2>
              <Card className="">
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                  {allUserData.map((item, i) => (
                    <GridItem w="100%" h="10">
                      <Button
                        variant="brand"
                        onClick={() => {
                          handleUserScores(item._id);
                        }}
                      >
                        {i + 1}. {item.name} - {item.scores[0]}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
                {userScores && (
                  <div>
                    User Name : {userScores.name}
                    {userScores.scores.map((item, index) => (
                      <Grid>
                        {index + 1}) {item}
                      </Grid>
                    ))}
                  </div>
                )}
              </Card>
              {/* ==================== The Form ==================== */}
              <Form
                initialValues={{ name: "", score: "" }}
                onSubmit={onSubmit}
                formSettings={{
                  mode: "onSubmit",
                }}
                validate={validation}
              >
                <HStack alignItems="end" w="400px">
                  <TextField name="name" label="User Name" isRequired={true} />
                  <TextField
                    name="score"
                    label="Score"
                    type="number"
                    isRequired={true}
                  />
                  <Button type="submit" variant="success" w="400px">
                    Validate
                  </Button>
                </HStack>
              </Form>
            </Box>
          </VStack>
        </HStack>
      </Container>
    </ChakraProvider>
  );
}
