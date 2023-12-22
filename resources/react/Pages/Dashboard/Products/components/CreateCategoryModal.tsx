// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateCategoryModalDisplay } from "@/redux/slicers/pages/products";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { RootState } from "@/redux/store";

const CreateCategoryModal: RC = () => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.createCategoryModalDisplay);
  const { pageWords } = usePage().props as ServerProps;

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    name: "",
  });


  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleCreateCategoryModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('categories.create'));
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset("name");
    }
  }, [wasSuccessful]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.create_category}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.name}</FormLabel>
            <FormControl
              name="name"
              className={errors.name && "is-invalid"}
              placeholder={pageWords?.category_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
              value={data.name}
              required
            />
            <FormError message={errors.name} />
          </FormGroup>
          <FormGroup className="flex items-center gap-2">
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

export default CreateCategoryModal;
