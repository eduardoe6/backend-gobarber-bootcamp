import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { container } from 'tsyringe';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
