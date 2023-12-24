// Dependencies
import { ChangeEvent, FormEventHandler, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateProductModalDisplay } from "@/redux/slicers/pages/products";

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
import { Product } from "@/types/Models/Product";
import ReactQuill from "react-quill";

const UpdateProductModal: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const { brands, categories } = pageData;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.updateProductModalDisplay);
  const updatingProduct = useSelector((state: RootState) => state.productsPage.updatingProduct);
  const { data, setData, errors, post, processing, wasSuccessful } = useForm<Product>(updatingProduct);

  // Handle upload image
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setData('image', file as any);
  }

  console.log(pageData)

  // Handle close modal function
  const handleCloseModal = () => {
    dispatch(toggleUpdateProductModalDisplay());
  }

  // Handle form submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('products.update'), {
      forceFormData: true
    });
  }

  useEffect(() => {
    setData(updatingProduct);
  }, [updatingProduct])

  // Clean up
  useEffect(() => {
    if (wasSuccessful) {
      handleCloseModal();
    }
  }, [wasSuccessful]);


  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title >{pageWords?.update_product}</Modal.Title>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('price', Number(e.target.value))}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('rate', Number(e.target.value))}
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
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('category_id', e.target.value as any)}
                name="category"
                required
              >
                <option disabled selected value={""}>{pageWords.select_category}</option>
                {
                  categories.map((category: Category) => (
                    <option key={category.id} value={category.id} selected={category.id === data.category_id}>{category.name}</option>
                  ))
                }
              </FormSelect>
              <FormError message={errors.category_id} />
            </FormGroup>

            <FormGroup>
              <FormLabel className={"form-label"}>{pageWords?.brand}</FormLabel>
              <FormSelect
                className="form-control"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('brand_id', e.target.value as any)}
                name="brand"
                required
              >
                <option disabled selected value={""}>{pageWords.select_brand}</option>
                {
                  brands.map((brand: Brand) => (
                    <option key={brand.id} value={brand.id} selected={brand.id === data.brand_id}>{brand.name} </option>
                  ))
                }
              </FormSelect>
              <FormError message={errors.brand_id} />
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

export default UpdateProductModal;
