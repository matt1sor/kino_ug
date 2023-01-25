import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fetchMovies, movieDelete } from "../../store/features/movies";

function Movies() {
  const [sortBy, setSortBy] = useState("title");
  const [dir, setDir] = useState("asc");
  const movies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    dispatch(fetchMovies({ sortBy, dir }));
  }, [dispatch, sortBy, dir]);
  return (
    <Box bg="gray.100">
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
      <Flex align="center" justify="center">
        <VStack>
          <Text>Sort options</Text>
          <Select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="title">Title</option>
            <option value="relasedate">Date</option>
            <option value="duration">Duration</option>
          </Select>
          <Select value={dir} onChange={(event) => setDir(event.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
          <Text fontSize="5xl" m={10}>
            MOVIES
          </Text>
          <List spacing={5}>
            {movies.map((item) => (
              <ListItem key={item._id}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={item.poster}
                  />
                  <Stack>
                    <CardBody>
                      <Heading>{item.title}</Heading>
                      <Text py="2">GENRE: {item.genre}</Text>
                      <Text py="2">RELEASE DATE: {item.relasedate}</Text>
                      <Text py="2">DIRECTOR: {item.director}</Text>
                      <Text py="2">DURATION(min): {item.duration}</Text>
                      <Text py="2">MovieId: {item._id}</Text>
                    </CardBody>

                    <CardFooter justify="right">
                      <Text mr={20} mt={2}>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                          onClick={() => navigate(`/movies/edit/${item._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="red"
                          size="sm"
                          onClick={() => dispatch(movieDelete(item._id))}
                        >
                          Delete
                        </Button>
                      </Text>
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

export default Movies;
