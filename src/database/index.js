import User from "../model/user";
import Venue from "../model/venue";
import visitLog from "../model/visitLog";
import Visitor from "../model/visitor";
import { postgresConnection } from "./connection";

const dbInit = async () => {
  try {
    await postgresConnection.authenticate();
    console.log("Connection has been established successfully.");

    // add ur model
    await User.sync({ alter: true });
    await Venue.sync({ alter: true });
    await Visitor.sync({ alter: true });
    await visitLog.sync({ alter: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbInit;
