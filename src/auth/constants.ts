import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
    secret: '1234567JKHDLFFMSMAMN',
  };

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);