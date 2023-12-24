// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { HeaderProps } from "@/types/Components/Layout/Header";
import { Link } from "@inertiajs/react";

const Header: RC<HeaderProps> = ({ title, children }) => {
  const { layoutsWords } = usePage().props as ServerProps;

  return (
    <header className={"pf-header"}>
      <h3 className={"pf-header-title"}>{title}</h3>
      <div className={'pf-header-buttons'}>
        <Link href={route('sales.create.show')}>
          <button className={"btn btn-outline-primary btn-icon"}>
            <i className={"fal fa-cart-plus "} />
            <span>{layoutsWords?.new_sale}</span>
          </button>
        </Link>
        {children}
      </div>
    </header>
  )
}

export default Header;
