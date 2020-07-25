import React, { useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/authprovider";

const User = (props) => {
  const [userlogin, setUserlogin] = React.useState(true);

  const { registerUser, loginUser, authstate, autherrors } = useContext(
    AuthContext
  );

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [user_name, setUsername] = React.useState("");

  const handleonchange = (e) => {
    if (e.target.type === "email") {
      setUser({ ...user, email: e.target.value });
    }
    if (e.target.type === "password") {
      setUser({ ...user, password: e.target.value });
    }
    if (e.target.type === "text") {
      setUsername(e.target.value);
    }
  };

  useEffect(() => {
    if (!autherrors) {
      setUserlogin(!userlogin);
      // return "ok";
      // console.log("ok");
    }
  }, [autherrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(errors);
    if (userlogin) {
      loginUser(user);
      // setUser({ email: "", password: "" });
    }

    if (!userlogin) {
      registerUser({ ...user, user_name });

      // setTimeout(handlehide, 5000);
    }
  };
  return (
    <div>
      {!authstate.isAuthenticated ? (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{}}
        >
          <Modal.Header closeButton>
            {userlogin ? (
              <Modal.Title id="contained-modal-title-vcenter">
                User Login
              </Modal.Title>
            ) : (
              <Modal.Title id="contained-modal-title-vcenter">
                User Sign Up
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  className="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    handleonchange(e);
                  }}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              {!userlogin ? (
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className=""
                    placeholder="Username"
                    onChange={(e) => {
                      handleonchange(e);
                    }}
                  />
                </Form.Group>
              ) : null}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="password"
                  placeholder="Password"
                  onChange={(e) => {
                    handleonchange(e);
                  }}
                />
              </Form.Group>

              <Form.Group>
                {userlogin ? (
                  <p
                    style={{ cursor: "pointer", color: "grey" }}
                    onClick={() => setUserlogin(false)}
                  >
                    Do not have an account? Sign Up
                  </p>
                ) : (
                  <p
                    style={{ cursor: "pointer", color: "grey" }}
                    onClick={() => setUserlogin(true)}
                  >
                    Already have an account? Login
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                {authstate.autherrors ? (
                  <p
                    style={{ cursor: "pointer", color: "red" }}
                    // onClick={() => setUserlogin(false)}
                  >
                    {authstate.autherrors.email} {authstate.autherrors.password}
                    {authstate.autherrors.user_name}
                  </p>
                ) : (
                  <p>Sign up successful. Login</p>
                )}
              </Form.Group>
              <Button
                variant="dark"
                className=""
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
};

export default User;
