import { AccountEntity, AdminEntity, StudentEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';

@InjectableRepository(AccountEntity)
export class AccountRepository extends AbstractRepository<AccountEntity> {
  async hasByEmail(email: string) {
    return this.existsBy({ email });
  }

  async findByEmail(email: string) {
    return this.findOne({
      relations: { admin: true, student: true },
      select: {
        id: true,
        email: true,
        password: true,
        admin: { id: true },
        student: { id: true },
      },
      where: { email },
    });
  }

  async createAccountAsAdmin(name: string, email: string, password: string) {
    return this.transaction(async (em) => {
      const adminRepository = em.getRepository(AdminEntity);
      const admin = adminRepository.create({ name });
      await adminRepository.insert(admin);

      const accountRepository = em.getRepository(AccountEntity);
      const account = accountRepository.create({ email, password, admin });
      await accountRepository.insert(account);

      return account;
    });
  }

  async createAccountAsStudent(name: string, email: string, password: string) {
    return this.transaction(async (em) => {
      const studentRepository = em.getRepository(StudentEntity);
      const student = studentRepository.create({ name });
      await studentRepository.insert(student);

      const accountRepository = em.getRepository(AccountEntity);
      const account = accountRepository.create({ email, password, student });
      await accountRepository.insert(account);

      return account;
    });
  }
}
