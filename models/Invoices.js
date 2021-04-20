export default (database, DataTypes) => {
  const Invoices = database.define(
    'invoices',
    {
      invoice_id: 
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: 
      {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      credit_total: 
      {
        type: DataTypes.DECIMAL(3,2),
        allowNull: false
      },
      invoice_date: 
      {
        type: DataTypes.DATE(),
        allowNull: false
      },
      invoice_total: 
      {
        type: DataTypes.DECIMAL(3,2),
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Invoices;
};
