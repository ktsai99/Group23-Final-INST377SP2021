export default (database, DataTypes) => {
  const Invoices = database.define(
    'Invoices',
    {
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      customer_id: {
        type: DataTypes.INTEGER
      },
      credit_total: {
        type: DataTypes.DECIMAL(3,2)
      },
      invoice_date: {
        type: DataTypes.DATE()
      },
      invoice_total: {
        type: DataTypes.DECIMAL(3,2)
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Invoices;
};
