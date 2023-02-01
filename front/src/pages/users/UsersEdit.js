import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

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

import { useParams } from "react-router-dom";
import { usersEdit } from "../../store/features/usersList";

function UsersEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialValues = {
    login: "",
    // role: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().required(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Edit users login </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            dispatch(usersEdit({ ...values, id }));
            action.resetForm();
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start" height="auto">
                <FormControl
                  isInvalid={formik.errors.login && formik.touched.login}
                >
                  <FormLabel htmlFor="login">login</FormLabel>
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
                {/*<FormControl*/}
                {/*  isInvalid={formik.errors.role && formik.touched.role}*/}
                {/*>*/}
                {/*  <FormLabel htmlFor="role">Role</FormLabel>*/}
                {/*  <Field*/}
                {/*    as={Input}*/}
                {/*    id="role"*/}
                {/*    name="role"*/}
                {/*    type="text"*/}
                {/*    variant="filled"*/}
                {/*    onChange={formik.handleChange}*/}
                {/*  />*/}
                {/*  <FormErrorMessage>{formik.errors.role}</FormErrorMessage>*/}
                {/*</FormControl>*/}

                <Button type="submit" colorScheme="blue" width="full">
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default UsersEdit;
