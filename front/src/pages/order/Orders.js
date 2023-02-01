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
import { fetchOrders, orderDelete } from "../../store/features/order";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrders());
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
            <MenuGroup title="Users">
              <MenuItem onClick={() => navigate("/users")}>See Users</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
      <Flex align="center" justify="center">
        <VStack>
          <Text fontSize="5xl" m={10}>
            All Orders
          </Text>
          <List spacing={5}>
            {orders.map((item) => (
              <ListItem key={item._id}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Stack>
                    <CardBody>
                      <Heading>ORDER ID {item._id}</Heading>
                      <Text py="2">Movie title: {item.movieTitle}</Text>
                      <Text py="2">Day:{item.day}</Text>
                      <Text py="2">Hall: {item.hall}</Text>
                      <Text py="2">Time: {item.time}</Text>
                      <Text py="2">BuyerId: {item.buyer}</Text>
                    </CardBody>

                    <CardFooter justify="right">
                      <Text mr={20} mt={2}>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                          onClick={() => navigate(`/order/edit/${item._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          ml={7}
                          variant="link"
                          colorScheme="red"
                          size="sm"
                          onClick={() => dispatch(orderDelete(item._id))}
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
export default Orders;
