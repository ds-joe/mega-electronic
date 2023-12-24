// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateBrandModalDisplay } from "@/redux/slicers/pages/products";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { RootState } from "@/redux/store";
import { Brand } from "@/types/Models/Brand";
import ReactQuill from "react-quill";

const UpdateBrandModal: RC = () => {
  const { pageWords } = usePage().props as ServerProps;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.updateBrandModalDisplay);
  const updatingBrandData = useSelector((state: RootState) => state.productsPage.updatingBrand);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm<Brand>({
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
    dispatch(toggleUpdateBrandModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('brands.update'), {
      forceFormData: true
    });
  }

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
      reset();
    }
    setData({
      ...updatingBrandData
    });
  }, [wasSuccessful, updatingBrandData]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.update_brand}</Modal.Title>
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
            <ReactQuill
              theme="snow"
              placeholder={pageWords?.brand_description}
              onChange={(e) => setData('description', e)}
              value={data.description}
            />
            <FormError message={errors.description} />
          </FormGroup>
          <FormGroup className="flex items-center gap-2">
            <Button type="submit" disabled={processing} >
              {pageWords?.update}
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

export default UpdateBrandModal;
