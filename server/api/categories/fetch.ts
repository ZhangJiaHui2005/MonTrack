import { Category } from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { type } = query;

    if (!type) {
      throw createError({
        statusCode: 400,
        statusMessage: "Cần phải điền vào type",
      });
    }

    if (!["Income", "Expense"].includes(type as string)) {
      throw createError({
        statusCode: 400,
        statusMessage: `${type as string} không hợp lệ`,
      });
    }

    const categories = await Category.find({
      type,
    }).sort({ createdAt: -1 });

    return {
        data: categories
    }
  } catch (error) {
    throw createError({
        statusCode: 500,
        statusMessage: "Lỗi hệ thống"
    })
  }
});
