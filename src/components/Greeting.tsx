type Props = {
  name: string;
  count: number;
  children?: React.ReactNode;
};

function Greeting(props: Props) {
  return (
    <>
      <h1>Welcome to my app! {props.count} </h1>
      <div> {props.children}</div>
    </>
  );
}

export default Greeting;
