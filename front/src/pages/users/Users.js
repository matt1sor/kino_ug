import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useEffect } from "react";

import { fetchUsers, usersDelete } from "../../store/features/usersList";

function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const users = useSelector((state) => state.usersList.usersList);

  useEffect(() => {
    dispatch(fetchUsers());
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
            <MenuGroup title="Orders">
              <MenuItem onClick={() => navigate("/order")}>See Orders</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
      <Flex align="center" justify="center">
        <VStack>
          <Text fontSize="5xl" m={10}>
            Users
          </Text>
          <List spacing={5}>
            {users.map((item) => (
              <ListItem key={item._id}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Stack>
                    <CardBody>
                      <Heading>User ID {item._id}</Heading>
                      <Text py="2">Login: {item.login}</Text>
                      <Text py="2">Role:{item.role}</Text>
                    </CardBody>

                    <CardFooter justify="right">
                      <Text mr={20} mt={2}>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                          onClick={() => navigate(`/users/edit/${item._id}`)}
                        >
                          Edit login
                        </Button>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="red"
                          size="sm"
                          onClick={() => dispatch(usersDelete(item._id))}
                        >
                          Delete user
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
export default UsersList;
