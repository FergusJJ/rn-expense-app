import { Auth, User } from 'firebase/auth';
export default async function _settingsState(auth: string | null) {

    if (auth === null) return;
    const currUser:Auth = JSON.parse(auth as string);
    return currUser
}