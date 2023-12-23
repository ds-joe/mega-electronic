// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setProductQuantity, removeProduct } from "@/redux/slicers/components/cart";
import { RootState } from "@/redux/store";

// Components
import { Card, FormGroup } from "react-bootstrap";

// Hooks
import useToast from "@/hooks/useToast";
import { usePage } from "@inertiajs/react";

// Types
import { SaleProductCardProps } from "@/types/Pages/Sales";

// Assets
import fakeImage from "~/images/global/product-placeholder.png";
import { useMemo } from "react";

const ProductCard: RC<SaleProductCardProps> = (props) => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const exists = useMemo(() => cartProducts.some((product) => product.id === props.id), [cartProducts]);
  const { layoutsWords, paths } = usePage().props as ServerProps;
  const dispatch = useDispatch();
  const path = paths.images_paths;
  const { price, name, image, id } = props;
  const { toast } = useToast();
  const productImage = image ? `${path?.root}/${path?.products}/${image}` : fakeImage;
  const productQuantity = useMemo(() => {
    if (exists) {
      return cartProducts.filter((product) => product.id === props.id)[0].quantity;
    }
  }, [cartProducts]);


  // increment product
  const increment = () => {
    dispatch(setProductQuantity({ ...props, quantity: Number(productQuantity as number) + 1 }));
  }

  // decrement product
  const decrement = () => {
    if ((Number(productQuantity as number) - 1) > 1) {
      dispatch(setProductQuantity({ ...props, quantity: (Number(productQuantity as number) - 1) }));
    } else {
      dispatch(removeProduct(props.id as number));
    }

  }

  // Handle add product
  const handleAddProduct = () => {
    dispatch(addProduct({
      name,
      id,
      price,
      quantity: 1,
      image
    }));
    toast(layoutsWords?.product_has_been_added_to_cart, 'success');
  }

  return (
    <Card className=" w-48">
      <Card.Img className=" object-center w-full h-[190px]" src={productImage}></Card.Img>
      <Card.Body>
        <h1 className="text-base-color line-clamp-1 font-medium">{name} </h1>
        <p className="flex items-center gap-1 text-base-color mt-1 text-sm font-semibold line-clamp-1">
          <i className="fas fa-dollar" />
          <span>{Number(price)?.toFixed(2)}</span>
        </p>
        <FormGroup className="mt-3 flex items-center justify-center gap-2">

          {
            exists ? (
              <>
                <button className="btn btn-outline-primary btn-sm" onClick={increment}>
                  <i className="fal fa-plus" />
                </button>
                <p className="px-2 py-1  text-base-color">
                  {productQuantity}
                </p>
                <button className="btn btn-outline-primary btn-sm" onClick={decrement}>
                  <i className="fal fa-minus" />
                </button>
              </>
            ) :
              (
                <button className="w-full btn-sm btn btn-outline-primary" onClick={handleAddProduct}>
                  {layoutsWords?.add_to_cart}
                </button>
              )
          }
        </FormGroup>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
