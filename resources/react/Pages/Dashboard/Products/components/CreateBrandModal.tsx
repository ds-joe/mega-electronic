// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateBrandModalDisplay } from "@/redux/slicers/pages/products";

// Hooks
import { useForm } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { FCComponent } from "@/types/App";
import { RootState } from "@/redux/store";

const CreateBrandModal: FCComponent = ({ pageWords }) => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.createBrandModalDisplay);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    name: "",
    description: "",
    image: null
  });

  // Handle upload image
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('image', file as any);
  }

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleCreateBrandModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('brands.create'), {
      forceFormData: true
    });
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
        <Modal.Title>{pageWords?.create_brand}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.name}</FormLabel>
            <FormControl
              name="name"
              className={errors.name && "is-invalid"}
              placeholder={pageWords?.brand_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
              value={data.name}
              required
            />
            <FormError message={errors.name} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.brand_image}</FormLabel>
            <FormControl
              name="image"
              type="file"
              className={errors.image && "is-invalid"}
              onChange={handleUploadImage}
            />
            <FormError message={errors.image} />
          </FormGroup>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.description}</FormLabel>
            <textarea
              name="description"
              className={`form-control  ${errors.description && "is-invalid"}`}
              placeholder={pageWords?.brand_description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
              rows={7}
              value={data.description}
            />
            <FormError message={errors.description} />
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

export default CreateBrandModal;
