import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { loading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password don't Matched, Please try again");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Login Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          {/* Name */}
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          {/* Email */}
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Password */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Confirm Password */}
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="confirm password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Button */}
        <Button type="submit" variant="primary" disabled={loading}>
          Register
        </Button>

        {loading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Already have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
