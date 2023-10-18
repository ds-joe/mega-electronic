// Dependencies
import { ChangeEvent, FC, FormEvent, useEffect } from "react";

// Components
import { Link, useForm } from "@inertiajs/react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import CheckRadio from "@/Components/Dashboard/CheckRadio";
import SignSocialIcons from "@/Components/Auth/SignSocialIcons";
import FormError from "@/Components/Dashboard/FormError";

// Layout
import AuthLayout from "@/Layout/Auth";

// Types
import { ServerPageWords } from "@/types/Server";


const Signin: FC<ServerPageWords> = ({ pageWords }) => {
  const { data, setData, errors, post, processing, reset } = useForm({
    email: "",
    remember_me: false,
    password: ""
  });

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/auth/login");
  }

  // Clean up
  useEffect(() => {

    return () => {
      reset('password');
    }
  }, [])

  return (
    <AuthLayout pageTitle={pageWords.sign_in}>
      <article className="form-card">
        <div className="card-body">
          <h1 className="card-title w-full text-center">{pageWords.sign_in_with}</h1>
          <SignSocialIcons className="mt-5" />
          <h1 className="text-dlg font-semibold color-light mt-5  w-full text-center">{pageWords.or}</h1>
          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
              <FormLabel className="form-label">{pageWords.email}</FormLabel>
              <FormControl
                type="email"
                name="email"
                placeholder={`${pageWords.your} ${pageWords.email}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                value={data.email}
                required
              />
              <FormError message={errors.email} />
            </FormGroup>
            <FormGroup className="form-group">
              <FormLabel className="form-label">{pageWords.password}</FormLabel>
              <FormControl
                type="password"
                name="password"
                placeholder={`${pageWords.your} ${pageWords.password}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                value={data.password}
                required
              />
              <FormError message={errors.password} />
            </FormGroup>
            <CheckRadio
              type="switch"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData("remember_me", e.target.checked)}
              label={pageWords.remember_me}
            />
            <Button type="submit" disabled={processing} className="mt-5 bg-dash-blue text-white">
              {pageWords.sign_in}
            </Button>
            <p className="color-light mt-5 w-full text-center">
              {pageWords.you_dont_have_an_account} <Link href={route('auth.register')} className="color-default font-semibold">{pageWords.sign_up}</Link>
            </p>
          </Form>
        </div>
      </article>
    </AuthLayout>
  )
}

export default Signin;
