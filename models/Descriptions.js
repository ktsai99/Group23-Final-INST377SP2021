export default (database, DataTypes) =>
{
    const Descriptions = database.define(
        'descriptions',
        {
            catalogue_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            description:
            {
                type: DataTypes.TEXT
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Descriptions;
};
