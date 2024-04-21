import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { JobQueryFilter, JobRequest, JobResponse } from '../../interfaces/job';
import { JobService } from '../../core/services/job.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AreaResponse } from '../../interfaces/area';
import { AreaService } from '../../core/services/area.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent extends Crud<JobRequest, JobResponse, JobQueryFilter> implements OnInit {
  module = 'Puestos'
  icon = 'pi-briefcase'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Puestos'
  dialogConfig: DynamicDialogConfig;
  areas: AreaResponse[];

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: JobService,
    public messageService: MessageService,
    private areaService: AreaService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo trabajo',
      closeOnEscape: true,
      closable: true,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    this.selectedOption = 'name'
    this.areas = []
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

  protected restoreFilters() {
    this.filters = {
      name: {
        property: 'name',
        label: 'Nombre',
        value: ''
      },
      id_area: {
        property: 'id_area',
        label: 'Area',
        value: 0
      }
    }
  }

  ngOnInit(): void {
    this.areaService.all().subscribe(response => this.areas = response.data)
  }

}