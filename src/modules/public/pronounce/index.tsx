import JImage from "@/components/Image";
const PronouncePage = () => {
  return (
    <>
      <h1>Pronounce page </h1>
      <JImage
        src="https://app.jaxtina.com/api/file/692fa727dd1fb3e75493c6d3"
        isAuth={false}
      />

      <JImage
        src="https://app.jaxtina.com/api/file/692fa727dd1fb3e75493c6d3"
        isAuth={true}
        width={100}
        height={100}
      />
      <JImage
        src="123"
        isAuth={true}
      />
    </>
  );
};
export default PronouncePage;
