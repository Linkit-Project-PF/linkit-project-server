// ? Tier selector in base to tehc, frame, and others
import { authorize, getCalculatorTable, getTiers } from '../Calculator/googleSheets'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

async function tierSelector (technologies: string[], frameworks: string[], others: string[]): Promise <any> {
  try {
    const auth = await authorize()
    const data = await getTiers(auth)
    const techTier1Array = data.techTier1
    const frameworksTier1Array = data.frameworksTier1
    const othersTier1Array = data.othersTier1
    const techTier2Array = data.techTier2

    const belongsToTier2 = technologies.some(tech => techTier2Array.includes(tech))
    const belongsToTier1 = technologies.some(tech => techTier1Array.includes(tech))
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
  englishLevel: string,
  seniority: string,
  technologies: string[],
  frameworks: string[],
  others: string[]
): Promise<any> {
  try {
    const auth = await authorize()
    const data = await getCalculatorTable(auth)
    const tierUser: string = await tierSelector(technologies, frameworks, others)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions

    const row = data.filter((obj: { position: string, englishLevel: string, tier: string, seniority: string }) =>
      obj.position === position &&
      obj.englishLevel === englishLevel &&
      obj.tier === tierUser)

    if (seniority === 'Junior') {
      const response = {
        min: row[0]?.entry_level_min,
        max: row[0]?.entry_level_max
      }

      return response
    } else if (seniority === 'Semi-senior') {
      const response = {
        min: row[0]?.semi_Senior_min,
        max: row[0]?.semi_Senior_max
      }

      return response
    } else if (seniority === 'Senior') {
      const response = {
        min: row[0]?.senior_min,
        max: row[0]?.senior_max
      }
      return response
    } else if (seniority === 'Senior advance') {
      const response = {
        min: row[0]?.senior_advanced_min,
        max: row[0]?.senior_advanced_max
      }
      return response
    } else {
      const response = {
        min: row[0]?.manager_lead_min,
        max: row[0]?.manager_lead_max
      }
      return response
    }
  } catch (error) {
    console.error(error)
  }
}
