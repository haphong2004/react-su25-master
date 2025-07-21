type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>{children}</div>
  );
}

export default Card;
