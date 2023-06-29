import { Component, Input } from '@angular/core';
import { File } from '../models/File';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  @Input() file!: File;
}
