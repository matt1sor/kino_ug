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
import {
  fetchRepertoires,
  repertoireAdd,
} from "../../store/features/repertoire";
import { useNavigate } from "react-router-dom";

function RepertoireForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    movieId: "",
    day: "",
    time: "",
    hall: "",
  };

  const validationSchema = Yup.object({
    movieId: Yup.string().max(25, "movieId is too long").required(),
    day: Yup.date().required(),
    time: Yup.string().required(),
    hall: Yup.number().max(10, "max hall number is 10").required().positive(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Repertoire Form</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            dispatch(repertoireAdd(values));
            action.resetForm();
            //dispatch(fetchRepertoires());
            navigate("/repetoire");
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl
                  isInvalid={formik.errors.movieId && formik.touched.movieId}
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

export default RepertoireForm;
