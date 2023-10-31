import {signal} from "@angular/core";
import {Boardtemplate} from "./models/boardtemplate";

export const board = signal<Boardtemplate[]>([]);
