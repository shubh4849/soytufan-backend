const userRoles = ["user","creator","admin"];

const dbOptions = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc"
};

module.exports = {
    userRoles,
    dbOptions
}