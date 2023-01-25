import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fetchMovies, movieDelete } from "../../store/features/movies";

function Movie() {
  const movies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  console.log(params.id);
  return (
    <Box bg="gray.100">
      <Flex align="center" justify="center" h="100vh">
        <VStack>
          <Text fontSize="5xl" m={10}>
            movie
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

                      <Text py="2">Genre {item.genre}</Text>
                      <Text py="2">Relasedate {item.relasedate}</Text>
                      <Text py="2">Director</Text>
                      {/*<Text py="2">*/}
                      {/*  Actors*/}
                      {/*  {item.actors.map((actor) => (*/}
                      {/*    <Text py="2" key={actor._id}>*/}
                      {/*      {actor.name} {actor.lastname}*/}
                      {/*    </Text>*/}
                      {/*  ))}*/}
                      {/*</Text>*/}
                      <Link> Trailer {item.trailer}</Link>
                      <Text py="2">Duration {item.time}</Text>
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

export default Movie;
