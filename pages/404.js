import Base from "@layouts/Baseof";

const notFound = ({ data }) => {
  return (
    <Base>
      <section className="section">
        <div className="container">
          <div className="flex h-[40vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4">Not Found</h1>
              Page not found.
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default notFound;
