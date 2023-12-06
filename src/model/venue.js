import { DataTypes } from "sequelize";

import { postgresConnection } from "../database/connection";
import User from "./user";

const Venue = postgresConnection.define(
  "venue",
  {
    venueName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venueCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Venue;

User.hasMany(Venue);
Venue.belongsTo(User);
