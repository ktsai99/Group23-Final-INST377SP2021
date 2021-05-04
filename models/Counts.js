export default (database, DataTypes) =>
{
    const Counts = database.define(
        'counts',
        {
            catalogue_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            purchase_count:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rental_count:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Counts;
};