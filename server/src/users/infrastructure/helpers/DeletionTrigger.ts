import base from '../../../db/airtable'
import { UncatchedError } from '../../../errors/errors'
import { admin } from '../../authentication/firebase'

export default async function deletionTrigger (firebaseID: string, airtableID?: string): Promise<void> {
  try {
    if (airtableID) {
      await base('UsersInfo').destroy([airtableID])
    }
    await admin.auth().deleteUser(firebaseID)
  } catch (error: any) {
    throw new UncatchedError(error.message, 'deleting on airtable/firebase', 'eliminar de airtable/firebase')
  }
}
