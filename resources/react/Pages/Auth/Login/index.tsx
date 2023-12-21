// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";
import { FCPage } from "@/types/App";

// Components
import Head from "@/Components/Layout/Head";
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Image } from "react-bootstrap";
import CheckRadio from "@/Components/Form/CheckRadio";
import FormError from "@/Components/Form/FormError";
import { useForm } from "@inertiajs/react";

// Assets
import logo from "~/images/logo/logo-light-full.png";

const Login: FCPage = () => {
  const { data, setData, errors, post, processing, reset } = useForm({
    email: "",
    remember_me: false,
    password: ""
  });

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/auth/login", {
      onSuccess: () => {
        location.reload();
      }
    });
  }

  // Clean up
  useEffect(() => {
    return () => {
      reset('password');
    }
  }, []);


  // @ts-ignore
  return (
    <>
      <Head title={"Dashboard - Sign in"} />
      <main className={"flex items-center justify-center min-h-screen min-w-full bg-light"}>
        <Card>
          <Card.Body>
            <Image width={140} className={'mb-3'} src={logo} alt={"logo"} />
            <Card.Subtitle>Welcome back! Log in to your account.</Card.Subtitle>
          </Card.Body>
          <Card.Body>
            <Form className={'form'} onSubmit={handleSubmit}>
              <Card.Title>Sign in</Card.Title>
              <FormGroup>
                <FormLabel className={"form-label"}>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  placeholder={`Your email`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                  value={data.email}
                  required
                />
                <FormError message={errors.email} />
              </FormGroup>
              <FormGroup>
                <FormLabel className={"form-label"}>Password</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder={`Your password`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                  value={data.password}
                  required
                />
                <FormError message={errors.password} />
              </FormGroup>
              <FormGroup>
                <CheckRadio
                  type="switch"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData("remember_me", e.target.checked)}
                  label={"Remember me"}
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" disabled={processing} >
                  Sign in
                </Button>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}

export default Login;
