var SQLite = function(){ // works with local SQLite DB 
    // DB is normally triggered via API
    // but we often need to make several DB opeartion and then sync all the stuff at one time
    // in this case we use manually API._sync after all
    var _db,

    _sql = "",

    _executeSQL = function(sql, callback) { // main DB method which makes query to DB
        console.log(sql);
        _db.transaction(function(tx){
            _queryDB(tx, sql, callback);
        }, function(err){
            _errorCB(err, sql);
        });
    },

    _querySuccess = function(tx, results, callback){
//        console.log(results);
//        try{
            var len = results.rows.length, db_result = [];
            if(results.rows.length === 0 && results.rowsAffected > 0)
                db_result = results;
            else
                for(var i = 0; i < len; i++)
                    db_result[i] = results.rows.item(i);
//        }catch(e){
//            db_result = [];
//        }
        return (callback ? callback(db_result) : true);
    },

    _queryDB = function(tx, sql, callback) {
        tx.executeSql(sql, [], function(tx, results){
            _querySuccess(tx, results, callback);
        }, function(err){
            _errorCB(err, sql);
        });
    },

    _errorCB = function(err, sql) {
        console.log("Error processing SQL code: " + err.code);
        console.log("Error processing SQL error below ");
        console.log(err);
        console.log(sql);
    },

    select = function(data) {
        var select = (data ? data : "*");
        return _sql = 'SELECT ' + select + ' ';
    },
    from = function(table) {
        _sql += ' FROM ' + table;
        // return SERVER.API._tables_to_sync.push(table.match(/([A-z0-9_]+)/ig)[0]);
    },
    where = function(where) {
        _sql += (_sql.match(/( WHERE )/g) ? " AND " : " WHERE ");
        return _sql += where;
    },
    where_in = function(field, values) {
        _sql += (_sql.match(/( WHERE )/g) ? " AND " : " WHERE ");
        var where = field+" IN (";
        values.forEach(function(v,k){
            where += ( k === 0 ? v : (", "+v) );
        });
        return _sql += (where+")");
    },
    join = function(table, on) {
        // SERVER.API._tables_to_sync.push(table.match(/([A-z0-9_]+)/ig)[0]);
        return _sql += ' INNER JOIN ' + table + ' ON ' + on;
    },
    left_join = function(table, on) {
        // SERVER.API._tables_to_sync.push(table.match(/([A-z0-9_]+)/ig)[0]);
        return _sql += ' LEFT JOIN ' + table + ' ON ' + on;
    },
    order_by = function(order) {
        return _sql += ' ORDER BY ' + order;
    },
    order_by_desc = function(order) {
        return _sql += ' ORDER BY ' + order + ' DESC';
    },
    group_by = function(group) {
        return _sql += ' GROUP BY ' + group;
    },
    having = function(having) {
        return _sql += ' HAVING ' + having;
    },
    limit = function(limit, offset) {
        return _sql += ' LIMIT ' + limit + (offset ? (" OFFSET " + offset) : "");
    },
    query = function(callback) {
        _executeSQL(_sql, callback);
    },
    row = function(callback) {
        // return one row
        _executeSQL(_sql + ' LIMIT 1', function(data) {
            callback(data[0]);
        });
    },
    col = function(callback) {
        // return one col
        _executeSQL(_sql + ' LIMIT 1', function(data) {
            if(data.length > 0 ){
                for (var i in data[0]) {
                    callback(data[0][i]);
                    break;
                }
            }else callback([]);
        });
    },
    insert = function(table, data, callback) {
        var sql = 'INSERT INTO ' + table + ' (', i = 0;
        for (var key in data) {
            sql += (i == 0 ? key : "," + key);
            ++i;
        }
        i = 0;
        sql += ') VALUES (';
        for (var key in data) {
            sql += (i == 0 ? '"' + data[key] + '"' : ',"' + data[key] + '"');
            ++i;
        }
        sql += ')';
        return (callback ? _executeSQL(sql, function(res) {
            callback(res.insertId);
        }) : _executeSQL(sql));
    },
    batch_insert = function(table, data, callback) {
        if (typeof table != "string")
            return false; // table is a string not an array
        if (data instanceof Array === false)
            return false; // data is array here
        var i = 0, _this = this, sql = 'INSERT INTO ' + table + ' (id';
        for (var key in data[0]) {
            sql += "," + key;
        }
        sql += ')';
        for (var j in data) {
            for (var ij in data[j]) {
                if (i == 0) {
                    j == 0 ? sql += ' SELECT "' + _this._make_id(table) + '" as id' : sql += ' UNION SELECT "' + _this._make_id(table) + '" as id';
                }
                if (j == 0) {
                    sql += ', "' + data[j][ij] + '" as ' + ij + ''
                } else {
                    sql += ', "' + data[j][ij] + '"';
                }
                ++i;
            }
            i = 0;
        }
        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    batch_insert_or_ignore = function(table, data, callback) {
        if (typeof table != "string")
            return false; // table is a string not an array
        if (data instanceof Array === false)
            return false; // data is array here
        var i = 0, _this = this, sql = 'INSERT OR IGNORE INTO ' + table + ' (', ij = 0;
        for (var key in data[0]) {
            if (ij != 0) {
                sql += ",";
            }
            sql += key;
            ++ij;
        }
        var ijk = 0;
        sql += ')';
        for (var j in data) {
            for (var ij in data[j]) {
                if (i == 0) {
                    j == 0 ? sql += ' SELECT ' : sql += ' UNION SELECT ';
                }
                if (j == 0) {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '" as ' + ij + ''
                } else {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '"';
                }
                ++i;
                ++ijk;
            }
            i = 0;
            ijk = 0;
        }
        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    batch_insert_with_id = function(table, data, callback) {
        if (typeof table != "string")
            return false; // table is a string not an array
        if (data instanceof Array === false)
            return false; // data is array here
        var i = 0, _this = this, sql = 'INSERT INTO ' + table + ' (', ij = 0;
        for (var key in data[0]) {
            if (ij != 0) {
                sql += ",";
            }
            sql += key;
            ++ij;
        }
        var ijk = 0;
        sql += ')';
        for (var j in data) {
            for (var ij in data[j]) {
                if (i == 0) {
                    j == 0 ? sql += ' SELECT ' : sql += ' UNION SELECT ';
                }
                if (j == 0) {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '" as ' + ij + ''
                } else {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '"';
                }
                ++i;
                ++ijk;
            }
            i = 0;
            ijk = 0;
        }
        return ( callback ? _executeSQL(sql, callback) : _executeSQL(sql) );
    },
    batch_insert_or_ignore_with_id = function(table, data, callback) {
        if (typeof table != "string")
            return false; // table is a string not an array
        if (data instanceof Array === false)
            return false; // data is array here
        var i = 0, _this = this, sql = 'INSERT OR IGNORE INTO ' + table + ' (', ij = 0;
        for (var key in data[0]) {
            if (ij != 0) {
                sql += ",";
            }
            sql += key;
            ++ij;
        }
        var ijk = 0;
        sql += ')';
        for (var j in data) {
            for (var ij in data[j]) {
                if (i == 0) {
                    j == 0 ? sql += ' SELECT ' : sql += ' UNION SELECT ';
                }
                if (j == 0) {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '" as ' + ij + ''
                } else {
                    if (ijk != 0) {
                        sql += ",";
                    }
                    sql += '"' + data[j][ij] + '"';
                }
                ++i;
                ++ijk;
            }
            i = 0;
            ijk = 0;
        }
        return ( callback ? _executeSQL(sql, callback) : _executeSQL(sql) );
    },
    update = function(table, data, where, callback) {
        var i = 0, j = 0, sql = "", sql = "UPDATE " + table + " SET ";
        for (var key in data) {
            if (i != 0) {
                sql += ",";
            }
                                // ---
                                if (data[key] == 'datetime()') {
                                        sql += key + '=' + data[key];
                                } else {
                                        sql += key + '="' + data[key] + '"';
                                }
                                // ---
            ++i;
        }
        if (where != "" && where != false) {
            if(typeof(where) === "string")
                sql += " WHERE " + where;
            else{//object
                var _where = "";
                for(var wi in where)
                    _where += ( _where === "" ? (wi+'= "'+where[wi]+'"') : (' AND ' + wi+'="'+where[wi]+'"') );
                sql += " WHERE "+_where;
            }
        }

        return (
            callback ? _executeSQL(sql, function() {
                callback();
            }) : _executeSQL(sql)
        );
    },
    remove = function(table, where, callback) {
        var sql = 'DELETE FROM ' + table + ' WHERE ' + where;
        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    batch_remove = function(table, data, callback) {
        var sql = 'DELETE FROM ' + table + ' WHERE id IN (';
        data.forEach(function(row, i) {
            sql += (i == 0 ? '"' + row.id + '"' : ',"' + row.id + '"');
        });
        sql += ")";
        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    replace = function(table, data, callback) {
        var i = 0, j = 0, sql = "", all_sql = "REPLACE INTO " + table + " ( ";
        for (var str in data) {
            if (i != 0) {
                all_sql += ",";
            }
            all_sql += str;
            ++i;
        }
        all_sql += ") VALUES (";

        for (var i in data) {
            if (j != 0) {
                sql += ',';
            }
            sql += '"' + data[i] + '"';
            ++j;
        }
        all_sql += sql + ')';

        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    batch_replace = function(table, data, callback) {
        var i = 0, sql = "REPLACE INTO " + table + " ( ";
        for (var key in data[0]) {
            if (i != 0) {
                sql += ",";
            }
            sql += key;
            ++i;
        }
        sql += ") ", i = 0;
        for (var j in data) {
            for (var ij in data[j]) {
                if (i == 0) {
                    j == 0 ? sql += ' SELECT ' : sql += ' UNION SELECT ';
                } else {
                    sql += ",";
                }
                if (j == 0) {
                    sql += ' "' + data[j][ij] + '" as ' + ij + ''
                } else {
                    sql += ' "' + data[j][ij] + '"';
                }
                ++i;
            }
            i = 0;
        }
        return (
                callback ? _executeSQL(sql, function() {
            callback();
        }) : _executeSQL(sql)
                );
    },
    insert_batch_on_duplicate_update = function(table, data, callback) {
        var _this = this, len = data.length;
        batch_insert_or_ignore(table, data, function() {
            data.forEach(function(row, i) {
                if (i == len - 1) {
                    update(table, row, 'id = "' + row.id + '"', callback);
                } else {
                    update(table, row, 'id = "' + row.id + '"');
                }
            });
        });
    },
    _init_db = function(db_name, db_tables, db_tables_sql, clear) {
        console.log("start init");

        if(db_name && db_tables && db_tables_sql){

            _db = window.openDatabase(db_name, "1.0", "WebSQL Storage", 200000);
            if(window.localStorage.getItem("db_inited") !== "true" || is_set(clear)){
                
                console.log("recreated");
                
                db_tables.forEach(function(v){
                    _executeSQL('DROP TABLE IF EXISTS '+v);
                });

                db_tables_sql.forEach(function(v){
                    _executeSQL(v, function(){
                        window.localStorage.setItem("db_inited", "true"); 
                    });
                });
                 
            }
            console.log("inited");

            return {
                select          : select,
                from            : from,
                where           : where,
                where_in        : where_in,
                order_by        : order_by,
                order_by_desc   : order_by_desc,
                limit           : limit,
                join            : join,
                left_join       : left_join,
                query           : query,
                row             : row,
                col             : col,
                insert          : insert,
                update          : update,
                remove          : remove,
                insert_batch_on_duplicate_update          : insert_batch_on_duplicate_update,
                recreate_db : function(){
                    _init_db(db_name, db_tables, db_tables_sql, true);
                }
            };
//            return function(){
////                return {
//                    this.select          = select,
//                    this.from            = from,
//                    this.where           = where,
//                    this.where_in        = where_in,
//                    this.order_by        = order_by,
//                    this.order_by_desc   = order_by_desc,
//                    this.limit           = limit,
//                    this.join            = join,
//                    this.left_join       = left_join,
//                    this.query           = query,
//                    this.row             = row,
//                    this.col             = col,
//                    this.insert          = insert,
//                    this.update          = update,
//                    this.remove          = remove,
//                    this.recreate_db  = function(){
//                        _init_db(db_name, db_tables, db_tables_sql, true);
//                    };
////                };
//            };
        }else return false;
    };

    return {
        init : _init_db
    };

};