// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateCustomerModalDisplay } from "@/redux/slicers/pages/customers";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { RootState } from "@/redux/store";

const CreateCustomerModal: RC = () => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.customersPage.createCustomerModalDisplay);
  const { pageWords } = usePage().props as ServerProps;
  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
  });


  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleCreateCustomerModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('customers.create'));
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset();
    }
  }, [wasSuccessful]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.create_customer}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup className="form-double">
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.first_name}</FormLabel>
              <FormControl
                name="first_name"
                className={errors.first_name && "is-invalid"}
                placeholder={pageWords?.first_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('first_name', e.target.value)}
                value={data.first_name}
                required
              />
              <FormError message={errors.first_name} />
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.last_name}</FormLabel>
              <FormControl
                name="last_name"
                className={errors.last_name && "is-invalid"}
                placeholder={pageWords?.last_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('last_name', e.target.value)}
                value={data.last_name}
                required
              />
              <FormError message={errors.last_name} />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.phone}</FormLabel>
            <FormControl
              name="phone"
              className={errors.phone && "is-invalid"}
              placeholder={pageWords?.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value)}
              value={data.phone}
            />
            <FormError message={errors.phone} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.email}</FormLabel>
            <FormControl
              name="email"
              className={errors.email && "is-invalid"}
              placeholder={pageWords?.email}
              type="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
              value={data.email}
            />
            <FormError message={errors.email} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.address}</FormLabel>
            <FormControl
              name="address"
              className={errors.address && "is-invalid"}
              placeholder={pageWords?.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('address', e.target.value)}
              value={data.address}
            />
            <FormError message={errors.address} />
          </FormGroup>
          <FormGroup className="flex items-center gap-2 mt-2">
            <Button type="submit" disabled={processing} >
              {pageWords?.create}
            </Button>
            <Button type="button" className="btn-danger" onClick={handleCloseModal}>
              {pageWords?.cancel}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCustomerModal;
