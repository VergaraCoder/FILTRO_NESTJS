import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypr from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

export class seederUser implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repoUser = dataSource.getRepository(User);
    const data = [
      {
        name: 'jesus',
        email: 'jesus@gmail.com',
        password: 'jesus12',
        roleId: 1,
      },
      {
        name: 'pedro',
        email: 'pedro@gmail.com',
        password: 'pedro12',
        roleId: 2,
      },
    ];

    for (const x of data) {
      const query = await repoUser.findOneBy({ email: x.email });
      if (!query) {
        const hashPassword = await bcrypr.hash(x.password, 10);
        const createRole = repoUser.create({ ...x, password: hashPassword });
        await repoUser.save(createRole);
      }
    }
  }
}
