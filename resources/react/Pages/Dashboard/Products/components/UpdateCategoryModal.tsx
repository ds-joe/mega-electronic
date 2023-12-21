// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateCategoryModalDisplay } from "@/redux/slicers/pages/products";

// Hooks
import { useForm } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { FCComponent } from "@/types/App";
import { RootState } from "@/redux/store";

const UpdateCategoryModal: FCComponent = ({ pageWords }) => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.updateCategoryModalDisplay);
  const updatingCategoryData = useSelector((state: RootState) => state.productsPage.updatingCategory);

  const { data, setData, errors, processing, wasSuccessful, reset, post } = useForm({
    name: updatingCategoryData?.name,
    id: updatingCategoryData?.id
  });


  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleUpdateCategoryModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('categories.update'));
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset("name", 'id');
    }
    setData({
      name: updatingCategoryData.name,
      id: updatingCategoryData.id
    });
  }, [wasSuccessful, updatingCategoryData]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.update_category}</Modal.Title>
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

export default UpdateCategoryModal;
