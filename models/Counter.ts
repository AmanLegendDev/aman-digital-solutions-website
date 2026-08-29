import mongoose, {
  Schema,
  Model,
} from "mongoose";

export interface ICounter {
  _id: string;
  sequence: number;
}

const CounterSchema =
  new Schema<ICounter>(
    {
      _id: {
        type: String,
        required: true,
      },

      sequence: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: false,
    }
  );

const Counter: Model<ICounter> =
  mongoose.models.Counter ||
  mongoose.model<ICounter>(
    "Counter",
    CounterSchema
  );

export default Counter;