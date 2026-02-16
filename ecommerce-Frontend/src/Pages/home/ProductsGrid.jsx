import { Product } from "./Product";

export function ProductsGrid({ products, loadCart }) {
  return(
     <div className="products-grid">
    {products.map((products) => {

      return (
        <Product key={products.id} products={products} loadCart={loadCart}/>
      );
    })}
  </div>
  );
}
