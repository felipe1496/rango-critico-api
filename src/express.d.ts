/* eslint-disable @typescript-eslint/naming-convention */

import { Where } from "sql-js-builder";
declare global {
  namespace Express {
    export interface Request {
      whereFilter: Where;
    }
  }
}
