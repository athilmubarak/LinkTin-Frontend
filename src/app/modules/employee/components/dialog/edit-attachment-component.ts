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
  allAttachments = [
    { attachment_id: 1, attachment_name: "efg",attachment_url:"#" },
    { attachment_id: 2, attachment_name: "xyz",attachment_url:"#" },
    { attachment_id: 3, attachment_name: "xyz",attachment_url:"#" },
    { attachment_id: 4, attachment_name: "xyz",attachment_url:"#"},
  ];
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  private myJobs_service: MyJobsService,) {}
  
  ngOnInit(): void {
        
  }
  
  updateAttachment(item: any){
    console.log("this,data",this.data);
    
    this.myJobs_service.updateAttachment(this.data.item.sync_registry_id ,item?.attachment_id).subscribe({
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