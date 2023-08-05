import { PoolClient } from "pg"
import { getConnect } from "./getConnect"

export const queryRow = async <T = any>(sql: string, values: any[] | null, tx?: PoolClient): Promise<T> => {
	// Get connection from PG Pool or use passed connection, will be explained below
	const client = await getConnect(tx)
  
	// I think will be better to separate handling query with passed values 
	if (Array.isArray(values)) {
	  try {
		const res = await client.query(sql, values)
  
		return res.rows[0] as T
	  } catch (e) {
		throw e
	  } finally {
		// if we not have passed connection, we need close opened connection
		if (!tx) client.release()
	  }
	}
  
	try {
	  const res = await client.query(sql)
  
	  return res.rows[0] as T
	} catch (e) {
	  throw e
	} finally {
	  if (!tx) client.release()
	}
  }