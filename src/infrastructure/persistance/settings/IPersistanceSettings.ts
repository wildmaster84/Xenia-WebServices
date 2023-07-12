export interface PersistanceSettingsProps {
  mongoURI: string;
  swagger_API: string;
}

export default interface IPersistanceSettings {
  get(): PersistanceSettingsProps;
}
