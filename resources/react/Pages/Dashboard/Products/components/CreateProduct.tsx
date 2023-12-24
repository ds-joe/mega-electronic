// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateProductModalDisplay } from "@/redux/slicers/pages/products";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap";
import FormError from "@/Components/Form/FormError";

// Types
import { RootState } from "@/redux/store";
import { ProductsProps } from "@/types/Pages/Products";
import { Category } from "@/types/Models/Category";
import { Brand } from "@/types/Models/Brand";
import ReactQuill from "react-quill";

const CreateProductModal: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const { brands, categories } = pageData;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.createProductModalDisplay);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    name: "",
    price: "",
    rate: "",
    brand: null,
    category: null,
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
    dispatch(toggleCreateProductModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('products.create'), {
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
        <Modal.Title >{pageWords?.create_product}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={'form'} onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.name}</FormLabel>
            <FormControl
              name="name"
              className={errors.name && "is-invalid"}
              placeholder={pageWords?.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
              value={data.name}
              required
            />
            <FormError message={errors.name} />
          </FormGroup>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.price}</FormLabel>
              <FormControl
                name="price"
                className={errors.price && "is-invalid"}
                type="number"
                min={0}
                step={0.01}
                placeholder={pageWords?.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('price', e.target.value)}
                value={data.price}
                required
              />
              <FormError message={errors.price} />
            </FormGroup>
            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.rate}</FormLabel>
              <FormControl
                name="rate"
                className={errors.rate && "is-invalid"}
                type="number"
                max={5}
                min={0}
                step={0.05}
                placeholder={pageWords?.rate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('rate', e.target.value)}
                value={data.rate}
                required
              />
              <FormError message={errors.rate} />
            </FormGroup>
          </div>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.product_image}</FormLabel>
            <FormControl
              name="image"
              type="file"
              className={errors.image && "is-invalid"}
              onChange={handleUploadImage}
            />
            <FormError message={errors.image} />
          </FormGroup>
          <div className="grid grid-cols-2 gap-4">

            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.category}</FormLabel>
              <FormSelect
                className="form-control"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('category', e.target.value as any)}
                name="category"
                required
              >
                <option disabled selected value={""}>{pageWords.select_category}</option>
                {
                  categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
              </FormSelect>
              <FormError message={errors.category} />
            </FormGroup>

            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.brand}</FormLabel>
              <FormSelect
                className="form-control"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('brand', e.target.value as any)}
                name="brand"
                required
              >
                <option disabled selected value={""}>{pageWords.select_brand}</option>
                {
                  brands.map((brand: Brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))
                }
              </FormSelect>
              <FormError message={errors.brand} />
            </FormGroup>
          </div>
          <FormGroup>
            <FormLabel className={"form-label"}>{pageWords?.description}</FormLabel>
            <ReactQuill
              theme="snow"
              placeholder={pageWords?.description}
              onChange={(e) => setData('description', e)}
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

export default CreateProductModal;
