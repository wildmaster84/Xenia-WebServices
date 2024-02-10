export interface PersistanceSettingsProps {
  mongoURI: string;
  swagger_API: string;
  SSL: string;
}

export default interface IPersistanceSettings {
  get(): PersistanceSettingsProps;
}
