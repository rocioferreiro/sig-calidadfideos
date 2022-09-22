// noinspection SyntaxError

const format = require('pg-format');
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

pool.on('connect', client => {
  client.query(`CREATE TABLE IF NOT EXISTS "Users"
                  (
                      "userID"    SERIAL,
                      "name"      varchar(255) NOT NULL,
                      "email"     varchar(255) NOT NULL,
                      "password"  varchar(255) NOT NULL,
                      PRIMARY KEY ("userID")
                  );`, (err) => {
    if (!err) {
      client.query('SELECT * from "Users"', (error, results) => {
        if (results.rows.length < 4) {
          console.log('Users created')
          const sql = 'INSERT INTO "Users" ("name","email","password") VALUES %L';
          const values = [["John Doe", "jd@gmail.com", 'pass123'], ["Marc Sam", "ms@gmail.com", 'pass123'], ["Alice John", "aj@gmail.com", 'pass123'], ["Peter Parker", "pp@gmail.com", 'pass123'], ["Sam Doe", "sd@gmail.com", 'pass123']];
          client.query(format(sql, values), [], (error, results) => {
            if (!error) {
              console.log("Users test data inserted")
              console.log(results.rows)
            } else {
              console.log("users")
              console.log(error.message)
            }
          })
        }
      })
    }
  });
  
  client.query(`CREATE TABLE IF NOT EXISTS "Batch"
                  (
                      "batchID"        SERIAL,
                      "sku"            varchar(255) NOT NULL,
                      "description"    text         NOT NULL,
                      "batchNumber"    float        NOT NULL,
                      "shatterLevel"   float       DEFAULT 0,
                      "state"          integer      NOT NULL,
                      "samples"        integer[] DEFAULT '{}',
                      "productionDate" timestamp    NOT NULL,
                      PRIMARY KEY ("batchID")
                  );`, (err) => {
    if (!err) {
      client.query('SELECT * from "Batch"', (error, results) => {
        if (results.rows.length < 4) {
          console.log('Batch created')
          const sql = 'INSERT INTO "Batch" (sku, description, batchNumber, shatterLevel, state, samples, "productionDate") VALUES %L';
          const values = [['123qweasd456', 'Batch 1 of march', 23, 0.6, 'Robot #1 Description', 50, '{1, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-03-02", "11:00:00"'], ['Uncommon', 'robot (2).gif', 'Robot 2', 'Robots', 'Robot #2 Description', 50, '{1, 2, 3, 4, 5, 6, 7}', '"2022-03-04", "11:00:00"'], ['Common', 'robot (3).gif', 'Robot 3', 'Robots', 'Robot #3 Description', 50, '{2, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-03-20", "12:00:00"'], ['Rare', 'robot (4).gif', 'Robot 4', 'Robots', 'Robot #4 Description', 70, '{1, 2, 3, 4, 5}', '"2022-03-21", "15:00:00"'], ['Uncommon', 'robot (5).gif', 'Robot 5', 'Robots', 'Robot #5 Description', 50, '{1, 2, 3, 4, 5, 6, 7}', '"2022-04-02", "11:00:00"'], ['Common', 'robot (6).gif', 'Robot 6', 'Robots', 'Robot #6 Description', 50, '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-04-03", "11:00:00"'], ['Uncommon', 'robot (7).gif', 'Robot 7', 'Robots', 'Robot #7 Description', 50, '{1, 2, 3, 4, 5, 6, 7}', '"2022-04-04", "11:00:00"'], ['Epic', 'robot (8).gif', 'Robot 8', 'Robots', 'Robot #8 Description', 100, '{1, 2, 3}', '"2022-04-05", "11:00:00"'], ['Common', 'robot (9).gif', 'Robot 9', 'Robots', 'Robot #9 Description', 50, '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-04-06", "11:00:00"'], ['Common', 'robot (10).gif', 'Robot 10', 'Robots', 'Robot #10 Description', 50, '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-04-07", "11:00:00"'], ['Rare', 'robot (11).gif', 'Robot 11', 'Robots', 'Robot #11 Description', 70, '{1, 2, 3, 4, 5}', '"2022-04-08", "11:00:00"'], ['Common', 'robot (12).gif', 'Robot 12', 'Robots', 'Robot #12 Description', 50, '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', '"2022-04-09", "11:00:00"'], ['Uncommon', 'robot (13).gif', 'Robot 13', 'Robots', 'Robot #13 Description', 50, '{1, 2, 3, 4, 5, 6, 7}', '"2022-04-10", "11:00:00"'], ['Legendary', 'robot (14).gif', 'Robot 14', 'Robots', 'Robot #14 Description', 500, '{1}', '"2022-04-15", "11:00:00"']];
          client.query(format(sql, values), [], (error, results) => {
            if (!error) {
              console.log("Drop test data inserted")
              console.log(results.rows)
            } else {
              console.log("drops")
              console.log(error.message)
            }
          })
        }
      })
    }
  });
  
  client.query(`CREATE TABLE IF NOT EXISTS "Listings"
                  (
                      "listingID" SERIAL,
                      "userID"    integer   NOT NULL,
                      "mint"      text      NOT NULL,
                      "price"     float     NOT NULL,
                      "date"      timestamp NOT NULL,
                      "sold"      boolean DEFAULT false,
                      "soldTo"    integer DEFAULT NULL,
                      PRIMARY KEY ("listingID")
                  );`, (err) => {
    if (!err) {
      client.query('SELECT * from "Listings"', (error, results) => {
        if (results.rows.length < 4) {
          console.log('Listings created')
        }
      })
    }
  });
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM "Users" ORDER BY "userID"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  if (isNaN(id)) return
  pool.query('SELECT * FROM "Users" WHERE "userID" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log(response)
  })
}

const getUserByEmail = (request, response) => {
  const email = request.params.email;
  if (email.length < 1) return response.status(400).json('NOT VALID EMAIL')
  pool.query('SELECT * FROM "Users" WHERE "email" = $1', [email], (error, results) => {
    if (error) {
      return response.status(400).json(error)
    }
    if (results.rows.length < 1) {
      return response.status(404).json("NOT A USER WITH THAT EMAIL")
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const {name, email} = request.body

  pool.query('INSERT INTO "Users" ( name, email) VALUES ($1, $2)', [name, email], (error, result) => {
    if (error) {
      response.status(400).send(error)
    }
    console.log(result)
    response.status(201).send(`User added`)
  })
}

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   if (isNaN(id)) return
//   const {name, email} = request.body
//
//   pool.query('UPDATE "Users" SET name = $1, email = $2 WHERE "userID" = $3', [name, email, id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User modified with ID: ${id}`)
//   })
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   if (isNaN(id)) return
//
//   pool.query('DELETE FROM "Users" WHERE "userID" = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }





// const buyCollectible = (request, response) => {
//   const id = parseInt(request.params.id)
//   if (isNaN(id)) return
//   const userID = request.body["userID"]
//   pool.query('SELECT price,"dropDate" FROM "Drop" where "dropID" = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     const price = results.rows[0].price
//     const dropDate = results.rows[0].dropDate
//     if (new Date().getTime() < new Date(dropDate).getTime()) {
//       return response.status(400).send("Drop is not yet available")
//     }
//     pool.query('SELECT coins from "Users" where "userID" = $1', [userID], (error, resultsReturn) => {
//       if (error) {
//         throw error
//       }
//       const coins = resultsReturn.rows[0].coins
//       if (coins < price) {
//         return response.status(400).send("NOT ENOUGH COINS")
//       }
//       pool.query('UPDATE "Users" SET coins = coins - $1 WHERE "userID" = $2', [price, userID], (error, results) => {
//         if (error) {
//           throw error
//         }
//         pool.query('SELECT mints from "Drop" where "dropID" = $1', [id], (error, results) => {
//           if (error) {
//             throw error
//           }
//           const mints = results.rows[0].mints
//           const mint = id + ':' + mints.pop()
//           pool.query('UPDATE "Drop" SET mints = $1 WHERE "dropID" = $2', [mints, id], (error, results) => {
//             if (error) {
//               throw error
//             }
//             pool.query('UPDATE "Users" SET mints = array_append(mints, $1) WHERE "userID" = $2', [mint, userID], (error, results) => {
//               if (error) {
//                 throw error
//               }
//               pool.query('SELECT name from "Drop" where "dropID" = $1', [id], (error, results) => {
//                 if (error) {
//                   throw error
//                 }
//                 const purchase = {
//                   "dropName": results.rows[0].name,
//                   "mint": mint,
//                   "buyDate": new Date().toISOString().slice(0, 19).replace('T', ' '),
//                   "userID": userID,
//                   "price": price,
//                   "coins": coins - price,
//                 }
//                 pool.query('UPDATE "Users" SET purchases = array_append(purchases, $1) WHERE "userID" = $2', [purchase, userID], (error, results) => {
//                   if (error) {
//                     throw error
//                   }
//                   response.status(200).send(resultsReturn.rows)
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// }


// const searchDrops = (request, response) => {
//   const query = request.params.query
//   pool.query('SELECT * FROM "Drop"', (error, results) => {
//     if (error) {
//       throw error
//     }
//     if (query === "") {
//       response.status(200).json(results.rows)
//     } else {
//       const filtered = results.rows.filter(drop => drop.name.toLowerCase().includes(query.toLowerCase()))
//       filtered.concat(results.rows.filter(drop => drop.description.toLowerCase().includes(query.toLowerCase())))
//       filtered.concat(results.rows.filter(drop => drop.series.toLowerCase().includes(query.toLowerCase())))
//       filtered.concat(results.rows.filter(drop => drop.asset.toLowerCase().includes(query.toLowerCase())))
//       filtered.concat(results.rows.filter(drop => drop.rarity.toLowerCase().includes(query.toLowerCase())))
//       response.status(200).json(filtered)
//     }
//   })
// }

// const getListings = (request, response) => {
//   pool.query('SELECT * FROM "Listings"', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const createListing = (request, response) => {
//   const {userID, mint, price, date} = request.body
//   if (isNaN(userID) || isNaN(price)) return
//
//   pool.query('SELECT mints FROM "Users" WHERE "userID" = $1', [userID], (error, results) => {
//     if (error) {
//       throw error
//     }
//     if (results.rows[0].mints.includes(mint)) {
//       const mints = results.rows[0].mints.filter(function (item) {
//         return item !== mint
//       })
//       pool.query('UPDATE "Users" SET mints=$2 WHERE "userID" = $1', [userID, mints], (error, results) => {
//         if (error) {
//           throw error
//         }
//         pool.query('INSERT INTO "Listings" ("userID", "mint", "price", "date") VALUES ($1, $2, $3, $4)', [userID, mint, price, date], (error, results) => {
//           if (error) {
//             throw error
//           }
//           response.status(200).send(results.rows)
//         })
//       })
//     } else {
//       response.status(400).send("Mint not in user's mints")
//     }
//   })
// }



module.exports = {
  // getUsers,
  // getUserById,
  // getUserByEmail,
  // createUser,
  // updateUser,
  // deleteUser,
  // getDrops,
  // getDropById,
  // getDropCount,
  // getUpcomingDrop,
  // getUserMints,
  // addCoin,
  // buyCollectible,
  // getPurchases,
  // searchDrops,
  // getListings,
  // createListing,
  // updateListing
}
