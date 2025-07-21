import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams(); // Lấy giá trị của :id từ URL

  return <h1>Chi tiết sản phẩm {productId}</h1>;
}
