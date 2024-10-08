import { Role } from 'src/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class seederRole implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repoRole = dataSource.getRepository(Role);
    const data = [{ nameRole: 'admin' }, { nameRole: 'client' }];

    for (const x of data) {
      const query = await repoRole.findOneBy({ nameRole: x.nameRole });
      if (!query) {
        const createRole = repoRole.create(x);
        await repoRole.save(createRole);
      }
    }
  }
}
