import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

function Repertoire() {
  const repertoire = useSelector((state) => state.repertoire.repertoires);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const [sortBy, setSortBy] = useState("hall");
  const [dir, setDir] = useState("asc");

  useEffect(() => {
    dispatch(fetchRepertoires({ sortBy, dir }));
  }, [dispatch, sortBy, dir]);
  return (
    <Box bg="gray.100" h="100vh">
      {isAdmin && (
        <Menu>
          <MenuButton as={Button} colorScheme="blue">
            Admin tools
          </MenuButton>
          <MenuList>
            <MenuGroup title="Movies">
              <MenuItem onClick={() => navigate("/movies/add")}>
                Add Movie
              </MenuItem>
              <MenuItem onClick={() => navigate("/movies")}>
                See Movies
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Repertoires">
              <MenuItem onClick={() => navigate("/repertoire/add")}>
                Add Repertoire
              </MenuItem>
              <MenuItem onClick={() => navigate("/repertoire")}>
                See Repertoires
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
      <Flex align="center" justify="center" bg="gray.100">
        <VStack>
          <Select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="day">Day</option>
            <option value="hall">Hall</option>
          </Select>
          <Select value={dir} onChange={(event) => setDir(event.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
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
                    src={rep.movieId?.poster}
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
                        <Button
                          onClick={() => navigate(`/movie/${rep.movieId._id}`)}
                          color="blue.300"
                        >
                          Details
                        </Button>
                        {isAdmin && (
                          <>
                            <Button
                              ml={7}
                              variant="link"
                              colorScheme="blue"
                              size="sm"
                              onClick={() =>
                                navigate(`/repertoire/edit/${rep._id}`)
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
