import { useParams } from "react-router-dom";
import { useOne } from "../hooks/useOne";

export default function ProductDetail() {
  const { productId } = useParams(); // Lấy giá trị của :id từ URL
  const { data } = useOne("products", productId);

  return <h1>Chi tiết sản phẩm {JSON.stringify(data)}</h1>;
}
