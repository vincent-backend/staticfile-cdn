import Base from "@layouts/Baseof";

const PageError = ({ data }) => {
  return (
    <Base>
      <section className="section">
        <div className="container">
          <div className="flex h-[40vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4">Error</h1>
              An Error occured. This might be by the API server connection
              problem. Please reload this page to refresh.
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PageError;
