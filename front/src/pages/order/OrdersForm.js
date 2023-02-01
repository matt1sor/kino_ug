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

import { orderEdit } from "../../store/features/order";
import { useParams } from "react-router-dom";

function OrdersForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    day: "",
    hall: "",
    time: "",
  };

  const validationSchema = Yup.object({
    day: Yup.date().required().min(new Date()),
    time: Yup.string().required(),
    hall: Yup.number()
      .max(10, "max hall number is 10")
      .required()
      .positive()
      .min(1)
      .integer(),
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Text align="center">Edit order </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, action) => {
            dispatch(orderEdit({ ...values, id }));
            action.resetForm();
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start" height="auto">
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

export default OrdersForm;
