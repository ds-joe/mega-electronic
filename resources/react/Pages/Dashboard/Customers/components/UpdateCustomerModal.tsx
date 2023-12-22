// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateCustomerModalDisplay } from "@/redux/slicers/pages/customers";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { RootState } from "@/redux/store";

const UpdateCustomerModal: RC = () => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.customersPage.updateCustomerModalDisplay);
  const updatingCustomerData = useSelector((state: RootState) => state.customersPage.updatingCustomer);
  const { pageWords } = usePage().props as ServerProps;

  const { data, setData, errors, processing, wasSuccessful, reset, post } = useForm({
    id: updatingCustomerData?.id,
    first_name: updatingCustomerData?.first_name,
    last_name: updatingCustomerData?.last_name,
    email: updatingCustomerData?.email,
    phone: updatingCustomerData?.phone,
    address: updatingCustomerData?.address,
  });

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleUpdateCustomerModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('customers.update'));
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset();
    }
    setData({
      id: updatingCustomerData?.id,
      first_name: updatingCustomerData?.first_name,
      last_name: updatingCustomerData?.last_name,
      email: updatingCustomerData?.email,
      phone: updatingCustomerData?.phone,
      address: updatingCustomerData?.address,
    });
  }, [wasSuccessful, updatingCustomerData]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.update_customer}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup className="form-double">
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.first_name}</FormLabel>
              <FormControl
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

export default UpdateCustomerModal;
