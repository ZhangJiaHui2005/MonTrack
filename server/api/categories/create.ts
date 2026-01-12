import { Category } from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, type } = body;

  if (!name || !type) {
    throw createError({
      statusCode: 400,
      statusMessage: "Phải có đầy đủ name và type",
    });
  }

  if (!["Income", "Expense"].includes(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Category không hợp lệ",
    });
  }

  const exist = await Category.findOne({ name: name.trim() });

  if (exist) {
    throw createError({
      statusCode: 409,
      statusMessage: `${name} đã tổn tại`,
    });
  }

  try {
    const category = await Category.create({
      name: name.trim(),
      type,
    });

    return {
      message: "Category thêm thành công",
      data: category,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 409,
      statusMessage: `${name} đã tổn tại`,
    });
  }
});
