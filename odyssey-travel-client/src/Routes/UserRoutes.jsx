import { Routes, Route } from "react-router-dom";
import User_DashBoard from "../pages/User/User_DashBoard/User_DashBoard";
import Payment from '../pages/User/Payment/payment';
import UserBookingDetails from '../pages/User/UserBookingDetails/UserBookingDetails';
import BrowsePackages from '../pages/user/BrowsePackages/BrowsePackages';
// import Login from '../pages/User/userlogin/login';
import Support from '../pages/user/Support/Support';
import UserLayout from '../Layouts/UserLayout';
import BookingPage from "../pages/user/BookTravelPackage/BookTravelPackage";

export default function UserRoutes() {
  return (
    <Routes>
      {/* Parent route with layout */}
      <Route path="/" element={<UserLayout />}>

        {/* Nested routes (relative paths) */}
        <Route path="dashboard" element={<User_DashBoard />} />  {/* /user/dashboard */}
        <Route path="browse-packages" element={<BrowsePackages />} /> {/* /user/browse-packages */}
        <Route path="book-package/:packageId" element={<BookingPage />} /> {/* /user/book-package/:packageId */}
        <Route path="payment" element={<Payment />} /> {/* /user/payment */}
        <Route path="my-bookings" element={<UserBookingDetails />} /> {/* /user/my-bookings*/}
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="support" element={<Support />} /> {/* /user/support*/}

      </Route>
    </Routes>
  );
}