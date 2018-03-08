import { globalController, globalQueryHelper } from '../../lib/components/globals';
import { friendQuery } from './friendsQueries';

export const friendController = globalController(friendQuery, 'friendController');
