import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerPost } from "../../store/features/users";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    login: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(100, "Name is too long").required(),
    login: Yup.string().max(50, "Login is too long!").required(),
    password: Yup.string().max(100, "Password too long!").required(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Register Form</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            setLoading(true);
            dispatch(registerPost(values));
            action.resetForm();
            navigate("/users/login");
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl
                  isInvalid={formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
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
                  />
                  <FormErrorMessage>{formik.errors.login}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.password && formik.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="blue" width="full">
                  Register
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );

  //   <Fragment>
  //     <div>Dupa</div>
  //     {loading && <span>Loading...</span>}
  //     <form onSubmit={formik.handleSubmit}>
  //       <input
  //         id="name"
  //         name="name"
  //         type="text"
  //         onChange={formik.handleChange}
  //       />
  //       <br />
  //       <input
  //         id="login"
  //         name="login"
  //         type="text"
  //         onChange={formik.handleChange}
  //       />
  //       <br />
  //       <input
  //         id="password"
  //         name="password"
  //         type="password"
  //         onChange={formik.handleChange}
  //       />
  //       <br />
  //       <button type="submit">Submit</button>
  //     </form>
  //   </Fragment>
  // );
}

export default RegisterForm;
