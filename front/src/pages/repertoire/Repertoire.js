import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { Link as ReachLink } from "@reach/router";
import {
  fetchRepertoires,
  repertoireDelete,
} from "../../store/features/repertoire";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

function Repertoire() {
  const repertoire = useSelector((state) => state.repertoire.repertoires);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    dispatch(fetchRepertoires());
  }, [dispatch]);
  return (
    <Box bg="gray.100">
      {isAdmin && (
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            Admin tools
          </MenuButton>
          <MenuList>
            <MenuGroup title="Movies">
              <MenuItem>Add Movie</MenuItem>
              <MenuItem>See Movies </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Repertoires">
              <MenuItem onClick={() => navigate("/repertoire/add")}>
                Add Repertoire
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
      <Flex align="center" justify="center" h="100vh">
        <VStack>
          <Text fontSize="5xl" m={10}>
            REPERTOIRE
          </Text>

          <List spacing={5}>
            {repertoire.map((rep) => (
              <ListItem key={rep._id}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={rep.movieId.poster}
                  />
                  <Stack>
                    <CardBody>
                      <Heading>{rep.movieId.title}</Heading>

                      <Text py="2">Day {rep.day}</Text>
                      <Text py="2">Time {rep.time}</Text>
                      <Text py="2">Hall {rep.hall}</Text>
                    </CardBody>

                    <CardFooter justify="right">
                      <Text mr={20} mt={2}>
                        <Link
                          as={ReachLink}
                          to={`/movie/${rep.movieId._id}`}
                          color="blue.300"
                        >
                          Details
                        </Link>
                        {isAdmin && (
                          <>
                            <Button
                              ml={7}
                              variant="link"
                              colorScheme="blue"
                              size="sm"
                              onClick={() =>
                                navigate(`/repertoire/${rep._id}/edit`)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              ml={7}
                              variant="link"
                              colorScheme="red"
                              size="sm"
                              onClick={() =>
                                dispatch(repertoireDelete(rep._id))
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Text>
                      <Button variant="solid" colorScheme="blue">
                        Buy ticket
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Repertoire;
