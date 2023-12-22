// Dependencies
import { ChangeEvent, FormEventHandler, useEffect, useRef } from "react";

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

const CreateProductModal: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const { brands, categories } = pageData;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.productsPage.createProductModalDisplay);
  const colorsInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
    name: "",
    price: "",
    rate: "",
    brand: null,
    category: null,
    description: "",
    image: null,
    colors: []
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

  // Handle remove color
  const handleRemoveColor = (color: string) => {
    setData('colors', data.colors.filter((co: string) => co !== color));
  }

  // Handle add color
  const handleAddColor = () => {
    if (!data.colors.includes(colorsInput.current?.value as never)) {
      setData('colors', [
        ...data.colors,
        colorsInput.current?.value as never
      ]);
    }
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
            <textarea
              name="description"
              className={`form-control  ${errors.description && "is-invalid"}`}
              placeholder={pageWords?.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
              rows={7}
              value={data.description}
            />
            <FormError message={errors.description} />
          </FormGroup>

          {/** start-colors-area */}
          <FormGroup >
            <FormLabel className="form-label">{pageWords?.add_colors}</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl
                type="color"
                className="w-full"
                ref={colorsInput}
              />
              <Button className="btn btn-success btn-sm" onClick={handleAddColor}>{pageWords?.add}</Button>
            </div>
            <FormError message={errors.colors} />
          </FormGroup>

          <FormGroup className="flex items-center gap-2 flex-wrap mb-3">
            {
              data.colors.map((color: string) => (
                <p
                  className=" w-5 h-5 rounded-full cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => handleRemoveColor(color)}
                />
              ))
            }
          </FormGroup>
          {/** end-colors-area */}


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
