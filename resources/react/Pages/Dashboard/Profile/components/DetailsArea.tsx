// Dependencies
import { ChangeEvent, FormEvent, useEffect } from "react";
import { FCComponent } from "@/types/App";

// Components
import { Card, FormControl, Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Hooks
import { ProfileDetailsAreaProps } from "@/types/Pages/Profile";

// Types
import { useForm } from "@inertiajs/react";

const DetailsArea: FCComponent<ProfileDetailsAreaProps> = ({ pageWords, user }) => {

  const { data, errors, setData, processing, reset, wasSuccessful, post } = useForm({
    full_name: "",
    email: "",
  });

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('profile.change.details'));
  }

  // Cleanup
  useEffect(() => {
    setData({
      full_name: user.full_name as string,
      email: user.email as string
    });
    return () => {
      reset('full_name', 'email');
    }
  }, [wasSuccessful]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pageWords?.account_details}</Card.Title>
      </Card.Body>
      <Card.Body>
        <Form className={'form form-lg '} onSubmit={handleSubmit}>
          <FormGroup className="form-double">
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.full_name}</FormLabel>
              <FormControl
                name="full_name"
                className={errors.full_name && "is-invalid"}
                placeholder={pageWords?.full_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('full_name', e.target.value)}
                value={data.full_name}
                required
              />
              <FormError message={errors.full_name} />
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.email}</FormLabel>
              <FormControl
                name="email"
                type="email"
                className={errors.email && "is-invalid"}
                placeholder={pageWords?.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                value={data.email}
                required
              />
              <FormError message={errors.email} />
            </FormGroup>
          </FormGroup>
          <FormGroup className="flex items-center gap-2">
            <Button type="submit" disabled={processing} >
              {pageWords?.save_changes}
            </Button>
          </FormGroup>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default DetailsArea;
