import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Entry } from "./models";

@Injectable({ providedIn: "root" })
export class EntriesService extends EntityCollectionServiceBase<Entry> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Entry", serviceElementsFactory);
  }
}
