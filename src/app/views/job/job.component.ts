import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { JobRequest, JobResponse } from '../../interfaces/job';
import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent extends Crud<JobRequest, JobResponse> implements OnInit {
  module = 'Trabajos'
  icon = 'pi-briefcase'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Trabajos'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: JobService
  ) {
    super(dialogService, refDialog, service)
    this.dialogConfig = {
      header: 'Nuevo trabajo',
      closeOnEscape: false,
      closable: false,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
  }

  protected getRefDialog() {
    return this.dialogService.open(JobDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_area: 0,
      name: "",
    }
  }

  ngOnInit(): void {
  }
  
}