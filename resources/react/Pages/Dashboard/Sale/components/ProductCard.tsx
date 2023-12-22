// Redux
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slicers/components/cart";

// Components
import { Button, Card, FormGroup } from "react-bootstrap";

// Hooks
import useToast from "@/hooks/useToast";
import { usePage } from "@inertiajs/react";

// Types
import { SaleProductCardProps } from "@/types/Pages/Sales";

// Assets
import fakeImage from "~/images/global/product-placeholder.png";

const ProductCard: RC<SaleProductCardProps> = (props) => {
  const { pageWords, paths } = usePage().props as ServerProps;
  const dispatch = useDispatch();
  const path = paths.images_paths;
  const { price, name, image, id } = props;
  const { toast } = useToast();
  const productImage = image ? `${path?.root}/${path?.products}/${image}` : fakeImage;

  // Handle add product
  const handleAddProduct = () => {
    dispatch(addProduct({
      name,
      id,
      price,
      quantity: 1,
      image
    }));
    toast(pageWords?.product_added_to_cart, 'success');
  }

  return (
    <Card className="w-48">
      <Card.Img className=" object-center w-[190px] h-[190px]" src={productImage}></Card.Img>
      <Card.Body>
        <h1 className="dark:text-white line-clamp-1">{name} </h1>
        <p className="flex items-center gap-1 dark:text-white mt-1 text-sm font-semibold line-clamp-1">
          <i className="fal fa-dollar" />
          <span>{Number(price)?.toFixed(2)}</span>
        </p>
        <FormGroup className="mt-3">
          <Button size="sm" className="w-full" onClick={handleAddProduct}>
            {pageWords?.add_to_cart}
          </Button>
        </FormGroup>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
