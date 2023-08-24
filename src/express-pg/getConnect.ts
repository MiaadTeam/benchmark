import { PoolClient } from "pg"

export const getConnect = (tx?: PoolClient): Promise<PoolClient> => {
	if (tx) {
	  return tx as unknown as Promise<PoolClient>
	}
	// pool it is global connection variable
	// !!! Warning !!!
	// Be very-very carefully when working with global variables
	// And you should not access this variable from business logic
	return pool.connect()
}