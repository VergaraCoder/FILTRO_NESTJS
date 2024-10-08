import { applyDecorators, UseGuards } from '@nestjs/common';
import { roles } from '../roleDecorator/role.decorator';
import { RoleGuard } from 'src/auth/jwt/role.guard';

export function Auth(...rolesAsigned: string[]) {
  return applyDecorators(roles(...rolesAsigned), UseGuards(RoleGuard));
}
