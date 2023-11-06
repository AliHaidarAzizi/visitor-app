import { DataTypes } from "sequelize";

import { postgresConnection } from "../database/connection";
import Venue from "./venue";

const Visitor = postgresConnection.define(
  "visitor",
  {
    visitorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    visitorContactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitorReason: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Visitor;
