export default (database, DataTypes) => 
{
    const Rental_Info = database.define(
      'rental_info',
      {
        confirmation_num: 
        {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        invoice_id: 
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        catalogue_id: 
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        purchase_type: 
        {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        purchase_date: 
        {
          type: DataTypes.DATE(),
          allowNull: false
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return Rental_Info;
  };
  