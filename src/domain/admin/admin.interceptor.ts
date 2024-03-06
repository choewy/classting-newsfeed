import { AdminRepository } from '@common/repositories';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
  constructor(private readonly adminRepository: AdminRepository) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();

    req.admin = await this.adminRepository.findByIdWithSchool(req.user.admin);

    return next.handle();
  }
}
