import { DataTypes } from "sequelize";

import { postgresConnection } from "../database/connection";

// Import the visitor and venue models
import Visitor from "./visitor";
import Venue from "./venue";

const qrCode = postgresConnection.define(
  "qr_code",
  {
    qrcode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    visitorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Visitor,
        key: "id",
      },
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venue,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default qrCode;
