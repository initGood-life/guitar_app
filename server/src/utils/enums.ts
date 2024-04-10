export enum ErrorNames {
  Unauthorized = 'UnauthorizedError',
  Validation = 'ValidationError',
  NotFound = 'NotFoundError',
  InternalServer = 'InternalServerError',
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export enum Operation {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Resource {
  Auth = 'auth',
  Profile = 'profile',
  Brand = 'brand',
  Product = 'product',
  Site = 'site',
}

const {
  Create, Read, Update, Delete,
} = Operation;
const {
  Auth, Profile, Brand, Product, Site,
} = Resource;

export { Auth, Brand, Create, Delete, Product, Profile, Read, Site, Update };

