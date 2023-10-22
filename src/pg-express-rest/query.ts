import { PoolClient } from "pg"
import { getConnect } from "./getConnect"

export const query = async <T = any>(sql: string, values?: any[] | null, tx?: PoolClient) => {
	const client = await getConnect(tx)
  
	if (Array.isArray(values)) {
	  try {
		const res = await client.query(sql, values)
  
		return res.rows as T[]
	  } catch (e) {
		throw e
	  } finally {
		if (!tx) client.release()
	  }
	}
  
	try {
	  const res = await client.query(sql)
  
	  return res.rows as T[]
	} catch (e) {
	  throw e
	} finally {
	  if (!tx) client.release()
	}
  }