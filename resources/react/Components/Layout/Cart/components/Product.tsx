// Dependencies
import { ChangeEvent } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setProductQuantity, removeProduct } from "@/redux/slicers/components/cart";

// Hooks
import { usePage } from "@inertiajs/react";

// Components
import { Button, FormControl, FormGroup, Image } from "react-bootstrap";
import useToast from "@/hooks/useToast";

// Types
import { CartProductProps } from "@/types/Components/Layout/Cart";

// Assets
import fakeImage from "~/images/global/product-placeholder.png";

const CartProduct: RC<CartProductProps> = ({ id, price, image, name }) => {
  const dispatch = useDispatch();
  const page = usePage().props as ServerProps;
  const { pageWords } = page;
  const paths = page.paths.images_paths;
  const productImage = image ? `${paths?.root}/${paths?.products}/${image}` : fakeImage;
  const product = useSelector((state: RootState) => state.cart.products).filter((product) => product.id === id)[0];
  const { toast } = useToast();

  // Set quantity
  const setQuantity = (quantity: number) => {
    dispatch(setProductQuantity({
      id: product.id,
      quantity: quantity > 0 ? quantity : 1
    }));
  }

  // Handle remove product
  const handleRemoveProduct = () => {
    if (id) {
      dispatch(removeProduct(id));
      toast(pageWords?.product_removed_from_cart, 'warning');
    }
  }

  return (
    <div className="product">
      <div className="product-content">
        <Image className="product-image" src={productImage} />
        <div className="grid gap-1" >
          <h1 className="product-name">{name}</h1>
          <h4 className="product-price"> $ {price}</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setQuantity(product.quantity - 1)}> <i className="fal fa-minus"></i></Button>
            <FormControl
              type="number"
              size="sm"
              value={product?.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
              max={100}
            />
            <Button size="sm" onClick={() => setQuantity(product.quantity + 1)}> <i className="fal fa-plus"></i></Button>
          </div>
        </div>
      </div>
      <FormGroup className="mt-1 ">
        <Button size="sm" variant="danger" onClick={handleRemoveProduct}><i className="fas fa-trash" /></Button>
      </FormGroup>
    </div>
  )
}

export default CartProduct;
