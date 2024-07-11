import React from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}
// component to check if there is products in stock and show the price
function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// The component that includes the table rows and rows name and price
function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Building a subcomponent Seach to be passed as a prop in the parent components
function Search() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" /> <br />
        {""}
        Only show products in stock
      </label>
    </form>
  );
}

// Building a parent component to receive other components as props
// that is the one covers athers on the components hierachy.
function FilterableProductTable() {
  return (
    <div>
      <Search />
      <ProductTable products={PRODUCTS} />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default FilterableProductTable;

// While buiding applications you need to divide the system into subcomponents

/* this is the principle
1. Break the UI into a component hierachy(a. FilteredProductTable
b. SearchBar
c. ProductTable
d. ProductCategoryRow
f. ProductRow)

2. BUILDING A STATIC VERSION IN REACT: building a static version requires a lot
of typing and no thinking, but adding interactivity requires a lot of thinking 
and not a lot of typing.
*/
