import loader from "../assets/Loader.svg";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loader} alt="loading.." />
    </div>
  );
};
export { Loader };
