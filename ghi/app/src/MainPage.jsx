function MainPage() {
  return (
    <div className="hero-section px-4 py-5 my-5 text-center">
      <div className="container py-5">
        <h1 className="display-3 fw-bold text-primary mb-4">AutoHub</h1>
        <div className="col-lg-8 mx-auto">
          <p className="lead mb-4 fs-2 text-secondary">
            The premiere solution for automobile dealership
            management!
        </p>
        <div className="row mt-5 justify-content-center g-4">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-80">
              <div className="card-body p-4">
                <h5 className="card-title">Inventory</h5>
                <p className="card-text">Manage vehicle inventory</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-80">
              <div className="card-body p-4">
                <h5 className="card-title">Sales</h5>
                <p className="card-text">Track sales and customers</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-80">
              <div className="card-body p-4">
                <h5 className="card-title">Service</h5>
                <p className="card-text">Schedule and manage services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default MainPage;
