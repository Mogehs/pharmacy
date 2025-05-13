import Appointments from "../components/appointments-orders/Appointments";
import UserOrders from "../components/appointments-orders/Orders";

const AppointmentsOrders = () => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div>
        <Appointments />
      </div>
      <div>
        <UserOrders />
      </div>
    </div>
  );
};

export default AppointmentsOrders;
