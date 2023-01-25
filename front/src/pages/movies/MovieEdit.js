import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

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

import { moviesEdit } from "../../store/features/movies";
import { useParams } from "react-router-dom";

function MovieEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    genre: "",
    relasedate: "",
    director: "",
    poster: "",
    duration: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().max(100).required(),
    genre: Yup.string().max(100).required(),
    relasedate: Yup.date().required(),
    director: Yup.string().required(),
    poster: Yup.string().url().required(),
    duration: Yup.number().required().positive(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Add movie</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            setLoading(true);
            dispatch(moviesEdit({ ...values, id }));
            action.resetForm();
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start" height="auto">
                <FormControl
                  isInvalid={formik.errors.title && formik.touched.title}
                >
                  <FormLabel htmlFor="title">title</FormLabel>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.genre && formik.touched.genre}
                >
                  <FormLabel htmlFor="genre">genre</FormLabel>
                  <Field
                    as={Input}
                    id="genre"
                    name="genre"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.genre}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.errors.relasedate && formik.touched.relasedate
                  }
                >
                  <FormLabel htmlFor="relasedate">relasedate</FormLabel>
                  <Field
                    as={Input}
                    id="relasedate"
                    name="relasedate"
                    type="date"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>
                    {formik.errors.relasedate}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.director && formik.touched.director}
                >
                  <FormLabel htmlFor="director">director</FormLabel>
                  <Field
                    as={Input}
                    id="director"
                    name="director"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.director}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.poster && formik.touched.poster}
                >
                  <FormLabel htmlFor="poster">poster</FormLabel>
                  <Field
                    as={Input}
                    id="poster"
                    name="poster"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.poster}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.duration && formik.touched.duration}
                >
                  <FormLabel htmlFor="duration">duration</FormLabel>
                  <Field
                    as={Input}
                    id="duration"
                    name="duration"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.duration}</FormErrorMessage>
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

export default MovieEdit;
