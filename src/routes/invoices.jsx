import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  const onChangeSetFilter = e => {
    let filter = e.target.value;

    if (filter) {
      setSearchParams({ filter });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={ onChangeSetFilter }
        />

        {invoices
          .filter(invoice => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map(invoice => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : ""
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

/**
 * ACTIVE LINKS
 * --------------
 * To display the link as the active link the user is looking at swapping out <Link> for 
 * <NavLink>,  We did three things:
 * 1) We swapped out Link for NavLink.
 * 2) We changed the style from a simple object to a function that returns an object.
 * 3) We changed the color of our link by looking at the isActive value that NavLink 
 * passed to our styling function.
 * 
 * SEARCH PARAMS
 * --------------
 * setSearchParams() is putting the ?filter=... search params in the URL and rerendering the router.
 * useSearchParams is now returning a URLSearchParams with "filter" as one of its values.
 * We set the value of the input to whatever is in the filter search param (it's just like useState but in the URLSearchParams instead!)
 * We filter our list of invoices based on the filter search param.
 * 
 */ 