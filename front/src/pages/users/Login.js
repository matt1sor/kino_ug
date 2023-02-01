import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

import { loginHandler } from "../../store/features/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    login: "",
    password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().max(50, "Login is too long!").required(),
    password: Yup.string().max(100, "Wrong password!").required(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <VStack>
        <Text fontSize="5xl" m={10}>
          Welcome in Colleage Cinema
        </Text>
        <Box bg="white" p={6} rounded="md">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              dispatch(loginHandler(values));

              navigate("/repertoire");
            }}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl
                    isInvalid={formik.errors.login && formik.touched.login}
                  >
                    <FormLabel htmlFor="login">Login</FormLabel>
                    <Field
                      as={Input}
                      id="login"
                      name="login"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <FormErrorMessage>{formik.errors.login}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  <Button type="submit" colorScheme="blue" width="full">
                    Login
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>

          <Link onClick={() => navigate("/users/register")}>
            Don't have an account?! Sign up now!
          </Link>
        </Box>
      </VStack>
    </Flex>
  );
}

export default Login;
