import { Operation, Resource, Roles } from '../utils/enums.js';

// Define role permissions interface
interface RolePermissions {
  [role: string ]: {
    [key in Resource]: Operation[];
  };
}

const { Admin, User } = Roles;

const {
  Create, Read, Update, Delete,
} = Operation;
const {
  Auth, Brand, Product, Site, Profile,
} = Resource;

const allRights = [Create, Read, Update, Delete];
const readOnly = [Read];

// Define permissions for User and Admin roles
const accessModel: RolePermissions = {
  [Admin]: {
    [Auth]: allRights,
    [Profile]: allRights,
    [Brand]: allRights,
    [Product]: allRights,
    [Site]: allRights,
  },

  [User]: {
    [Auth]: readOnly,
    [Profile]: [Read, Update],
    [Brand]: readOnly,
    [Product]: readOnly,
    [Site]: [],
  },
};

class RBAC {
  // Map roles to resource permissions
  roles: Map<string, { [key in Resource]?: Operation[] }>;

  // Constructor to initialize roles map
  constructor(roles: RolePermissions) {
    if (typeof roles !== 'object') {
      throw new Error('Roles must be an object');
    }
    this.roles = new Map(Object.entries(roles));
  }

  can(role: Roles, operation: Operation[], resource: Resource): boolean {
    const permissions = this.roles.get(role);
    // Check permissions for role
    const resourceArr = permissions ? permissions[resource] : undefined;
    // Check that operations array contains only allowed operations for resource
    return Array.isArray(operation) && operation.every((op) => resourceArr?.includes(op));
  }
}
// Create RBAC instance with defined permissions
const rbac = new RBAC(accessModel);

export default rbac;
