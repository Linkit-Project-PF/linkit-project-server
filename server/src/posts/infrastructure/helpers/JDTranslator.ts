import { type JdEntity } from '../../domain/jd/jd.entity'
import * as deepl from 'deepl-node'

const authkey = 'd16645db-ee0a-4af1-87dd-d0417ffee3d3:fx'
const translator = new deepl.Translator(authkey)

export async function JDTranslate (jd: JdEntity): Promise<JdEntity> {
  jd.title = (await translator.translateText(jd.title, null, 'en-US')).text
  jd.aboutUs = (await translator.translateText(jd.aboutUs as string, 'es', 'en-US')).text
  jd.description = (await translator.translateText(jd.description, 'es', 'en-US')).text
  jd.aboutClient = (await translator.translateText(jd.aboutClient as string, 'es', 'en-US')).text
  for (let i = 0; i < jd.requirements.length; i++) {
    jd.requirements[i] = (await translator.translateText(jd.requirements[i], 'es', 'en-US')).text
  }
  for (let i = 0; i < jd.responsabilities.length; i++) {
    jd.responsabilities[i] = (await translator.translateText(jd.responsabilities[i], 'es', 'en-US')).text
  }
  for (let i = 0; i < jd.niceToHave.length; i++) {
    jd.niceToHave[i] = (await translator.translateText(jd.niceToHave[i], 'es', 'en-US')).text
  }
  for (let i = 0; i < jd.benefits.length; i++) {
    jd.benefits[i] = (await translator.translateText(jd.benefits[i], 'es', 'en-US')).text
  }

  return jd
}
