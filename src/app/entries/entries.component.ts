import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../models";
import { EntriesService } from "../entries.service";

import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-entries",
  templateUrl: "./entries.component.html",
  styleUrls: ["./entries.component.scss"],
})
export class EntriesComponent implements OnInit {
  loading$: Observable<boolean>;
  entries$: Observable<Entry[]>;
  allEntries$: any;
  entry = new FormGroup({
    id: new FormControl(""),
    author: new FormControl(""),
    body: new FormControl(""),
    title: new FormControl(""),
  });

  constructor(private entriesService: EntriesService) {
    this.entries$ = entriesService.entities$;
    this.loading$ = entriesService.loading$;
  }

  ngOnInit() {
    this.getEntriess();
  }

  add() {
    this.entriesService.add(this.entry.value);
    this.getEntriess();
  }

  delete(entry: Entry) {
    this.entriesService.delete(entry.id);
  }

  getEntriess() {
    this.allEntries$ = this.entriesService.getAll();
    this.allEntries$.subscribe((entries) => {});
  }

  update(entry: Entry) {
    this.entriesService.update(entry);
  }
}
