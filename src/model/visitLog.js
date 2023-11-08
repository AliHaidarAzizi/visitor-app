import { DataTypes } from "sequelize";

import { postgresConnection } from "../database/connection";

// Import the visitor and venue models
import Visitor from "./visitor";
import Venue from "./venue";

const visitLog = postgresConnection.define(
  "visitLog",
  {
    // visitorId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Visitor,
    //     key: "id",
    //   },
    // },
    // venueId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Venue,
    //     key: "id",
    //   },
    // },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default visitLog;

Venue.belongsToMany(Visitor, { through: visitLog });
