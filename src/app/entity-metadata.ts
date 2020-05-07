import { EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Entry: {},
};

// because the plural of "entrys" is not "entries"
const pluralNames = { Entry: "Entries" };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
