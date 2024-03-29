import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useOrderContext } from "../../Utility/OrderProvider";
import { CiShoppingCart } from "react-icons/ci";
import { getUserData } from "../../Utility/utilities";

const Navbar = () => {
  const navigate = useNavigate();
  const { orders } = useOrderContext();
  const { user, logOut } = useContext(AuthContext);

  const { userType } = getUserData(user);
  const isCustomer = userType === "customer";
  const isRestaurant = userType === "restaurant";

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Logout Successful!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {user?.email && isCustomer && (
        <li>
          <NavLink to={"/my-order"}>My Order</NavLink>
        </li>
      )}
      {user?.email && isRestaurant && (
        <li>
          <NavLink to={"/restaurant-order"}>Restaurant Order</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-gray-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <button className="btn btn-ghost text-xl uppercase">
              Lieferspatz
            </button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {!isRestaurant && (
          <div>
            <Link to={"/cart-list"}>
              <div className="relative">
                <CiShoppingCart className="text-2xl font-black" />
                <span className="absolute right-[-10px] top-[-10px] h-[15px] w-[15px] rounded-full bg-white flex justify-center items-center text-xs">
                  {orders.length}
                </span>
              </div>
            </Link>
          </div>
        )}

        <div className="navbar-end">
          {user?.email ? (
            <>
              <div className="mr-[20px]">
                Welcome, <strong>{user?.displayName}</strong>
              </div>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
