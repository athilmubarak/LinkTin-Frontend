import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../my-jobs/my-jobs.component';
import { MyJobsService } from '../../services/my-jobs.service';
import { CommonResponse } from 'app/models/common-response.types';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-aialog',
  templateUrl: './edit-attachment-component.html',
  styleUrls: ['./edit-attachment-component.scss'],
})

export class editAttachmentComponent implements OnInit{
  show_alert: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  private myJobs_service: MyJobsService,) {}
  
  ngOnInit(): void {
        
  }
  allAttachments = [
    { resume_attachment_id: 0, name: "abc",url:"#", type:'PDF'},
    { resume_attachment_id: 1, name: "efg",url:"#", type:'PDF' },
    { resume_attachment_id: 2, name: "xyz",url:"#", type:'PDF' },
    { resume_attachment_id: 3, name: "xyz",url:"#", type:'PDF' },
    { resume_attachment_id: 4, name: "xyz",url:"#", type:'PDF' },
    { resume_attachment_id: 1, name: "efg",url:"#", type:'PDF' },
    { resume_attachment_id: 2, name: "xyz",url:"#", type:'PDF' },
    { resume_attachment_id: 3, name: "xyz",url:"#", type:'PDF' },
    { resume_attachment_id: 4, name: "xyz",url:"#", type:'PDF' },
  ];
  updateAttachment(item: any){
    console.log("this,data",this.data);
    
    this.myJobs_service.updateAttachment(this.data.item.sync_registry_id ,item?.resume_attachment_id).subscribe({
      next: (res: CommonResponse<number>) => {
        console.log(res);
              this.alert = {
                type: res.success ? 'success' : 'error',
                message: res.message
              };
              this.show_alert = true;
      }
    });

  }
  
}