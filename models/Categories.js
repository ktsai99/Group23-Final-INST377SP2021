export default (database, DataTypes) =>
{
    const Categories = database.define(
        'categories',
        {
            category_id:
            {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            genre_id:
            {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        { freezeTableName: true, timestamps: false }
    );
    return Categories;
};
