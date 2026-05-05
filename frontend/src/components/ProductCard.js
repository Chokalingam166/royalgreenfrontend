import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductCard({ product, type, onAdd, isLoading = false }) {
  if (isLoading) {
    return (
      <div style={styles.card}>
        <Skeleton height={200} />
        <div style={styles.info}>
          <Skeleton width={150} />
          <Skeleton width={100} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} loading="lazy" />
        <span style={styles.offerBadge}>20% OFF</span>
      </div>
      <div style={styles.info}>
        <div style={styles.name}>{product.name}</div>
        <div style={styles.price}>${product.price.toFixed(2)}</div>
        <button style={styles.button} onClick={() => onAdd(product, type)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  offerBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "linear-gradient(135deg, #10B981, #059669)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "0.8em",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  info: {
    padding: "15px",
    textAlign: "center",
  },
  name: {
    fontSize: "1.2em",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    color: "#059669",
    fontSize: "1.1em",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
};

export default ProductCard;
