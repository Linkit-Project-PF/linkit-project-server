// TODO Define types here

export interface PostulationRepository {
  createPostulation: (postulation: any) => Promise<any>
  findPostulation: (filter: string, value: string) => Promise<any>
}
