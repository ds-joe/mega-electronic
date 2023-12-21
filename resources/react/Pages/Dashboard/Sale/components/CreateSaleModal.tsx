// Dependencies
import { FCComponent } from "@/types/App";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleCreateSaleModal } from "@/redux/slicers/pages/sales";
import { clearCart } from "@/redux/slicers/components/cart";

// Hooks
import { useForm } from "@inertiajs/react";

// Components
import { Modal, Form, FormGroup, Button, FormSelect, FormControl, FormLabel } from "react-bootstrap";

// Types
import { CreateSaleModalProps } from "@/types/Pages/Sales";
import { ChangeEvent, FormEventHandler, useEffect } from "react";

const CreateSaleModal: FCComponent<CreateSaleModalProps> = ({ pageWords, customers }) => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.salesPage.createSaleModalDisplay);
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const cartQuantity: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + b.quantity, 0);
  const cartAmount: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + ((b.price as number) * b.quantity), 0);
  const { setData, post, wasSuccessful, reset } = useForm({
    method: 'cash',
    customer_id: 0,
    discount: 0,
    products: cartProducts
  });

  // Handle close modal.
  const handleCloseModal = () => {
    dispatch(toggleCreateSaleModal());
  }

  // Handle submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('sales.create'));
  }

  // Set cart products
  useEffect(() => {
    setData('products', cartProducts);
  }, [cartProducts]);

  // Cleanup
  useEffect(() => {
    if (wasSuccessful) {
      dispatch(clearCart());
      handleCloseModal();
      reset();
    }
    return () => {
      reset();
    }
  }, [wasSuccessful]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.new_sale}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form" onSubmit={handleSubmit}>
          <div className="form-double">
            <FormGroup>
              <FormLabel>{pageWords?.method}</FormLabel>
              <FormSelect
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('method', e.target.value)}
                required
              >
                <option value="cash">{pageWords?.cash}</option>
                <option value="payment">{pageWords?.payment}</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>{pageWords?.customer}</FormLabel>
              <FormSelect
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('customer_id', Number(e.target.value))}
                required
              >
                <option value="" defaultValue={''} disabled selected>{pageWords?.select_customer}</option>
                {
                  customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                  ))
                }
              </FormSelect>
            </FormGroup>
          </div>
          <FormGroup>
            <FormLabel>{pageWords?.discount}</FormLabel>
            <FormControl
              type='number'
              step={0.01}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('discount', Number(e.target.value))}
              placeholder={pageWords?.discount}
            />
          </FormGroup>
          <FormGroup className="form-double font-semibold">
            <FormLabel>{pageWords?.amount}: $ {cartAmount.toFixed(2)}</FormLabel>
            <FormLabel>{pageWords?.quantity}: {cartQuantity.toFixed(2)}</FormLabel>
          </FormGroup>
          <FormGroup className="flex items-center gap-2 ">
            <Button type={"submit"}>{pageWords?.confirm}</Button>
            <Button type={"button"} variant="danger" onClick={handleCloseModal}>{pageWords?.cancel}</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateSaleModal;
