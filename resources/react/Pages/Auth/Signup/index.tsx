// Dependencies
import { ChangeEvent, FC, FormEvent, useEffect } from "react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import SignSocialIcons from "@/Components/Auth/SignSocialIcons";
import FormError from "@/Components/Dashboard/FormError";

// Layout
import AuthLayout from "@/Layout/Auth";
import { Link, useForm } from "@inertiajs/react";

// Types
import { ServerPageWords } from "@/types/Server";

const Signup: FC<ServerPageWords> = ({ pageWords }) => {
  const { data, setData, errors, post, processing, reset } = useForm({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  // Handle Form Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/auth/register");
  }

  // Clean up Password after every request
  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    }
  }, [])

  return (
    <AuthLayout pageTitle={pageWords.sign_up}>
      <article className="form-card">
        <div className="card-body">
          <h1 className="card-title w-full text-center">{pageWords.sign_up_with}</h1>
          <SignSocialIcons className="mt-5" />
          <h1 className="text-dlg font-semibold color-light mt-5 w-full text-center">{pageWords.or}</h1>
          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
              <FormLabel className="form-label">{pageWords.full_name}</FormLabel>
              <FormControl
                type="text"
                name="full_name"
                placeholder={`${pageWords.your} ${pageWords.full_name}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('full_name', e.target.value)}
                value={data.full_name}
                required
              />
              <FormError message={errors.full_name} />
            </FormGroup>
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
            <FormGroup className="form-group">
              <FormLabel className="form-label">{pageWords.confirm_password}</FormLabel>
              <FormControl
                type="password"
                name="password_confirmation"
                placeholder={`${pageWords.your} ${pageWords.confirm_password}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password_confirmation', e.target.value)}
                value={data.password_confirmation}
                required
              />
              <FormError message={errors.password_confirmation} />
            </FormGroup>
            <Button type="submit" className="mt-5 bg-dash-blue text-white" disabled={processing}>
              {pageWords.sign_up}
            </Button>
            <p className="color-light mt-5 w-full text-center">
              {pageWords.already_have_an_account} <Link href={"/auth/login"} className="color-default font-semibold"> {pageWords.sign_in}</Link>
            </p>
          </Form>
        </div>
      </article>
    </AuthLayout>
  )
}

export default Signup;
