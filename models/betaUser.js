module.exports = function(client) {
    return {
        insert: function* (data) {
            var sql = `
                INSERT INTO beta_user (email, ip, created_at)
                VALUES ($email, $ip, NOW())
                RETURNING *
            `;

            return (yield client.query_(sql, data)).rows[0];
        }
    };
};
