// // Expected req.query un the form { page=1+limit=8+order_by=wallet_id="DESC",updated_at:"ASC"+start_date}
const { Op } = require("sequelize");

const build_query = async (query, where_clause) => {
  if (query.start_date && query.end_date) {
    where_clause.createdAt = {
      [Op.between]: [query.start_date, query.end_date],
    };
  } else if (query.start_date) {
    where_clause.createdAt = {
      [Op.gt]: query.start_date,
    };
  }

  let order = [["createdAt", "DESC"]];
  if (query.order_by) {
    order = query.order_by.split(",").map((attribute) => {
      const parts = attribute.trim().split(" ");
      return [parts[0], parts[1]];
    });
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  return [
    {
      where: where_clause,
      order: order,
      limit: limit,
      offset: offset,
    },
    page,
    limit,
  ];
};

module.exports = build_query;
