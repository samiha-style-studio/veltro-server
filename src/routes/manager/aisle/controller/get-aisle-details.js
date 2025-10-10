const { TABLE } = require("../../../../utils/constant");
const { get_data } = require("../../../../utils/database");
const { log } = require("../../../../utils/log");

const get_aisle_details = async (request, res) => {
      try {
            // Step 1: Generate SQL for paginated data
            const dataSql = generate_data_sql(request);

            const data_set = await get_data(dataSql);
            const data = data_set.length ? data_set[0] : null;

            // Step 2: Respond with data
            log.info(`Aisle details Found for oid: ${request.query.oid}`);
            return res.status(200).json({
                  code: 200,
                  message: "Aisle details Found",
                  data,
            });
      } catch (e) {
            log.error(`An exception occurred while getting aisle details: ${e?.message}`);
            return res.status(500).json({ code: 500, message: "Something Went Wrong! Please try again later!" });
      }
};

const generate_data_sql = (request) => {
      let query = `SELECT a.oid, a.name, a.code, a.warehouse_oid, a.capacity, a.type_of_storage, a.special_notes, a.status, w.name as warehouse_name  FROM ${TABLE.AISLE} a LEFT JOIN ${TABLE.WAREHOUSE} w ON w.oid = a.warehouse_oid WHERE a.oid = $1`;
      let values = [request.query.oid];

      return { text: query, values };
};

module.exports = get_aisle_details;
