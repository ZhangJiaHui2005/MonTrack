import { defineMongooseModel } from '#nuxt/mongoose'

export const Category = defineMongooseModel(
  'Category',
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
