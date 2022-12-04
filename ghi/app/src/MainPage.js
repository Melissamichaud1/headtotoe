import React from "react";
import { Link } from "react-router-dom";
function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
        <img src="https://i.pinimg.com/originals/33/7a/dc/337adc9e1c236aeb1ba26ae5a5ba8ba0.jpg"></img>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/hats/new"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Add A Hat
              </Link>
            </div>
      </div>
    </div>
  );
}

export default MainPage;
