import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { K8sApisService } from 'src/app/services/k8s-apis.service';
import { K8sService } from 'src/app/services/k8s.service';
import { KubeVirtService } from 'src/app/services/kube-virt.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nodeInfo = {
    'total': 0,
    'running': 0
  };

  vmInfo = {
    'total': 0,
    'running': 0
  };

  discInfo = 0;
  imageInfo = 0;

  cpuInfo = 0;
  memInfo = 0;
  storageInfo = 0;
  netInfo = 0;

  constructor(
    private k8sService: K8sService,
    private k8sApisService: K8sApisService,
    private kubeVirtService: KubeVirtService,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.getNodes();
    this.getVMs();
    this.getNetworks();
    let navTitle = document.getElementById("nav-title");
    if(navTitle != null) {
      navTitle.replaceChildren("Dashboard");
    }
  }

  /*
   * Get Nodes Information
   */
  async getNodes(): Promise<void> {
    let data = await lastValueFrom(this.k8sService.getNodes());
    let nodes = data.items;
    this.nodeInfo.total = nodes.length;
    for (let i = 0; i < nodes.length; i++) {
      let diskData = await lastValueFrom(await this.workerService.getDisks(nodes[i].metadata.name));
      this.discInfo += diskData.length;
      let imageData = await lastValueFrom(await this.workerService.getImages(nodes[i].metadata.name));
      this.imageInfo += imageData.length;
      this.memInfo += this.convertSize(nodes[i].status.capacity["memory"]);
      this.storageInfo += this.convertSize(nodes[i].status.capacity["ephemeral-storage"]);
      this.cpuInfo += Number.parseInt(nodes[i].status.capacity["cpu"]);
      let conditions = nodes[i].status.conditions;
      for (let j = 0; j < conditions.length; j++) {
        if(conditions[j].type == "Ready" && conditions[j].status == "True") {
          this.nodeInfo.running +=1;
        }
      }
    }
    this.storageInfo = Math.round((this.storageInfo * 100) / 100);
  }

  /*
   * Get VMs Information
   */
  async getVMs(): Promise<void> {
    const data = await lastValueFrom(this.kubeVirtService.getVMs());
    let vms = data.items;
    this.vmInfo.total = data.items.length;
    for (let i = 0; i < vms.length; i++) {
        if(vms[i].status["printableStatus"] == "Running") {
          this.vmInfo.running += 1;
        }
    }
  }

  /*
   * Get Network Attachments from Kubernetes
   */
  async getNetworks(): Promise<void> {
    const data = await lastValueFrom(this.k8sApisService.getNetworkAttachs());
    let netAttach = data.items;
    this.netInfo = data.items.length;
  }

  /*
   * Convert unit size
   */
  convertSize(inputSize: string): number {
    inputSize = inputSize.replace('Ki','');
    var fileSize = Number.parseFloat(inputSize)  / (1024*1024);
    return (Math.round(fileSize * 100) / 100);
  }

}