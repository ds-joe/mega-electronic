// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleUpdateSaleModal } from "@/redux/slicers/pages/sales";
import { clearCart } from "@/redux/slicers/components/cart";

// Hooks
import { useForm, usePage } from "@inertiajs/react";

// Components
import { Modal, Form, FormGroup, Button, FormSelect, FormControl, FormLabel } from "react-bootstrap";

// Types
import { UpdateSaleProps } from "@/types/Pages/Sales";
import { ChangeEvent, FormEventHandler, useEffect } from "react";

const UpdateSaleModal: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<UpdateSaleProps>;
  const { customers, sale } = pageData;
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state: RootState) => state.salesPage.updateSaleModalDisplay);
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const cartQuantity: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + Number(b.quantity), 0);
  const cartAmount: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + (Number(b.price as number) * Number(b.quantity)), 0);
  const { data, setData, post, wasSuccessful } = useForm({
    ...sale,
    method: sale.method,
    customer_id: sale.customer_id,
    discount: sale.discount,
    products: cartProducts
  });

  // Handle close modal.
  const handleCloseModal = () => {
    dispatch(toggleUpdateSaleModal());
  }

  // Handle submit
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('sales.update'));
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
    }
  }, [wasSuccessful]);

  return (
    <Modal show={modalDisplay} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{pageWords?.update_sale}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form" onSubmit={handleSubmit}>
          <div className="form-double">
            <FormGroup>
              <FormLabel>{pageWords?.method}</FormLabel>
              <FormSelect
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('method', e.target.value as any)}
                required
              >
                <option value="cash" selected={sale.method === 'cash'}>{pageWords?.cash}</option>
                <option value="payment" selected={sale.method === 'payment'}>{pageWords?.payment}</option>
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
                    <option key={customer.id} selected={customer.id === sale.customer_id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
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
              value={data.discount || 0}
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

export default UpdateSaleModal;
