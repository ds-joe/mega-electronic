// Dependencies
import { ChangeEvent, FormEvent, useEffect } from "react";
import { FCComponent } from "@/types/App";

// Components
import { Card, FormControl, Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Hooks
import { useForm } from "@inertiajs/react";

const ChangePasswordArea: FCComponent = ({ pageWords }) => {

  const { data, errors, setData, processing, reset, wasSuccessful, post } = useForm({
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('profile.change.password'));
  }

  // Cleanup
  useEffect(() => {
    return () => {
      reset('old_password', 'new_password', 'new_password_confirmation');
    }
  }, [wasSuccessful]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pageWords?.change_password}</Card.Title>
      </Card.Body>
      <Card.Body>
        <Form className={'form form-lg'} onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.old_password}</FormLabel>
            <FormControl
              name="old_password"
              type="password"
              className={errors.old_password && "is-invalid"}
              placeholder={pageWords?.old_password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('old_password', e.target.value)}
              value={data.old_password}
              required
            />
            <FormError message={errors.old_password} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.new_password}</FormLabel>
            <FormControl
              name="new_password"
              type="password"
              className={errors.new_password && "is-invalid"}
              placeholder={pageWords?.new_password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('new_password', e.target.value)}
              value={data.new_password}
              required
            />
            <FormError message={errors.new_password} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.confirm_password}</FormLabel>
            <FormControl
              name="new_password_confirmation"
              type="password"
              className={errors.new_password_confirmation && "is-invalid"}
              placeholder={pageWords?.confirm_password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('new_password_confirmation', e.target.value)}
              value={data.new_password_confirmation}
              required
            />
            <FormError message={errors.new_password_confirmation} />
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

export default ChangePasswordArea;
