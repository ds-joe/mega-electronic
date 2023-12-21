// Dependencies
import { FC } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, toggleOpen } from "@/redux/slicers/components/cart";

// Hooks
import useToast from "@/hooks/useToast";

// Components
import CartProduct from "./components/Product";
import { CartProductProps } from "@/types/Components/Layout/Cart";
import { Button, FormGroup } from "react-bootstrap";
import { Link } from "@inertiajs/react";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.layout.layoutsWords.dashboard);
  const cartQuantity: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + b.quantity, 0);
  const cartAmount: number = useSelector((state: RootState) => state.cart.products).reduce((a, b) => a + ((b.price as number) * b.quantity), 0);
  const cartOpen: boolean = useSelector((state: RootState) => state.cart.isOpen);
  const products: Array<CartProductProps> = useSelector((state: RootState) => state.cart.products);
  const cartMode = useSelector((state: RootState) => state.cart.mode);
  const { confirmationToast, toast } = useToast()

  // Toggle close cart.
  const closeCart = () => {
    dispatch(toggleOpen());
  }

  // Reset cart.
  const resetCart = () => {
    confirmationToast(words?.do_you_want_clear_cart, () => {
      dispatch(clearCart());
      toast(words?.cart_clear_successfully, 'success');
    });
  }

  return (
    <aside className={`pf-cart ${cartOpen && "open"}`}>
      <header className="header">
        <h1 className="cart-title">{words?.cart}</h1>
        <i className="fal fa-xmark close-button" onClick={closeCart}></i>
      </header>
      <section className="content">
        {
          products.length > 0 ? products.map((product: CartProductProps) => <CartProduct pageWords={words} {...product} />) : (
            <div className="empty-title">{words?.no_products}</div>
          )
        }
      </section>
      <footer className="footer">
        <FormGroup className="flex flex-col">
          <p className="form-label m-0">{words?.amount}: <span>$ {cartAmount.toFixed(2)}</span></p>
          <p className="form-label">{words?.quantity}: <span>{cartQuantity.toFixed(2)}</span></p>
        </FormGroup>
        <FormGroup className="flex items-center gap-2 mt-3">
          <Button size="sm" variant="danger" onClick={resetCart}>{words?.clear}</Button>
          {
            cartMode === "create" && (
              <Link href={route('sales.create.show')} onClick={closeCart}>
                <Button size="sm">{words?.confirm}</Button>
              </Link>
            )
          }
        </FormGroup>
      </footer>
    </aside>
  )
}

export default Cart;
