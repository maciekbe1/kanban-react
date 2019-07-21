import React from "react";
import { Link } from "react-router-dom";
import Productivity from "../../assets/images/home.png";
import "../../assets/styles/Home.scss";
export default function Home() {
    return (
        <div className="row m-0">
            <div className="col-lg-6 p-0">
                <img src={Productivity} alt="" className="w-100" />
            </div>
            <div className="col-lg-6 ">
                <div className="bg-img" />
                <div className="px-5 text-white position-relative">
                    <div className="">
                        <h1 className="display-5">Raise your</h1>
                        <h1 className="display-5">
                            <ins>productivity</ins>
                        </h1>
                        <h1 className="display-5">on the next level</h1>
                        <p className="lead">
                            You are here because you want your plans to be
                            organized.
                        </p>
                        <p className="lead">
                            <Link
                                className="btn btn-belizehole btn-lg"
                                to="/about"
                                role="button"
                            >
                                Learn more
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
