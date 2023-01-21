import { useFormik, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { loginHandler } from "../../store/features/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //const [showPassword, setShowPassword] = useState(false);
  //
  // const validationSchema = Yup.object({
  //   login: Yup.string().max(50, "Login is too long!").required(),
  //   password: Yup.string().max(100, "Wrong password!").required(),
  // });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().max(50, "Login is too long!").required(),
      password: Yup.string().max(100, "Wrong password!").required(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(loginHandler(values));
      formik.resetForm();
      navigate("/repertoire");
    },
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Login</FormLabel>
              <Input
                id="login"
                name="login"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>

            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>

    // <Fragment>
    //   {loading && <span>Loading...</span>}
    //   <form onSubmit={formik.handleSubmit}>
    //     <input
    //       id="login"
    //       name="login"
    //       type="text"
    //       onChange={formik.handleChange}
    //     />
    //     <input
    //       id="password"
    //       name="password"
    //       type="password"
    //       onChange={formik.handleChange}
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    //   <Link to="/users/register">Nie masz konta? Zarejestruj sie!</Link>
    // </Fragment>
  );
}

export default Login;
