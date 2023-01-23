import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useState } from "react";

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
import { repertoireEdit } from "../../store/features/repertoire";

function RepertoireEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    movieId: "",
    day: "",
    time: "",
    hall: "",
  };

  const validationSchema = Yup.object({
    movieId: Yup.string().max(100, "Name is too long"),
    day: Yup.date(),
    time: Yup.string(),
    hall: Yup.number().max(100, "Password too long!"),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Edit</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            setLoading(true);
            dispatch(repertoireEdit(values));
            action.resetForm();
            navigate("/reprtoire");
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl
                  isInvalid={formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="movieId">movieId</FormLabel>
                  <Field
                    as={Input}
                    id="movieId"
                    name="movieId"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.movieId}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.day && formik.touched.day}
                >
                  <FormLabel htmlFor="day">Day</FormLabel>
                  <Field
                    as={Input}
                    id="day"
                    name="day"
                    type="date"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.day}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.time && formik.touched.time}
                >
                  <FormLabel htmlFor="time">Time</FormLabel>
                  <Field
                    as={Input}
                    id="time"
                    name="time"
                    type="time"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.hall && formik.touched.hall}
                >
                  <FormLabel htmlFor="hall">Hall</FormLabel>
                  <Field
                    as={Input}
                    id="hall"
                    name="hall"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.hall}</FormErrorMessage>
                </FormControl>

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

export default RepertoireEdit;
