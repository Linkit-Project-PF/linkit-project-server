// ? Tier selector in base to tehc, frame, and others
import { authorize, getTiers, getCalculatorTable } from '../Calculator/googleSheets'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export async function tierSelector (technologies: string[], frameworks: string[], others: string[]): Promise <any> {
  try {
    const auth = await authorize()
    const data = await getTiers(auth)

    const techTier1Array = data.techTier1
    const frameworksTier1Array = data.frameworksTier1
    const othersTier1Array = data.othersTier1
    const techTier2Array = data.techTier2

    const belongsToTier1 = technologies.some(tech => techTier1Array.includes(tech))
    const belongsToTier2 = technologies.some(tech => techTier2Array.includes(tech))
    const belongsToframeworks = frameworks.some(frame => frameworksTier1Array.includes(frame))
    const belongsToOthers = others.some(other => othersTier1Array.includes(other))

    if (belongsToTier2) return 'Tier 2'
    if (belongsToTier1 || belongsToframeworks || belongsToOthers) return 'Tier 1'
    return 'Not found'
  } catch (error) {
    console.error(error)
  }
}

export async function filterCalculator (
  position: string,
  enlgishLevel: string,
  seniority: string,
  technologies: string[],
  frameworks: string[],
  others: string[]
): Promise <any> {
  try {
    const auth = await authorize()
    const data = await getCalculatorTable(auth)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const tierUser: string = await tierSelector(technologies, frameworks, others)

    const row = data.filter((obj: { position: string, enlgishLevel: string, seniority: string, tier: string }) =>
      obj.position === position &&
      obj.enlgishLevel === enlgishLevel &&
      obj.seniority === seniority &&
      obj.tier === tierUser)

    return row
  } catch (error) {
    console.error(error)
  }
}
