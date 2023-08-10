/* eslint-disable @typescript-eslint/ban-ts-comment */
//! Do not edit this file manually, it is generate by `prisma repo generator`

import { PrismaClient, Prisma, Country, Province, City } from "@prisma/client";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type BaseOption<Include, Select> = {
  include?: Include;
  select?: Select;
};

export type Find<Select, Include, Cursor, Order, Distinct> = BaseOption<
  Include,
  Select
> & {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
};

export type CountArgs<Select, Cursor, Order, Distinct> = Omit<
  Find<Select, never, Cursor, Order, Distinct>,
  "include"
>;

export type Aggregate<Cursor, Order, Distinct> = Omit<
  CountArgs<never, Cursor, Order, Distinct>,
  "select" | "distinct"
>;

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export const models = _.omit(prisma, [
  "$on",
  "$connect",
  "$disconnect",
  "$use",
  "$executeRaw",
  "$executeRawUnsafe",
  "$queryRaw",
  "$queryRawUnsafe",
  "$transaction",
]);

export const MODELS_NAME = {
  COUNTRY: "country",
  PROVINCE: "province",
  CITY: "city",
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModelStructure = {
  country: Country;
  province: Province;
  city: City;
};

export type ModelName = keyof ModelStructure;

export type ModelScalarFields<T extends keyof ModelStructure> =
  Prisma.Enumerable<keyof ModelStructure[T]>;

export type ModelDelegate =
  | Prisma.RejectOnNotFound
  | Prisma.RejectPerOperation
  | undefined;

export type ModelTypes<T = unknown> = {
  country: {
    Where: Prisma.CountryWhereInput;
    Select: Prisma.CountrySelect;
    Include: unknown;
    Create: Prisma.CountryCreateInput | Prisma.CountryUncheckedCreateInput;
    Update: Prisma.CountryUpdateInput | Prisma.CountryUncheckedUpdateInput;
    Cursor: Prisma.CountryWhereUniqueInput;
    Order: Prisma.CountryOrderByWithRelationInput;
    Delegate: Prisma.CountryDelegate<ModelDelegate>;
    GroupBy: Prisma.CountryGroupByOutputType;
    // @ts-ignore
    Return: Prisma.CountryGetPayload<T>;
  };
  province: {
    Where: Prisma.ProvinceWhereInput;
    Select: Prisma.ProvinceSelect;
    Include: Prisma.ProvinceInclude;
    Create: Prisma.ProvinceCreateInput | Prisma.ProvinceUncheckedCreateInput;
    Update: Prisma.ProvinceUpdateInput | Prisma.ProvinceUncheckedUpdateInput;
    Cursor: Prisma.ProvinceWhereUniqueInput;
    Order: Prisma.ProvinceOrderByWithRelationInput;
    Delegate: Prisma.ProvinceDelegate<ModelDelegate>;
    GroupBy: Prisma.ProvinceGroupByOutputType;
    // @ts-ignore
    Return: Prisma.ProvinceGetPayload<T>;
  };
  city: {
    Where: Prisma.CityWhereInput;
    Select: Prisma.CitySelect;
    Include: Prisma.CityInclude;
    Create: Prisma.CityCreateInput | Prisma.CityUncheckedCreateInput;
    Update: Prisma.CityUpdateInput | Prisma.CityUncheckedUpdateInput;
    Cursor: Prisma.CityWhereUniqueInput;
    Order: Prisma.CityOrderByWithRelationInput;
    Delegate: Prisma.CityDelegate<ModelDelegate>;
    GroupBy: Prisma.CityGroupByOutputType;
    // @ts-ignore
    Return: Prisma.CityGetPayload<T>;
  };
};